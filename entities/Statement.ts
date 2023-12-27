import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity()
export class Statement extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    car_number: string

    @Column()
    description: string

		@Column()
		status: string

		@ManyToOne(() => User, (user) => user.statement)
    user: User
}