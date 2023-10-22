import { HttpService } from '@nestjs/axios';
import { AuthExternal } from "./auth.external";
import { UsersInput, UsersOutput } from "../types";
export declare class UsersExternal {
    private httpService;
    private authExternal;
    constructor(httpService: HttpService, authExternal: AuthExternal);
    getById(input: UsersInput): Promise<UsersOutput>;
}
