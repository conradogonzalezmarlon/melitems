import { Injectable } from "@nestjs/common";
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from "rxjs";
import { AuthExternal } from "./auth.external";
import { UsersInput, UsersOutput } from "../types";
import { Cache } from "../../../decorators";

@Injectable()
export class UsersExternal {
    constructor(
        private httpService: HttpService,
        private authExternal: AuthExternal,
    ) {}

    @Cache({ ttl: 60 })
    public async getById(input: UsersInput): Promise<UsersOutput> {
        const { access_token, token_type } = await this.authExternal.getAccessToken();
        const { data } = await lastValueFrom(
            this.httpService.get<UsersOutput>(`/users/${input.id}`, {
                headers: {
                    Authorization: `${token_type} ${access_token}`
                }
            })
        )

        return data;
    }
}