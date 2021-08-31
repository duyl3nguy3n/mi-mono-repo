export class DuplicatedRecordError extends Error {
  statusCode = 400;
  constructor(key: string) {
    super(`Duplicated record with key: ${key}`);
  }
}
