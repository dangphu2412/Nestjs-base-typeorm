import {DEFAULT_ERROR} from "src/common/constants"

/**
 *
 * Interface of nestjs error
 *
 */
export interface IError {
    statusCode: number;
    message: string;
    error ?: string;
}


/**
 *
 * Type for hint
 *
 */
export type TError = "NOT_FOUND" | "CONFLICT" | "EXISTED"
| "UNAUTHORIZED" | "FORBIDDEN";


/**
 *
 * Auto gen error with some default
 *
 */
export const genericError = {
  NOT_FOUND: (target: string): string => `Not found this ${target}`,
  CONFLICT: (action: string): string => `Your record has been ${action}`,
  EXISTED: (target: string): string => `${target} has already been existed`,
  UNAUTHORIZED: (target: string): string => `Not found this ${target}`,
  FORBIDDEN: (user: string): string => `${user} is not allow to access this resource`
}


/**
 *
 * @param error which should be as a type of nestjs
 *
 */

export const filterError = (error: IError): IError => {
  return {
    statusCode: error.statusCode,
    message: error.message ?? DEFAULT_ERROR[error.statusCode],
    error: error?.error ?? "You are getting error"
  }
}

/**
 *
 * @param type type for generic error
 * @param customMessage as it 's meaning
 */
export const genError = (type: TError, customMessage: string): string =>
  (genericError[type](customMessage));

