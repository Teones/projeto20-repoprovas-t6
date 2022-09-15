import Joi from "joi";

import { CreateTestsData } from "../services/testServices.js";

const testsCreatedSchema = Joi.object<CreateTestsData>({
    name: Joi.string().required(),
    pdfUrl: Joi.string().uri().required(),
    categoryId: Joi.number().required(),
    teacherDisciplineId: Joi.number().required()
});

export {
    testsCreatedSchema
}