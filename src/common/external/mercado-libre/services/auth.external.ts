import { Injectable } from "@nestjs/common";
import { HttpService } from '@nestjs/axios'
import { ConfigService } from "@nestjs/config";
import { lastValueFrom } from "rxjs";
import { AuthOutput } from "../types";
import { Cache } from "../../../decorators";

@Injectable()
export class AuthExternal {
    constructor(private httpService: HttpService, private configService: ConfigService) {}

    @Cache({ ttl: 60 * 60 * 5 })
    public async getAccessToken(): Promise<AuthOutput> {
        // Para evitar tener que hacer una app para obtener el code, trabajo directamente con el refresh token =D
        const { data } = await lastValueFrom(
            this.httpService.post<AuthOutput>('/oauth/token', {
                refresh_token: this.configService.get('MERCADO_LIBRE_REFRESH_TOKEN'),
                grant_type: 'refresh_token',
                client_id: this.configService.get('MERCADO_LIBRE_CLIENT_ID'),
                client_secret: this.configService.get('MERCADO_LIBRE_CLIENT_SECRET'),
            })
        )

        return data;
    }
}