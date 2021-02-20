import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class ErrorResponse {
    @Field(() => Int)
    status!: number;

    @Field(() => String)
    message!: string
}