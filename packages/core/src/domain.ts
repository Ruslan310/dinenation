export * as Domain from "./domain";
import {SQL} from "./sql";
import {sql} from "kysely";

export async function addDomain(
  title: string,
  discount: number,
  expired_date: string,
) {
  const [result] = await SQL.DB.insertInto("domain")
    .values({
      title,
      discount,
      expired_date,
      date_updated: sql`now()`,
    })
    .returningAll()
    .execute();
  return result;
}

export async function updateDomain(
  id: number,
  title: string,
  discount: number,
  expired_date: string,
) {
  const [result] = await SQL.DB.updateTable("domain")
    .set({
      title,
      discount,
      expired_date,
      date_updated: sql`now()`,
    })
    .where("id", "=",id)
    .returningAll()
    .execute();
  return result;
}

export async function deleteDomain(id: number) {
  // await SQL.DB.deleteFrom("office")
  //   .where('coupon_id', '=', id)
  //   .execute();
  await SQL.DB.deleteFrom("domain")
    .where('id', '=', id)
    .execute();
  return true;
}

export function domains() {
  return SQL.DB.selectFrom("domain")
    .selectAll()
    .orderBy("date_created", "desc")
    .execute();
}

export async function getDomain(id: number) {
  const [result] = await SQL.DB.selectFrom("domain")
    .selectAll()
    .where("id", "=", id)
    .execute();
  return result
}
