import { HttpService } from '@nestjs/axios';
import { AuthExternal } from "./auth.external";
import { ItemsInput, ItemsOutput } from "../types";
export declare class ItemsExternal {
    private httpService;
    private authExternal;
    constructor(httpService: HttpService, authExternal: AuthExternal);
    getById(input: ItemsInput): Promise<ItemsOutput>;
}
