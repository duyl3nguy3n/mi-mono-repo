export class NoRecordFoundError extends Error {
  statusCode = 400;
  constructor(key: string) {
    super(`Cannot find record with key: ${key}`);
  }
}
