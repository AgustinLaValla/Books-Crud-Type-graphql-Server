import { ErrorResponse } from "../types/ErrorResponse";
import { CreateUserInput } from "../types/user/CreateUserInput";

export function createUserInputValidator(createUserInput: CreateUserInput): ErrorResponse[] {
    const { firstname, lastname, email, password } = createUserInput;

    let errors: ErrorResponse[] = [];

    if (!firstname) {
        errors.push({
            message: 'Bad Input: Firstname is required',
            status: 400
        });
    }

    if (!lastname) {
        errors.push({
            message: 'Bad Input: Lastname is required',
            status: 400
        });
    }

    if (!email) {
        errors.push({
            message: 'Bad Input: Email is required',
            status: 400
        });
    }

    if (!password) {
        errors.push({
            message: 'Bad Input: Password is required',
            status: 400
        });
    }

    return errors;
}