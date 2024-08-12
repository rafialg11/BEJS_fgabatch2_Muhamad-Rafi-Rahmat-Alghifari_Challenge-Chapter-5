const request = require("supertest");
const app = require("../src/index");
const prisma = require("../src/config/prisma");
  
describe("API Integration Testing", () => {
    beforeAll(async () => {
        await prisma.User.deleteMany();
        await prisma.Profile.deleteMany();
        await prisma.Address.deleteMany();
    });

    describe("Auth Endpoint", () => {
        it("should create a new user", async () => {
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
        })
    });

    
});