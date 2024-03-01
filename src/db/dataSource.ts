import "reflect-metadata"
import { DataSource } from "typeorm"
import { Fabric } from "../components/fabric/fabricModel"
import { Product } from "../components/product/productModel"


export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "admin",
  database: process.env.DB_DATABASE || "test",
  entities: [Fabric, Product],
  synchronize: true,
  logging: false,
});
