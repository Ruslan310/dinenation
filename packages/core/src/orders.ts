import {int} from "aws-sdk/clients/datapipeline";
export * as Orders from "./orders";
import {SQL} from "./sql";
import {sql} from "kysely";

export async function addOrder(
  status: string,
  price: string,
  coupon_id: int,
  customer_id: int,
  comment: string | null | undefined,
  address: string | null | undefined,
) {
  const startNumber = 'DN-70000'
  const [lastOrder] = await SQL.DB.selectFrom("orders")
    .select("number")
    .orderBy("number", "desc")
    .limit(1)
    .execute();
  const lastNumber = lastOrder?.number || startNumber;
  const numericPart = parseInt(lastNumber.split('-')[1], 10);
  const newNumber = `DN-${numericPart + 1}`;

  const [result] = await SQL.DB.insertInto("orders")
    .values({
      number: newNumber,
      status,
      price,
      customer_id,
      coupon_id,
      comment,
      address,
      date_updated: sql`now()`,
    })
    .returningAll()
    .execute();
  return result;
}

export async function updateOrder(
  id: int,
  number: string,
  status: string,
  price: string,
  coupon_id: int,
  customer_id: int,
  comment: string | null | undefined,
  address: string | null | undefined,
) {
  const [result] = await SQL.DB.updateTable("orders")
    .set({
      id,
      number,
      status,
      price,
      coupon_id,
      customer_id,
      comment,
      address,
      date_updated: sql`now()`,
    })
    .where("id", "=", id)
    .returningAll()
    .execute();
  return result;
}

export async function deleteOrder(id: int) {
  await SQL.DB.deleteFrom("boxes")
    .where("order_id", "=", id)
    .execute();
  return await SQL.DB.deleteFrom("orders")
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

export function orders() {
  return SQL.DB.selectFrom("orders")
    .selectAll()
    .orderBy("date_created", "desc")
    .execute();
}

export async function orderProducts(id: int) {
  return await SQL.DB.selectFrom("boxes")
    .selectAll()
    .where("order_id", "=", id)
    .execute();
}

export function ordersByCustomerId(customer_id: int) {
  return SQL.DB.selectFrom("orders")
    .selectAll()
    .where("customer_id", "=", customer_id)
    .execute();
}

export async function getOrder(id: int) {
  const [result] = await SQL.DB.selectFrom("orders")
    .selectAll()
    .where("id", "=", id)
    .execute();
  return result
}

export async function getOrderCustomerId(id: int, customer_id: int) {
  const [result] = await SQL.DB.selectFrom("orders")
    .selectAll()
    .where("id", "=", id)
    .where("customer_id", "=", customer_id)
    .execute();
  return result
}


