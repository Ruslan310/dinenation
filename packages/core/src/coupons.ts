export * as Coupons from "./coupons";
import {SQL} from "./sql";
import {sql} from "kysely";

export async function addCoupon(
  title: string,
  has_domain: boolean,
  domain_id: number,
  address: string,
  expiration_date: string | null | undefined,
  status: string,
) {
  const [result] = await SQL.DB.insertInto("coupons")
    .values({
      title,
      has_domain,
      domain_id,
      address,
      expiration_date,
      date_updated: sql`now()`,
      status,
    })
    .returningAll()
    .execute();
  return result;
}

export async function updateCoupon(
  id: number,
  title: string,
  has_domain: boolean,
  domain_id: number,
  address: string,
  expiration_date: string | null | undefined,
  status: string,
) {
  const [result] = await SQL.DB.updateTable("coupons")
    .set({
      title,
      has_domain,
      domain_id,
      address,
      expiration_date,
      date_updated: sql`now()`,
      status,
    })
    .where("id", "=",id)
    .returningAll()
    .execute();
  return result;
}

export async function deleteCoupon(id: number) {
  await SQL.DB.deleteFrom("office")
    .where('coupon_id', '=', id)
    .execute();
  await SQL.DB.deleteFrom("coupons")
    .where('id', '=', id)
    .execute();
  return true;
}

export function coupons() {
  return SQL.DB.selectFrom("coupons")
    .selectAll()
    .orderBy("date_created", "desc")
    .execute();
}

export async function getCoupon(id: number) {
  const [result] = await SQL.DB.selectFrom("coupons")
    .selectAll()
    .where("id", "=", id)
    .execute();
  return result
}
