import {int} from "aws-sdk/clients/datapipeline";
export * as SideDish from "./sideDishes";
import { SQL } from "./sql";
import {sql} from "kysely";

export async function addSideDish(
  title: string,
  type: string,
  status: string,
) {
  const [result] = await SQL.DB.insertInto("side_dishes")
    .values({
      title,
      type,
      status,
      date_updated: sql`now()`,
    })
    .returningAll()
    .execute();
  return result;
}

export async function updateSideDish(
  id: int,
  title: string,
  type: string,
  status: string,
) {
  const [result] = await SQL.DB.updateTable("side_dishes")
    .set({
      title,
      type,
      status,
    })
    .where("id", "=", id)
    .returningAll()
    .execute();
  return result;
}

export async function deleteSideDish(id: int) {
  return await SQL.DB.deleteFrom("side_dishes")
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

export function sideDishes() {
  return SQL.DB.selectFrom("side_dishes")
    .selectAll()
    .orderBy("date_created", "desc")
    .execute();
}

export async function getSideDish(id: int) {
  const [result] = await SQL.DB.selectFrom("side_dishes")
    .selectAll()
    .where("id", "=", id)
    .execute();
  return result
}
