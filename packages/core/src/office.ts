export * as Office from "./office";
import {SQL} from "./sql";
import {sql} from "kysely";
import {int} from "aws-sdk/clients/datapipeline";


export async function addOffice(
  coupon_id: int,
  title: string,
) {
  const [result] = await SQL.DB.insertInto("office")
    .values({
      title,
      coupon_id,
      date_updated: sql`now()`,
    })
    .returningAll()
    .execute();
  return result;
}

export async function updateOffice(
  id: int,
  coupon_id: int,
  title: string,
) {
  const [result] = await SQL.DB.updateTable("office")
    .set({
      title,
      coupon_id,
      date_updated: sql`now()`,
    })
    .where("id", "=",id)
    .returningAll()
    .execute();
  return result;
}

export async function deleteOffice(id: int) {
  return await SQL.DB.deleteFrom("office")
    .where('coupon_id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

export function offices() {
  return SQL.DB.selectFrom("office")
    .selectAll()
    .orderBy("date_created", "desc")
    .execute();
}

export async function getOffice(id: int) {
  const [result] = await SQL.DB.selectFrom("office")
    .selectAll()
    .where("id", "=", id)
    .execute();
  return result
}

export async function getOfficesByCoupon(coupon_id: int) {
  return await SQL.DB.selectFrom("office")
    .selectAll()
    .where("coupon_id", "=", coupon_id)
    .execute();
}
