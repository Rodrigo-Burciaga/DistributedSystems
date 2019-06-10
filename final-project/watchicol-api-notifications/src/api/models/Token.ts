import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("token")
export class Token {

    @PrimaryGeneratedColumn({type: "int"})
    public id: number;

    @Column({type: "nvarchar", length: 500, nullable: false, unique: true, name: "access_token"})
    public accessToken: string;

    @Column({type: "bigint", nullable: false, unique: false})
    public issuedAt: Number;

    @Column({type: "bigint", nullable: false, unique: false})
    public expiresAt: Number;

    @ManyToOne((type) => User, (user) => user.tokens)
    public user: User;
}