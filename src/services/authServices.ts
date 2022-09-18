import { Users } from "@prisma/client";
export type CreateUserData = Omit<Users, "id">;
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import * as repositories from "../repositories/authRepository"

export async function SignUp(user: CreateUserData) {
    const findByEmail = await repositories.findByEmail(user);   
    if(findByEmail) { 
        throw { type: "conflict", message: "Users must have unique emails" }; 
    };
    
    const SALT = Number(process.env.SALT)
    const passwordEncrypt = bcrypt.hashSync(user.password, SALT);
    
    const createuser = await repositories.createUser({... user, password: passwordEncrypt});
    
    return createuser;
}

export async function SignIn(user: CreateUserData) {
    const findByEmail = await repositories.findByEmail(user);
    if(!findByEmail) { throw { type: "unauthorized", message: "Incorrect email or password" }; };
    
    const authorization = bcrypt.compareSync(user.password, findByEmail.password);
    if (!authorization) { throw { type: "unauthorized", message: "Incorrect email or password" }; };
    
    const userId = findByEmail.id;
    const JWT = process.env.JWT;
    const token = jwt.sign({userId}, JWT);

    return {token: token}
}