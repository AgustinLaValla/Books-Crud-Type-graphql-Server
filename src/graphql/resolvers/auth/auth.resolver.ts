import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../../entity/User";
import { CreateUserInput } from '../../types/user/CreateUserInput';
import { LoginInput } from "../../types/user/LoginInput";
import { UserResponse } from "../../types/user/UserResponse";
import { createUserInputValidator } from "../../utils/createUserInputValidator";
import { customErrorMessage } from "../../utils/customErrorMessage";
import { internalServerErrorMessage } from "../../utils/internalServerError";
import { loginInputValidator } from "../../utils/loginInputValidator";
import { generateToken } from "../../utils/token";

@Resolver()
export class AuthResolver {

    @Mutation(() => UserResponse)
    async register(@Arg('createUserInput') createUserInput: CreateUserInput): Promise<UserResponse> {
        const errors = createUserInputValidator(createUserInput);
        if (errors.length) {
            return { error: errors }
        }

        const { firstname, lastname, email, password } = createUserInput;

        try {

            const user = await User.findOne({ where: { email } });
            if (user) {
                return { error: [{ message: 'Email already exists', status: 400 }] }
            }

            const newUser = await User.create({ firstname, lastname, email, password });
            await newUser.hashPassword();
            await newUser.save();

            const payload = { id: newUser.id, firstname, lastname, email, createdAt: newUser.createdAt };
            const token = generateToken(payload);

            delete newUser.password;

            return { user: newUser, token }
        } catch (error) {
            return { error: internalServerErrorMessage() }
        }
    }

    @Mutation(() => UserResponse)
    async login(@Arg('loginInput') loginInput: LoginInput): Promise<UserResponse> {
        const errors = loginInputValidator(loginInput);
        if (errors.length) {
            return { error: errors }
        }

        const { email, password } = loginInput;

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) return {
                error: customErrorMessage('User not found')
            }

            const isValid = user.validatePassword(password);
            if (!isValid) return { error: customErrorMessage('User or password is not valid') }


            const payload = {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email,
                createdAt: user.createdAt
            };

            const token = generateToken(payload);

            delete user.password;

            return { user: user, token }
        } catch (error) {
            return { error: internalServerErrorMessage() }
        }
    }
}