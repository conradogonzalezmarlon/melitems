import { Injectable } from "@nestjs/common";
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from "rxjs";
import { CategoryInput, CategoryOutput } from "../types";
import { AuthExternal } from "./auth.external";
import { Cache } from "../../../decorators";

@Injectable()
export class CategoryExternal {
    constructor(
        private httpService: HttpService,
        private authExternal: AuthExternal,
    ) {}

    @Cache({ ttl: 60 * 5 })
    public async getById(input: CategoryInput): Promise<CategoryOutput> {
        const { access_token, token_type } = await this.authExternal.getAccessToken();
        const { data } = await lastValueFrom(
            this.httpService.get<CategoryOutput>(`/categories/${input.id}`, {
                headers: {
                    Authorization: `${token_type} ${access_token}`
                }
            })
        )

        return data;
    }
}