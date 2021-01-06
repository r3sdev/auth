import { ApiProperty, ApiHideProperty, } from "@nestjs/swagger";
import { Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @ApiProperty({ example: 1, description: "The user's id" })
    @Expose()
    @PrimaryGeneratedColumn()
    id?: number;

    @ApiProperty({ example: "user@tld.com", description: "The user's email address" })
    @Expose()
    @Column({ unique: true })
    email: string;

    @ApiProperty({ example: "John", description: "The user's first name" })
    @Expose()
    @Column()
    firstName: string;

    @ApiProperty({ example: "Doe", description: "The user's last name" })
    @Expose()
    @Column()
    lastName: string;

    @ApiHideProperty()
    @Column()
    password: string;

    @Expose()
    @ApiProperty({ example: "John Doe", description: "The user's full name", readOnly: true })
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}