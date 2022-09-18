import { NextFunction, Request, Response } from "express";

import * as userSchema from "../schemas/authSchemas"

export function validateSignUp (req: Request, res: Response, next: NextFunction) {
    const user = req.body;
    const {error} = userSchema.signUpSchema.validate(user, {abortEarly: false});
    if(error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    };

    next();
};

export function validateSignIn (req: Request, res: Response, next: NextFunction) {
    const user = req.body;
    const {error} = userSchema.signInSchema.validate(user, {abortEarly: false});
    if(error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    };

    next();
};