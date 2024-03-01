import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Product } from "../product/productModel";

@Entity()
export class Fabric {
  @PrimaryGeneratedColumn()
  IdFab: number;

  @Column({type: 'text'})
  name: string;

  @Column({type: 'text'})
  description: string;

  @OneToMany(() => Product, product => product.fabric)
  products: Product[];
}
