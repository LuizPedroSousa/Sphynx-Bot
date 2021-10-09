import { ValidationError } from "class-validator";

interface HttpExceptionProps {
  message: string;
  fields?: ValidationError;
  status?: number;
}

export class HttpException extends Error {
  public fields?: ValidationError;
  public status?: number;
  public message: string;
  constructor({ message, fields, status }: HttpExceptionProps) {
    super(message);

    this.message = message;

    if (status) {
      this.status = status;
    }

    if (fields) {
      this.fields = fields;
    }
  }
}
