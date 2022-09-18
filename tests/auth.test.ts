import supertest from "supertest";
import { faker } from "@faker-js/faker" ;

import app from "../src/app";
import { prisma } from "../src/config/db";

// beforeEach(async () => {
//     await prisma.$executeRaw`TRUNCATE TABLE users`;
// });
  
// afterAll(async () => {
//     await prisma.$disconnect();
// });
  

const fakerEmail = faker.internet.email()
const fakerPassword = faker.internet.password();
let token = {token: ""};

describe("POST /sign-up", () => {
    it ("should answer with status 201 when credentials are valid", async () => {
        const user = {
            email: fakerEmail,
            password: fakerPassword,
            confirmPassword: fakerPassword
        }

        const response = await supertest(app)
            .post("/sign-up")
            .send(user);
        
        expect(response.status).toBe(201);
        expect(response.body.email).toBe(user.email);
    });
});
describe("POST /sign-in", () => {
    it ("should answer with status 401 when credentials are not valid", async () => {
        const user = {
            email: faker.internet.email(),
            password: faker.internet.password()
        }

        const response = await supertest(app)
            .post("/sign-in")
            .send(user);
            
        expect(response.status).toBe(401);
    });
    it ("should answer with status 200 when credentials are valid", async () => {
        const user = {
            email: fakerEmail,
            password: fakerPassword
        }

        const response = await supertest(app)
            .post("/sign-in")
            .send(user);
            
        token.token = response.body.token;
        
        expect(response.status).toBe(200);
        expect(response.body.token).not.toBeNull();
    });
});

export default token;