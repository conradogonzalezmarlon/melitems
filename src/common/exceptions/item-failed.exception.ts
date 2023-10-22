export class ItemFailedException extends Error {
  message: string;
  error: string;
  status: number;

  constructor(error: Partial<ItemFailedException>) {
    super(error.message);
  }
}
