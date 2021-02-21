import { ErrorResponse } from "../types/ErrorResponse";

export function customErrorMessage(message: string, status: number = 400): ErrorResponse[] {
    return [{ message, status }]
}