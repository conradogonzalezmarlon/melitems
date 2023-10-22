import { HttpService } from '@nestjs/axios';
import { CurrenciesInput, CurrenciesOutput } from "../types";
import { AuthExternal } from "./auth.external";
export declare class CurrenciesExternal {
    private httpService;
    private authExternal;
    constructor(httpService: HttpService, authExternal: AuthExternal);
    getById(input: CurrenciesInput): Promise<CurrenciesOutput>;
}
