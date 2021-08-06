import { StatusCodes } from 'http-status-codes';

export class APIError {
  httpCode: number;
  description: string;
  message: string;

  constructor(code: number, description: string, message?: string) {
    (this.httpCode = code),
      (this.description = description),
      (this.message = message || '');
  }
}

export const NOT_FOUND_ERROR = new APIError(
  StatusCodes.NOT_FOUND,
  'Object not found'
);
