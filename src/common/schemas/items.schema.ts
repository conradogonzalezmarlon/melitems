export enum ItemsStatus {
  APPROVED = 'APPROVED',
  FAILED = 'FAILED',
}

export class ItemsSchema {
  site: string;
  id: string;
  price?: number;
  start_time?: string;
  name?: string;
  description?: string;
  nickname?: string;
  metadata?: object;
  status: ItemsStatus;
  created_at?: Date;
}
