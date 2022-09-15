import { Request, Response } from "express";

import * as services from "../services/testServices.js"

export async function create (req: Request, res: Response) {
    const token = req.headers["token"] as string
    if(!token) { throw { type: "not_found" } };

    const test: services.CreateTestsData = req.body;
    if(!test.name || !test.pdfUrl || !test.categoryId || !test.teacherDisciplineId) {
        throw { type: "not_found" } ;
    };
    if(typeof(test.categoryId) !== "number" || typeof(test.teacherDisciplineId) !== "number") {
        throw { type: "not_found" };
    }

    const create = await services.create(test, token);

    return res.status(201).send(create);
}