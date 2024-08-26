export * as Users from "./users";
import {SQL} from "./sql";
import {sql} from "kysely";
import {ROLE} from "web/src/utils/utils";

export async function addUser(
  first_name: string,
  last_name: string,
  email: string,
  address: string | null | undefined,
  phone: string,
  coupon_id: number,
) {
  const [result] = await SQL.DB.insertInto("users")
    .values({
      first_name,
      last_name,
      email,
      address,
      phone,
      coupon_id,
      role: ROLE.PUBLIC,
      // role: ROLE.ADMIN,
      date_updated: sql`now()`,
    })
    .returningAll()
    .execute();
  return result;
}

export async function updateUser(
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  address: string | null | undefined,
  image: string | null | undefined,
  phone: string,
  coupon_id: number,
  role: string,
) {
  const [result] = await SQL.DB.updateTable("users")
    .set({
      first_name,
      last_name,
      email,
      address,
      image,
      phone,
      coupon_id,
      role,
      date_updated: sql`now()`,
    })
    .where("id", "=", id)
    .returningAll()
    .execute();
  return result;
}

export async function updateUserImage(
  id: number,
  image: string | null | undefined,
) {
  const [result] = await SQL.DB.updateTable("users")
    .set({image, date_updated: sql`now()`})
    .where("id", "=", id)
    .returningAll()
    .execute();
  return result;
}

export function deleteUser(id: number) {
  SQL.DB.deleteFrom("users")
    .where('id', '=', id)
    .execute();
  return true;
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
