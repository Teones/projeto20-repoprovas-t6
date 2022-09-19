import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app from "../../src/app";

const email =  faker.internet.email();
const password = faker.internet.password()

export async function createUser() {
    const user = {
        email: email,
        password: password,
        confirmPassword: password,
    }

    await supertest(app).post("/sign-up").send(user)
    
    return {
        email: email,
        password: password,
    }
}

export async function login () {
    const user = await createUser();
    
    const response = await supertest(app).post("/sign-in").send(user)
    
    return {token: response.body.token}
}