const request = require("supertest");
const app = require("../src/index");
const prisma = require("../src/config/prisma");

  
describe("API Integration Testing", () => {
    let token;
    beforeAll(async () => {        
        await prisma.transaction.deleteMany();
        await prisma.bankAccount.deleteMany();
        await prisma.address.deleteMany();
        await prisma.profile.deleteMany();
        await prisma.user.deleteMany();
    });

    describe("Auth Process", () => {
        it("should create a new user before login", async () => {
            const res = await request(app)
                .post("/api/v1/users/register")
                .send({
                    "name": "Ngolo Kante",
                    "email": "gulugulu@example.com",
                    "password": "password123",
                    "phone": "09827384534",
                    "birth_date": "1988-02-10T12:00:00.000Z",
                    "birth_place": "Paris",
                    "gender": "L",
                    "identity_number": "9112939847491246",
                    "identity_type": "KTP",
                    "street": "Jl. Pahlawan No. 17",
                    "post_code": "60256",
                    "village": "Cibadak",
                    "district": "Cisolok",
                    "city": "Ciamis",
                    "province": "Jawa Barat"
                });
            expect(res.statusCode).toEqual(201);    
            expect(res.body.status).toEqual("SUCCESS");
            expect(res.body.data).toEqual({
                "user": {
                    "id": expect.any(String),
                    "name": "Ngolo Kante",
                    "email": "gulugulu@example.com",
                    "phone": "09827384534"
                },
                "profile": {
                    "id": expect.any(String),
                    "birth_date": "1988-02-10T12:00:00.000Z",
                    "birth_place": "Paris",
                    "gender": "L",
                    "identity_number": "9112939847491246",
                    "identity_type": "KTP",
                    "user_id": expect.any(String)
                },
                "address": {
                    "id": expect.any(String),
                    "street": "Jl. Pahlawan No. 17",
                    "post_code": "60256",
                    "village": "Cibadak",
                    "district": "Cisolok",
                    "city": "Ciamis",
                    "province": "Jawa Barat",
                    "user_id": expect.any(String)
                }
            })            
        });

        it("should login a user", async () => {        
          const res = await request(app)
            .post("/api/v1/auth/login")          
            .send({
              "email": "gulugulu@example.com",
              "password": "password123"
            });
          expect(res.statusCode).toEqual(200);
          expect(res.body.status).toEqual("SUCCESS");
          token = res.body.data.token;
        })
    })

    describe("User Endpoint", () => {        
        it("should get all users", async () => {
            const res = await request(app)
                .get("/api/v1/users/getAll")
                .set("Authorization", `Bearer ${token}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.status).toEqual("SUCCESS");  
            expect(res.body.userData).toEqual(expect.any(Array));          
        })

        it("should get one user", async () => {
            const userId = await prisma.user.findMany({select: {id: true}});
            const res = await request(app)
                .get("/api/v1/users/getOne/" + userId[0].id)
                .set("Authorization", `Bearer ${token}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.status).toEqual("SUCCESS");  
            expect(res.body.data).toEqual(expect.any(Object));          
        })

        it("should update a user", async () => {
            const userId = await prisma.user.findMany({select: {id: true}});
            const res = await request(app)
                .put("/api/v1/users/update/" + userId[0].id)
                .set("Authorization", `Bearer ${token}`)
                .send({
                    "name": "Camavinga",                                        
                    "phone": "09827384534",
                    "birth_date": "1978-02-10T12:00:00.000Z",
                    "birth_place": "Brestois",
                    "gender": "L",
                    "identity_number": "9112939847491246",
                    "identity_type": "KTP",
                    "street": "Jl. Badak No. 17",
                    "post_code": "60256",
                    "village": "Cibedug",
                    "district": "Gunungbatu",
                    "city": "Tasikmalaya",
                    "province": "Jawa Barat"
                    });
            expect(res.statusCode).toEqual(200);
            expect(res.body.status).toEqual("SUCCESS");  
            expect(res.body.data).toEqual(expect.any(Object));          
        })


        it("should delete a user", async () => {
            const userId = await prisma.user.findMany({select: {id: true}});
            const res = await request(app)
                .delete("/api/v1/users/delete/" + userId[0].id)
                .set("Authorization", `Bearer ${token}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.status).toEqual("SUCCESS");        
        });
    });

    describe("Account Endpoint", () => {
        it("should create new account", async () => {                                    
            const res = await request(app)
            .post("/api/v1/accounts/create")            
            .set("Authorization", `Bearer ${token}`)
            .send({
              "bank_name": "BCA",
              "account_type": "SAVINGS",
              "account_number": "1234567890",
              "pin": "123456",
              "balance": 50000              
            });                  
          expect(res.statusCode).toEqual(201);
          expect(res.body.status).toEqual("SUCCESS");              
        })

        it("should get all accounts", async () => {
            const res = await request(app)
                .get("/api/v1/accounts/getAll")
                .set("Authorization", `Bearer ${token}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.status).toEqual("SUCCESS");                       
        })

        it("should get one account", async () => {
            const accountId = await prisma.bankAccount.findMany({select: {id: true}});
            const res = await request(app)
                .get("/api/v1/accounts/getOne/" + accountId[0].id)
                .set("Authorization", `Bearer ${token}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.status).toEqual("SUCCESS");                       
        })

        it("change pin", async () => {
            const accountId = await prisma.bankAccount.findMany({select: {id: true}});
            const res = await request(app)
                .put("/api/v1/accounts/changePin/" + accountId[0].id)
                .set("Authorization", `Bearer ${token}`)
                .send({                    
                    "pin": "123456"
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body.status).toEqual("SUCCESS");                        
        })

        it("should delete a account", async () => {
            const accountId = await prisma.bankAccount.findMany({select: {id: true}});
            const res = await request(app)
                .delete("/api/v1/accounts/delete/" + accountId[0].id)
                .set("Authorization", `Bearer ${token}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.status).toEqual("SUCCESS");        
        });
    })

    describe("Transaction Endpoint", () => {
        it("should create new transaction", async () => {                                    
            const res = await request(app)
            .post("/api/v1/transactions/create")            
            .set("Authorization", `Bearer ${token}`)
            .send({
                "amount": 30000,
                "sender_account_id": "clz15iu6i0006bng6hegtcjjc",
                "receiver_account_id": "clz15iu6i0006bng6hegtcjjc",
                "description": "Uang Jajan",
                "transfer_purpose": "Pemindahan Dana"
            });                  
          expect(res.statusCode).toEqual(201);
          expect(res.body.status).toEqual("SUCCESS");              
        })

        it("should get all transactions", async () => {
            const res = await request(app)
                .get("/api/v1/transactions/getAll")
                .set("Authorization", `Bearer ${token}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.status).toEqual("SUCCESS");                       
        })

        it("should get one transaction", async () => {  
            const transactionId = await prisma.transaction.findMany({select: {id: true}});
            const res = await request(app)
                .get("/api/v1/transactions/getOne/" + transactionId[0].id)
                .set("Authorization", `Bearer ${token}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.status).toEqual("SUCCESS");                       
        })
    })

});