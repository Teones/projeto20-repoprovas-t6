import supertest from "supertest";
import { faker } from "@faker-js/faker" ;

import app from "../src/app";
import { prisma } from "../src/config/db";
import token from "./auth.test"

// beforeEach(async () => {
//     await prisma.$executeRaw`TRUNCATE TABLE users`;
// });
  
// afterAll(async () => {
//     await prisma.$disconnect();
// });

const name =  faker.lorem.words(3);
const pdfUrl = faker.internet.url();
const categoryId = faker.datatype.number({max: 3});
const teacherDisciplineId = faker.datatype.number({min: 1, max: 6});

describe("POST /tests", () => {
    it("should answer with status 201 when test created", async () => {
        const item = {
            name: name,
            pdfUrl: pdfUrl,
            categoryId: Number(categoryId),
            teacherDisciplineId: Number(teacherDisciplineId)
        }
        console.log(item)

        const response = await supertest(app)
            .post("/tests")
            .set(token)
            .send(item)

        expect(response.status).toBe(201);
        expect(response.body.name).toBe(item.name);
    });
});

describe("get /tests/(disciplines || teachers)", () => {
    it("should return tests grouped by discipline", async () => {
        const response = await supertest(app)
            .get("/tests/disciplines")
            .set(token);

        const {Disciplines} = response.body[0];
        const {TeacherDisciplines} = Disciplines[0];
        const {Teachers} = TeacherDisciplines[0];
        const {Tests} = TeacherDisciplines[0];
        const {Categories} = Tests[0];

        expect(response.status).toBe(200);
        expect(Disciplines.length).toBe(2);
        expect(TeacherDisciplines.length).toBe(1);
        expect(Teachers.name).not.toBeNull();
        expect(Tests).not.toBeNull();
        expect(Categories).not.toBeNull();
    });
    it("should return tests grouped by teachers", async () => {
        const response = await supertest(app)
            .get("/tests/teachers")
            .set(token);

        const {TeacherDisciplines} = response.body[0];
        const {Disciplines} = TeacherDisciplines[0];
        const {Terms} = Disciplines;
        const TeacherDisciplines1 = Disciplines.TeacherDisciplines[0]; 
        const {Tests} = TeacherDisciplines1;
        const {Categories} = Tests[0];

        expect(TeacherDisciplines).not.toBeNull();
        expect(Disciplines).not.toBeNull;
        expect(Terms).not.toBeNull()
        expect(TeacherDisciplines1).not.toBeNull();
        expect(Tests).not.toBeNull();
        expect(Categories).not.toBeNull();
    })
})