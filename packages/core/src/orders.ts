export * as Orders from "./orders";
import {SQL} from "./sql";
import {sql} from "kysely";
import {sendEmail} from "@dinenation-postgresql/functions/src/sendEmail";

export async function addOrder(
  status: string,
  price: number,
  combo_price: number,
  coupon_id: number,
  customer_id: number,
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
      combo_price,
      customer_id,
      coupon_id,
      comment,
      address,
      date_updated: sql`now()`,
    })
    .returningAll()
    .execute();
  // await sendEmail({
  //   to: 'annabolik11@gmail.com',
  //   subject: 'Test Email',
  //   body: 'This is a test email sent from Amazon SES.',
  // });
  return result;
}

export async function updateOrder(
  id: number,
  number: string,
  status: string,
  price: number,
  combo_price: number,
  coupon_id: number,
  customer_id: number,
  comment: string | null | undefined,
  address: string | null | undefined,
) {
  const [result] = await SQL.DB.updateTable("orders")
    .set({
      id,
      number,
      status,
      price,
      combo_price,
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

export async function updateOrderPrice(id: number, price: number) {
  const [result] = await SQL.DB.updateTable("orders")
    .set({
      id,
      price,
      date_updated: sql`now()`,
    })
    .where("id", "=", id)
    .returningAll()
    .execute();
  return result;
}

export async function deleteOrder(id: number) {
  await SQL.DB.deleteFrom("boxes")
    .where("order_id", "=", id)
    .execute();
  await SQL.DB.deleteFrom("orders")
    .where('id', '=', id)
    .execute();
  return true
}

export function orders() {
  return SQL.DB.selectFrom("orders")
    .selectAll()
    .orderBy("date_created", "desc")
    .execute();
}

export async function orderProducts(id: number) {
  return await SQL.DB.selectFrom("boxes")
    .selectAll()
    .where("order_id", "=", id)
    .orderBy("date_created", "desc")
    .execute();
}

export function ordersByCustomerId(customer_id: number) {
  return SQL.DB.selectFrom("orders")
    .selectAll()
    .where("customer_id", "=", customer_id)
    .orderBy("date_created", "desc")
    .execute();
}

export async function getOrder(id: number) {
  const [result] = await SQL.DB.selectFrom("orders")
    .selectAll()
    .where("id", "=", id)
    .execute();
  return result
}

export async function getOrderCustomerId(id: number, customer_id: number) {
  const [result] = await SQL.DB.selectFrom("orders")
    .selectAll()
    .where("id", "=", id)
    .where("customer_id", "=", customer_id)
    .execute();
  return result
}


