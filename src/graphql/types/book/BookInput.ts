import { Field, InputType } from "type-graphql";

@InputType()
export class BookInput {
    @Field(() => String, { nullable: false })
    title!: string;

    @Field(() => String, { nullable: false })
    author!: string;

    @Field(() => Boolean, { nullable: true })
    isPublished?: boolean;
}