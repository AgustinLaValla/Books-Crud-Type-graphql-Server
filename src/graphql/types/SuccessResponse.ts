import { Field, ObjectType } from "type-graphql";
import { ErrorResponse } from "./ErrorResponse";

@ObjectType()
export class SuccessResponse {
    @Field(() => String, { nullable: true })
    message?: string;

    @Field(() => [ErrorResponse], { nullable: true })
    error?: ErrorResponse[]
}