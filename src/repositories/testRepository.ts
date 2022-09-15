import { prisma } from "../config/db.js";
import { CreateTestsData } from "../services/testServices.js";

export async function findByTeacherId ({teacherDisciplineId}: CreateTestsData) {
    return prisma.teacherDisciplines.findUnique({
        where: {
            id: teacherDisciplineId
        }
    })
}

export async function findByCategoriesId ({categoryId}: CreateTestsData) {
    return prisma.categories.findUnique({
        where: {
            id: categoryId
        }
    })
}

export async function create ({name, pdfUrl, categoryId, teacherDisciplineId}: CreateTestsData) {
    return prisma.tests.create({
        data: {
            name,
            pdfUrl,
            categoryId,
            teacherDisciplineId
        }
    })
}