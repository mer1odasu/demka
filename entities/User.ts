import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"
import { Statement } from "./Statement"

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

		@Column()
		surname: string

    @Column()
    number_phone: number

		@Column()
		admin: Boolean

		@Column({
			unique: true
		})
		email: string

		@Column()
		password: string

		@Column({
			unique: true
		})
		login: string

		@OneToMany(() => Statement, (statement) => statement.user)
    statement: Statement[]
}