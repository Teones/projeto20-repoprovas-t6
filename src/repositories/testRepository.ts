import { prisma } from "../config/db";
import { CreateTestsData } from "../services/testServices";

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

export async function viewsByDisciplines () {
    return prisma.terms.findMany({
        include: {
            Disciplines: {
                include: {
                    TeacherDisciplines: {
                        include: {
                            Teachers: true,
                            Tests: {
                                include: {
                                    Categories: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}

export async function viewsByTeachers () {
    return prisma.teachers.findMany({
        include: {
            TeacherDisciplines: {
                include: {
                    Disciplines: {
                        include: {
                            TeacherDisciplines: {
                                include: {
                                    Tests: {
                                        include: {
                                            Categories: true
                                        }
                                    }
                                }
                            },
                            Terms: true
                        }
                    }
                }
            }
        }
    })
}