import { Field, ObjectType } from "type-graphql";
import { Book } from "../../../entity/Book";
import { ErrorResponse } from "../ErrorResponse";

@ObjectType()
export class BookResponse {
    @Field(() => [ErrorResponse], { nullable: true })
    error?: ErrorResponse[];

    @Field(() => Book, { nullable: true })
    book?: Book;
}