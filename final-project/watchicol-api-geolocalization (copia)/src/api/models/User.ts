import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Token } from "./Token";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn({type: "int"})
    public id: Number;

    @Column({type: "nvarchar", length: 255, nullable: false, unique: true})
    public mail: string;

    @Column({type: "nvarchar", length: 30, nullable: false, unique: true})
    public userName: string;

    @Column({type: "nvarchar", length: 255, nullable: true})
    public tenantId: string;

    @Column({type: "nvarchar", length: 50, nullable: false})
    public password: string;

    @Column({type: "nvarchar", length: 255, nullable: true})
    public loggedAt: string;

    @Column({type: "date", nullable: true})
    public firstLogin: Date;

    @Column({type: "nvarchar", length: 500, nullable: true, unique: true})
    public signId: string;

    @OneToMany((type) => Token, (token) => token.user, {
        eager: true
    })
    @JoinTable()
    public tokens: Array<Token>;
}
