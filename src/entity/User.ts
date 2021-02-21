import { compare, genSalt, hash } from "bcryptjs";
import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class User extends BaseEntity {

    @Field(() => ID, { nullable: false })
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String, { nullable: false })
    @Column({ type: 'varchar', nullable: false })
    firstname!: string;

    @Field(() => String, { nullable: false })
    @Column({ type: 'varchar', nullable: false })
    lastname!: string;

    @Field(() => String, { nullable: false })
    @Column({ type: 'varchar', nullable: false, unique: true })
    email!: string;

    @Field(() => String, { nullable: true })
    @Column({ type: 'varchar', nullable: false })
    password?: string;

    @Field(() => Date, { nullable: true })
    @CreateDateColumn({ type: 'datetime', nullable: true })
    createdAt!: Date | string;

    async hashPassword(): Promise<void> {
        const salt = await genSalt(10);
        if (this.password) {
            this.password = await hash(this.password, salt);
        }
    }

    async validatePassword(password: string): Promise<boolean> {
        return this.password
            ? await compare(password, this.password)
            : false;
    }
}