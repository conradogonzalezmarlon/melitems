import { HttpService } from '@nestjs/axios';
import { CategoryInput, CategoryOutput } from "../types";
import { AuthExternal } from "./auth.external";
export declare class CategoryExternal {
    private httpService;
    private authExternal;
    constructor(httpService: HttpService, authExternal: AuthExternal);
    getById(input: CategoryInput): Promise<CategoryOutput>;
}
