import { Injectable } from "@nestjs/common";
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from "rxjs";
import { CurrenciesInput, CurrenciesOutput } from "../types";
import { AuthExternal } from "./auth.external";
import { Cache } from "../../../decorators";

@Injectable()
export class CurrenciesExternal {
    constructor(
        private httpService: HttpService,
        private authExternal: AuthExternal,
    ) {}

    @Cache({ ttl: 60 * 60 * 24 })
    public async getById(input: CurrenciesInput): Promise<CurrenciesOutput> {
        const { access_token, token_type } = await this.authExternal.getAccessToken();
        const { data } = await lastValueFrom(
            this.httpService.get<CurrenciesOutput>(`/currencies/${input.id}`, {
                headers: {
                    Authorization: `${token_type} ${access_token}`
                }
            })
        )

        return data;
    }
}