import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class JsonResponseService {
  static SUCCESS = HttpStatus.OK;
  static CREATED = HttpStatus.CREATED;
  static ACCEPTED = HttpStatus.ACCEPTED;
  static NO_CONTENT = HttpStatus.NO_CONTENT;
  static BAD_REQUEST = HttpStatus.BAD_REQUEST;
  static UNAUTHORIZED = HttpStatus.UNAUTHORIZED;
  static FORBIDDEN = HttpStatus.FORBIDDEN;
  static NOT_FOUND = HttpStatus.NOT_FOUND;
  static METHOD_NOT_ALLOW = HttpStatus.METHOD_NOT_ALLOWED;
  static UNPROCESSABLE_ENTITY = HttpStatus.UNPROCESSABLE_ENTITY;
  static INTERNAL_SERVER_ERROR = HttpStatus.INTERNAL_SERVER_ERROR;
  static NOT_IMPLEMENTED = HttpStatus.NOT_IMPLEMENTED;
  static ACCOUNT_NOT_VERIFIED = 209;

  successResponse(
    res: Response,
    message: string = 'Success',
    data: any = null,
    statusCode: number = HttpStatus.OK,
  ) {
    res.status(statusCode).json({
      status: true,
      message,
      data,
    });
  }

  errorResponse(
    res: Response,
    message: string = "Not found",
    statusCode: number = HttpStatus.NOT_FOUND,
    header: string = "Error"
  ) {
    res.status(statusCode).json({
      header,
      status: false,
      message,
    });
  }
}
