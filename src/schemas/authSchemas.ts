import Joi from "joi";

import { CreateUserData } from "../services/authServices";

const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref("password")
});

const signInSchema = Joi.object<CreateUserData>({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export {
    signUpSchema,
    signInSchema
};