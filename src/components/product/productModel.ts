import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Fabric } from "../fabric/fabricModel";

@Entity()
export class Product {
  @PrimaryGeneratedColumn({type: 'bigint'})
  Id: bigint;

  @Column({type: 'text'})
  description: string;

  @Column({type: 'double precision'})
  price: number;

  @Column({type: 'bigint'})
  existency: bigint;

  @ManyToOne(() => Fabric, fabric => fabric.products)
  fabric: Fabric;
}
