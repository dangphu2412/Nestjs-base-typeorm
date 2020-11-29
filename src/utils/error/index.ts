import {DEFAULT_ERROR} from "src/common/constants"

export interface IError {
    statusCode: number;
    message: string;
    error ?: string;
}

export const filterError = (error: IError): IError => {
  return {
    statusCode: error.statusCode,
    message: error.message ?? DEFAULT_ERROR[error.statusCode],
    error: error?.error ?? "You are getting error"
  }
}
