import {int} from "aws-sdk/clients/datapipeline";
export * as Sauces from "./sauces";
import { SQL } from "./sql";
import {sql} from "kysely";

export async function addSauce(
  title: string,
  status: string,
) {
  const [result] = await SQL.DB.insertInto("sauces")
    .values({
      title,
      status,
      date_updated: sql`now()`,
    })
    .returningAll()
    .execute();
  return result;
}

export async function updateSauces(
  id: int,
  title: string,
  status: string,
) {
  const [result] = await SQL.DB.updateTable("sauces")
    .set({
      title,
      status,
      date_updated: sql`now()`,
    })
    .where("id", "=", id)
    .returningAll()
    .execute();
  return result;
}

export async function deleteSauces(id: int) {
  return await SQL.DB.deleteFrom("sauces")
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

export function sauces() {
  return SQL.DB.selectFrom("sauces")
    .selectAll()
    .orderBy("date_created", "desc")
    .execute();
}

export async function getSauces(id: int) {
  const [result] = await SQL.DB.selectFrom("sauces")
    .selectAll()
    .where("id", "=", id)
    .execute();
  return result
}
