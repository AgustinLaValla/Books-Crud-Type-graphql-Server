import { ErrorResponse } from "../types/ErrorResponse";

export function internalServerErrorMessage(): ErrorResponse[] {
    return [
        {
            message: 'Internal Server Error',
            status: 500
        }
    ]

}