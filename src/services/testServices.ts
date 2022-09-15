import { Tests } from "@prisma/client";

import { verifyToken } from "../utils/authenticationUtils.js";
import * as repositories from "../repositories/testRepository.js" 

export type CreateTestsData = Omit<Tests, "id">;

export async function create (test: CreateTestsData, token: string) {
    await verifyToken(token);

    const checkTeacherDisciplined = await repositories.findByTeacherId(test);
    if (!checkTeacherDisciplined) { throw { type: "no_content"} };

    const checkCategories = await repositories.findByCategoriesId(test);
    if (!checkCategories) { throw { type: "no_content"} };

    const create = await repositories.create(test);
    return create
};