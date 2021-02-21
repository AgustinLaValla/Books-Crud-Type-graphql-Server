import { BookInput } from "../types/book/BookInput";
import { ErrorResponse } from "../types/ErrorResponse";

export function createBookInputValidator(bookInput: BookInput): ErrorResponse[] {
    let errors: ErrorResponse[] = [];
    const { author, title } = bookInput;

    if (!author) {
        errors.push({
            message: 'Bad Input: Author is Required',
            status: 400
        })
    }

    if (!title) {
        errors.push({
            message: 'Bad Input: Title is Required',
            status: 400
        })
    }

    return errors;
}