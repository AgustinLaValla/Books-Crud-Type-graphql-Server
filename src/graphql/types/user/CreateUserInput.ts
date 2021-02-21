import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUserInput {

    @Field(() => String, { nullable: false })
    firstname!: string;

    @Field(() => String, { nullable: false })
    lastname!: string;

    @Field(() => String, { nullable: false })
    email!: string;

    @Field(() => String, { nullable: false })
    password!: string;
}