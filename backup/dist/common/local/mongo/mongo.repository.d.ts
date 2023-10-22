import { Collection } from 'mongodb';
export declare class MongoRepository<Schema> {
    collection(collectionName: string): Collection<Schema>;
}
