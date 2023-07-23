import { db } from "../database/knex";
import { TProducts } from "../types";

//SEARCH PRODUCTS
export async function searchProductsByName(name: string): Promise<TProducts[]> {
  const nameLowerCase = name.toLowerCase();
  const foundProduct = await db.raw(`
    SELECT * FROM products
    WHERE name LIKE '%${nameLowerCase}%';
    `)

  return foundProduct;
}