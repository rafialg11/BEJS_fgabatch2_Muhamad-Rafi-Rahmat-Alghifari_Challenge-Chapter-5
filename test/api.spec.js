const request = require("supertest");
const app = require("../src/index");
const prisma = require("../src/config/prisma");
  
describe("API Integration Testing", () => {
    beforeAll(async () => {
        await prisma.user.deleteMany();
        await prisma.profile.deleteMany();
        await prisma.address.deleteMany();
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
          this.token = res.body.data.token;
        })
    })

    describe("User Endpoint", () => {        
        it("should get all users", async () => {
            const res = await request(app)
                .get("/api/v1/users/getAll")
                .set("Authorization", `Bearer ${this.token}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.status).toEqual("SUCCESS");  
            expect(res.body.userData).toEqual(expect.any(Array));          
        })

        it("should get one user", async () => {
            const userId = await prisma.user.findMany({select: {id: true}});
            const res = await request(app)
                .get("/api/v1/users/getOne/" + userId[0].id)
                .set("Authorization", `Bearer ${this.token}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.status).toEqual("SUCCESS");  
            expect(res.body.data).toEqual(expect.any(Object));          
        })

        it("should update a user", async () => {
            const userId = await prisma.user.findMany({select: {id: true}});
            const res = await request(app)
                .put("/api/v1/users/update/" + userId[0].id)
                .set("Authorization", `Bearer ${this.token}`)
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
    });

    it("should delete a user", async () => {
        const userId = await prisma.user.findMany({select: {id: true}});
        const res = await request(app)
            .delete("/api/v1/users/delete/" + userId[0].id)
            .set("Authorization", `Bearer ${this.token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual("SUCCESS");        
    });
});