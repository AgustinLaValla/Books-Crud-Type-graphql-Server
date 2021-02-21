import { ErrorResponse } from "../types/ErrorResponse";
import { LoginInput } from "../types/user/LoginInput";

export function loginInputValidator(loginInput: LoginInput) {
    const { email, password } = loginInput;
    const errors: ErrorResponse[] = [];

    if (!email) {
        errors.push({
            message: 'Email is required',
            status: 400
        })
    }

    if (!password) {
        errors.push({
            message: 'Password is required',
            status: 400
        })
    }

    return errors;
}