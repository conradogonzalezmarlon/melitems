import { HttpService } from '@nestjs/axios';
import { ConfigService } from "@nestjs/config";
import { AuthOutput } from "../types";
export declare class AuthExternal {
    private httpService;
    private configService;
    constructor(httpService: HttpService, configService: ConfigService);
    getAccessToken(): Promise<AuthOutput>;
}
