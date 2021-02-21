import { Field, Int, ObjectType } from "type-graphql";
import { ErrorResponse } from "../ErrorResponse";

@ObjectType()
export class DecodedToken {
    @Field(() => String, { nullable: false })
    id!: number;

    @Field(() => String, { nullable: false })
    fistname!: string;

    @Field(() => String, { nullable: false })
    lastname!: string;

    @Field(() => String, { nullable: false })
    email!: string;

    @Field(() => Date, { nullable: true })
    createdAt?: Date | string;

    @Field(() => Int, { nullable: true })
    iat?: number;

    @Field(() => Int, { nullable: false })
    exp!: number;
}

export class AuthResponse {
    @Field(() => DecodedToken, { nullable: false })
    decodedToken?: DecodedToken;

    @Field(() => [ErrorResponse], { nullable: false })
    error?: ErrorResponse[]
}