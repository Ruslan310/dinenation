export * as Coupons from "./coupons";
import {SQL} from "./sql";
import {sql} from "kysely";
import {int} from "aws-sdk/clients/datapipeline";


export async function addCoupon(
  title: string,
  expiration_date: string | null | undefined,
  status: string,
) {
  const [result] = await SQL.DB.insertInto("coupons")
    .values({
      title,
      expiration_date,
      date_updated: sql`now()`,
      status,
    })
    .returningAll()
    .execute();
  return result;
}

export async function updateCoupon(
  id: int,
  title: string,
  expiration_date: string | null | undefined,
  status: string,
) {
  const [result] = await SQL.DB.updateTable("coupons")
    .set({
      title,
      expiration_date,
      date_updated: sql`now()`,
      status,
    })
    .where("id", "=",id)
    .returningAll()
    .execute();
  return result;
}

export async function deleteCoupon(id: int) {
  await SQL.DB.deleteFrom("office")
    .where('coupon_id', '=', id)
    .returningAll()
    .executeTakeFirst();
  return await SQL.DB.deleteFrom("coupons")
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

export function coupons() {
  return SQL.DB.selectFrom("coupons")
    .selectAll()
    .orderBy("date_created", "desc")
    .execute();
}

export async function getCoupon(id: int) {
  const [result] = await SQL.DB.selectFrom("coupons")
    .selectAll()
    .where("id", "=", id)
    .execute();
  return result
}
