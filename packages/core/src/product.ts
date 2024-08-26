export * as Product from "./product";
import {SQL} from "./sql";
import {sql} from "kysely";

export async function addProduct(
  title: string,
  price: number,
  allergens: string | null | undefined,
  sauces: string | null | undefined,
  categories: string,
  dish_type: string,
  image: string,
  description: string | null | undefined,
  week_day: string,
  status: string,
  calories: string | null | undefined,
) {
  const [result] = await SQL.DB.insertInto("product")
    .values({
      title,
      price,
      date_updated: sql`now()`,
      allergens,
      sauces,
      categories,
      dish_type,
      image,
      description,
      week_day,
      status,
      calories,
    })
    .returningAll()
    .execute();
  return result;
}

export async function updateProduct(
  id: number,
  title: string,
  price: number,
  allergens: string | null | undefined,
  sauces: string | null | undefined,
  categories: string,
  dish_type: string,
  image: string,
  description: string | null | undefined,
  week_day: string,
  status: string,
  calories:  string | null | undefined,
) {
  const [result] = await SQL.DB.updateTable("product")
    .set({
      title,
      price,
      date_updated: sql`now()`,
      allergens,
      sauces,
      categories,
      dish_type,
      image,
      description,
      week_day,
      status,
      calories,
    })
    .where("id", "=", id)
    .returningAll()
    .execute();
  return result;
}

export async function deleteProduct(id: number) {
  await SQL.DB.deleteFrom("combo_product")
    .where("product_id", "=", id)
    .execute();
  await SQL.DB.deleteFrom("product")
    .where('id', '=', id)
    .execute();
  return true
}

export function products() {
  return SQL.DB.selectFrom("product")
    .selectAll()
    .orderBy("date_created", "desc")
    .execute();
}

export async function getProduct(id: number) {
  const [result] = await SQL.DB.selectFrom("product")
    .selectAll()
    .where("id", "=", id)
    .execute();
  return result
}
