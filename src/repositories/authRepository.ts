import { prisma } from "../config/db.js"
import { CreateUserData } from "../services/authServices.js"

export async function findByEmail({email}: CreateUserData) {
    return prisma.users.findFirst({
        where: {
            email: email
        }
    })
}

export async function createUser ({email, password}: CreateUserData) {
    return prisma.users.create({
        data: {
            email: email,
            password: password
        }
    })
}