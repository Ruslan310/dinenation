import {b} from "vitest/dist/reporters-P7C2ytIv";

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
  const admin = 'flash310xxx@gmail.com'
  const role = email === admin ? ROLE.ADMIN : ROLE.PUBLIC

  const [result] = await SQL.DB.insertInto("users")
    .values({
      first_name,
      last_name,
      email,
      address,
      phone,
      coupon_id,
      role,
      date_updated: sql`now()`,
    })
    .returningAll()
    .execute();
  return result;
}

export async function updateUserProfile(
  id: number,
  first_name: string,
  last_name: string,
  phone: string,
) {
  await SQL.DB.updateTable("users")
    .set({
      is_update: false,
      date_updated: sql`now()`
    })
    .where("id", "=", id)
    .returningAll()
    .execute();

  const [result] = await SQL.DB.updateTable("users")
    .set({
      first_name,
      last_name,
      phone,
      date_updated: sql`now()`,
    })
    .where("id", "=", id)
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
  phone: string,
  coupon_id: number,
  role: string,
  is_update: boolean,
) {
  const [result] = await SQL.DB.updateTable("users")
    .set({
      first_name,
      last_name,
      email,
      address,
      phone,
      coupon_id,
      role,
      is_update,
      date_updated: sql`now()`,
    })
    .where("id", "=", id)
    .returningAll()
    .execute();
  return result;
}

export async function permissionUser(
  id: number,
  is_update: boolean,
) {
  const [result] = await SQL.DB.updateTable("users")
    .set({
      is_update,
      date_updated: sql`now()`
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

export async function getUserId(id: number) {
  const [result] = await SQL.DB.selectFrom("users")
    .selectAll()
    .where("id", "=", id)
    .execute();
  return result
}

export async function getUser(email: string) {
  const [result] = await SQL.DB.selectFrom("users")
    .selectAll()
    // .where("email", "=", email)
    .where("email", "ilike", email)
    .execute();
  return result
}
