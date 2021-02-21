import { sign, Secret, verify } from "jsonwebtoken";
import { config } from 'dotenv';
import { AuthResponse, DecodedToken } from "../types/user/AuthResponse";
import { customErrorMessage } from "./customErrorMessage";

config();

const SECRET = process.env.SECRET as Secret;

export function generateToken(payload: any) {
    return sign(payload, SECRET, { expiresIn: '4h' });
}

export function isAuth(ctx: any): AuthResponse {
    const bearerToken = ctx.req.headers.authorization;

    if (!bearerToken) return { error: customErrorMessage('No token Provided') }

    const token = bearerToken.split(' ')[1];

    if(!token) return { error: customErrorMessage('Token must be Bearer format') }

    const decoded = verify(token, SECRET) as DecodedToken;

    if (decoded.exp * 1000 < Date.now()) {
        return { error: customErrorMessage('Token has expired') }
    }

    return { decodedToken: decoded }
}