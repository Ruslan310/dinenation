export * as CheckUser from "./check_user";
import {SQL} from "./sql";
import {sql} from "kysely";

export async function addCheckEmail(
  coupon_id: number,
  email: string,
) {
  const [result] = await SQL.DB.insertInto("check_email")
    .values({
      coupon_id,
      email,
      date_updated: sql`now()`,
    })
    .returningAll()
    .execute();
  return result;
}

export async function addCheckDomain(
  coupon_id: number,
  domain: string,
) {
  const [result] = await SQL.DB.insertInto("check_domain")
    .values({
      coupon_id,
      domain,
      date_updated: sql`now()`,
    })
    .returningAll()
    .execute();
  return result;
}

export async function updateCheckDomain(
  id: number,
  coupon_id: number,
  domain: string,
) {
  const [result] = await SQL.DB.updateTable("check_domain")
    .set({
      id,
      coupon_id,
      domain,
      date_updated: sql`now()`,
    })
    .where("id", "=", id)
    .returningAll()
    .execute();
  return result;
}

export async function updateCheckEmail(
  id: number,
  coupon_id: number,
  email: string,
) {
  const [result] = await SQL.DB.updateTable("check_email")
    .set({
      id,
      coupon_id,
      email,
      date_updated: sql`now()`,
    })
    .where("id", "=", id)
    .returningAll()
    .execute();
  return result;
}

export async function deleteCheckDomain(id: number) {
  await SQL.DB.deleteFrom("check_domain")
    .where('id', '=', id)
    .execute();
  return true;
}

export async function deleteCheckEmail(id: number) {
  await SQL.DB.deleteFrom("check_email")
    .where('id', '=', id)
    .execute();
  return true;
}

export function checkDomains() {
  return SQL.DB.selectFrom("check_domain")
    .selectAll()
    .execute();
}

export function checkEmails() {
  return SQL.DB.selectFrom("check_email")
    .selectAll()
    .execute();
}

export async function getCheckDomain(id: number) {
  const [result] = await SQL.DB.selectFrom("check_domain")
    .selectAll()
    .where("id", "=", id)
    .execute();
  return result
}

export async function getCheckEmail(id: number) {
  const [result] = await SQL.DB.selectFrom("check_email")
    .selectAll()
    .where("id", "=", id)
    .execute();
  return result
}
