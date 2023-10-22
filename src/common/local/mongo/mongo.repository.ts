import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Collection, MongoClient } from 'mongodb';
import { client } from './client';

export class MongoRepository<Schema> {
  collection(collectionName: string): Collection<Schema> {
    return client.db(process.env.MONGODB_NAME).collection(collectionName);
  }
}
