import { MongoClient } from "mongodb";
import 'dotenv/config';

export const client = new MongoClient(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`);
export const connectMongo = (): Promise<MongoClient> => client.connect();
