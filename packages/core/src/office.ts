export * as Office from "./office";
import {SQL} from "./sql";
import {sql} from "kysely";

export async function addOffice(
  coupon_id: number,
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
  id: number,
  coupon_id: number,
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

export async function deleteOffice(id: number) {
  await SQL.DB.deleteFrom("office")
    .where('coupon_id', '=', id)
    .execute();
  return true;
}

export function offices() {
  return SQL.DB.selectFrom("office")
    .selectAll()
    .orderBy("date_created", "desc")
    .execute();
}

export async function getOffice(id: number) {
  const [result] = await SQL.DB.selectFrom("office")
    .selectAll()
    .where("id", "=", id)
    .execute();
  return result
}

export async function getOfficesByCoupon(coupon_id: number) {
  return await SQL.DB.selectFrom("office")
    .selectAll()
    .where("coupon_id", "=", coupon_id)
    .execute();
}
