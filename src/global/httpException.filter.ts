import {ExceptionFilter, Catch, ArgumentsHost, HttpException} from "@nestjs/common";
import {Response} from "express";
import {IError, filterError} from "src/utils/error";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errorResponse = filterError(exception.getResponse() as IError);
    response
      .status(status)
      .json(errorResponse);
  }
}
