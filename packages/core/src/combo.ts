export * as Combo from "./combo";
import {SQL} from "./sql";
import {sql} from "kysely";
import {int} from "aws-sdk/clients/datapipeline";


export async function addCombo(
  title: string,
  coupon_id: int,
  price: string,
  type: string,
  image: string,
  description: string | null | undefined,
  week_day: string,
  status: string,
) {
  const [result] = await SQL.DB.insertInto("combo")
    .values({
      title,
      coupon_id,
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
  price: string,
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
  id: int,
  title: string,
  coupon_id: int,
  price: string,
  type: string,
  image: string,
  description: string | null | undefined,
  week_day: string,
  status: string,
) {
  const [result] = await SQL.DB.updateTable("combo")
    .set({
      title,
      coupon_id,
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

export async function deleteCombo(id: int) {
  await SQL.DB.deleteFrom("combo_product")
    .where("combo_id", "=", id)
    .execute();
  return await SQL.DB.deleteFrom("combo")
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

export async function deleteComboProduct(id: int) {
  await SQL.DB.deleteFrom("combo_product")
    .where('combo_id', '=', id)
    .execute();
  const [result] = await SQL.DB.selectFrom("combo_product")
    .selectAll()
    .where("combo_id", "=", id)
    .execute();
  return result
}

export function combos() {
  return SQL.DB.selectFrom("combo")
    .selectAll()
    .orderBy("date_created", "desc")
    .execute();
}

export function getCombosByCoupon(coupon_id: int) {
  return SQL.DB.selectFrom("combo")
    .selectAll()
    .where("coupon_id", "=", coupon_id)
    .execute();
}

export async function comboProducts(id: int) {
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

export async function getCombo(id: int) {
  const [result] = await SQL.DB.selectFrom("combo")
    .selectAll()
    .where("id", "=", id)
    .execute();
  return result
}
