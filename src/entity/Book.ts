import { Field, ID, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Book extends BaseEntity {
    @Field(() => ID, { nullable: false })
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String, { nullable: false })
    @Column({ type: 'varchar', nullable: false })
    title!: string;

    @Field(() => String, { nullable: false })
    @Column({ type: 'varchar', nullable: false })
    author!: string;

    @Field(() => Boolean, { nullable: false })
    @Column({ type: 'boolean', nullable: true, default: false })
    isPublished!: boolean;

    @Field()
    @CreateDateColumn()
    createdAt!: Date;
}