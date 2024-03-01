import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({type: 'text'})
  email: string;

  @Column({type: 'text'})
  password: string;
}
