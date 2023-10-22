import { MongoClient } from "mongodb";
import 'dotenv/config';
export declare const client: MongoClient;
export declare const connectMongo: () => Promise<MongoClient>;
