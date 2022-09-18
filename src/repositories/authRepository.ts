import { prisma } from "../config/db"
import { CreateUserData } from "../services/authServices"

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