import { Field, InputType, Int } from "type-graphql";

@InputType()
export class UpdateBookInput {
    @Field(() => Int, { nullable: false })
    id!: number;

    @Field(() => Boolean, { nullable: false })
    isPublished?: boolean;
}