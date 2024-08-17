import {int} from "aws-sdk/clients/datapipeline";
export * as Users from "./users";
import {SQL} from "./sql";
import {sql} from "kysely";

export async function addUser(
  full_name: string,
  email: string,
  address: string | null | undefined,
  phone: string,
  coupon: string,
  domain_id: int,
) {
  const [result] = await SQL.DB.insertInto("users")
    .values({
      full_name,
      email,
      address,
      phone,
      coupon,
      domain_id,
      date_updated: sql`now()`,
    })
    .returningAll()
    .execute();
  return result;
}

export async function updateUser(
  id: int,
  full_name: string,
  email: string,
  address: string | null | undefined,
  phone: string,
  coupon: string,
  domain_id: int,
) {
  const [result] = await SQL.DB.updateTable("users")
    .set({
      full_name,
      email,
      address,
      phone,
      coupon,
      domain_id,
      date_updated: sql`now()`,
    })
    .where("id", "=", id)
    .returningAll()
    .execute();
  return result;
}

export async function deleteUser(id: int) {
  return await SQL.DB.deleteFrom("users")
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

export function users() {
  return SQL.DB.selectFrom("users")
    .selectAll()
    .orderBy("date_created", "desc")
    .execute();
}

export async function getUser(email: string) {
  const [result] = await SQL.DB.selectFrom("users")
    .selectAll()
    .where("email", "=", email)
    .execute();
  return result
}
