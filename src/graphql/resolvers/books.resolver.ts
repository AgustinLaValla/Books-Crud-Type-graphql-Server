import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Book } from "../../entity/Book";
import { BookInput } from '../types/BookInput';
import { BookResponse } from "../types/BookResponse";
import { ErrorResponse } from "../types/ErrorResponse";
import { SuccessResponse } from "../types/SuccessResponse";
import { UpdateBookInput } from "../types/UpdateBookInput";
import { createBookInputValidator } from "../utils/createBookInputValidator";
import { internalServerErrorMessage } from "../utils/internalServerError";

@Resolver()
export class BookResolver {
    @Query(() => [Book])
    async books() {
        return Book.find();
    }

    @Query(() => BookResponse)
    async book(@Arg('id') id: number): Promise<BookResponse> {
        try {
            const book = await Book.findOne({ where: { id } });
            return { book };
        } catch (error) {
            return { error: internalServerErrorMessage() }
        }
    }

    @Mutation(() => BookResponse)
    async cretaeBook(@Arg('bookInput') bookInput: BookInput): Promise<BookResponse> {
        const errors = createBookInputValidator(bookInput);
        if (errors.length) return { error: errors };

        const { author, title, isPublished = false } = bookInput;

        try {
            const book = await Book.create({ author, title, isPublished }).save();
            return { book };
        } catch (error) {
            return {
                error: internalServerErrorMessage()
            }
        }
    }

    @Mutation(() => SuccessResponse)
    async updateBook(@Arg('updateBookInput') updateBookInput: UpdateBookInput): Promise<SuccessResponse> {
        const { id, isPublished } = updateBookInput;
        try {
            await Book.update({ id }, { isPublished });
            return { message: 'Book Successfully Updated' }
        } catch (error) {
            return { error: internalServerErrorMessage() }
        }
    }

    @Mutation(() => SuccessResponse)
    async removeBook(@Arg('id') id: number): Promise<SuccessResponse> {
        try {
            await Book.delete({ id });
            return { message: 'Book Successfully Deleted' }
        } catch (error) {
            return { error: internalServerErrorMessage() }
        }
    }
}