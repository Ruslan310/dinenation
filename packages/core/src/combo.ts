export * as Combo from "./combo";
import {SQL} from "./sql";
import {sql} from "kysely";

export async function addCombo(
  title: string,
  domain_id: number,
  price: number,
  type: string,
  image: string,
  description: string | null | undefined,
  week_day: string,
  status: string,
) {
  const [result] = await SQL.DB.insertInto("combo")
    .values({
      title,
      domain_id,
      price,
      date_updated: sql`now()`,
      type,
      image,
      description,
      week_day,
      status,
    })
    .returningAll()
    .execute();
  return result;
}

export async function addComboProducts(
  product_id: number,
  combo_id: number,
  price: number,
  dish_type: string,
) {
  const [result] = await SQL.DB.insertInto("combo_product")
    .values({
      product_id,
      combo_id,
      price,
      dish_type,
      date_updated: sql`now()`,
    })
    .returningAll()
    .execute();
  return result;
}

export async function updateCombo(
  id: number,
  title: string,
  domain_id: number,
  price: number,
  type: string,
  image: string,
  description: string | null | undefined,
  week_day: string,
  status: string,
) {
  const [result] = await SQL.DB.updateTable("combo")
    .set({
      title,
      domain_id,
      price,
      date_updated: sql`now()`,
      type,
      image,
      description,
      week_day,
      status,
    })
    .where("id", "=",id)
    .returningAll()
    .execute();
  return result;
}

export async function deleteCombo(id: number) {
  await SQL.DB.deleteFrom("combo_product")
    .where("combo_id", "=", id)
    .execute();
  return await SQL.DB.deleteFrom("combo")
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

export async function deleteComboProduct(id: number) {
  await SQL.DB.deleteFrom("combo_product")
    .where('combo_id', '=', id)
    .execute();
  await SQL.DB.selectFrom("combo_product")
    .selectAll()
    .where("combo_id", "=", id)
    .execute();
  return true;
}

export function combos() {
  return SQL.DB.selectFrom("combo")
    .selectAll()
    .orderBy("date_created", "desc")
    .execute();
}

export function getCombosByCoupon(domain_id: number) {
  return SQL.DB.selectFrom("combo")
    .selectAll()
    .where("domain_id", "=", domain_id)
    .execute();
}

export async function comboProducts(id: number) {
  const productIdList = await SQL.DB.selectFrom("combo_product")
    .selectAll()
    .where("combo_id", "=", id)
    .execute();
  const productList = await SQL.DB.selectFrom("product")
    .selectAll()
    .orderBy("date_created", "desc")
    .execute();

  return productList
    .filter(product => productIdList.some(combo => combo.product_id === product.id))
    .map(product => {
      const combo = productIdList.find(combo => combo.product_id === product.id);
      return {
        ...product,
        price: combo ? combo.price : product.price,
        dish_type: combo ? combo.dish_type : product.dish_type,
      };
    });
}

export async function getCombo(id: number) {
  const [result] = await SQL.DB.selectFrom("combo")
    .selectAll()
    .where("id", "=", id)
    .execute();
  return result
}
