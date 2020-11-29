
import {
  Injectable, NestInterceptor, ExecutionContext,
  CallHandler, ConflictException
} from "@nestjs/common";
import {Observable, throwError} from "rxjs";
import {catchError, timeout} from "rxjs/operators";
import {SQL_ERROR_CODE} from "../constants/error";

  @Injectable()
export class SqlInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(10000),
      catchError(err => {
        let finalError: any = err;
        switch (err.code) {
          case SQL_ERROR_CODE.VIOLATE_CONSTAINT:
            finalError = new ConflictException();
            break;
          case SQL_ERROR_CODE.ALREADY_EXIST:
            finalError = new ConflictException();
          default:
            break;
        }
        return throwError(finalError);
      }),
    );
  };
};

