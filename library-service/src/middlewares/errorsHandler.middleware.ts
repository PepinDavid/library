import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";

export async function errorHandlerMiddleware(
    err: HttpError,
    _: Request,
    res: Response,
    __: NextFunction
  ): Promise<void> {
  function extractErrorMessage(error: { [key: string]: string }): string {
    if (error instanceof Error) return error.message;
    return typeof error === 'string' ? error : JSON.stringify(error);
  }

  res.status(err.status).send({
    status: err.status,
    message: extractErrorMessage(err) || 'Internal Server Error',
  });
}