export * as SideDish from "./side_dishes";
import {SQL} from "./sql";
import {sql} from "kysely";

export async function addSideDish(
  title: string,
  type: string,
  status: string,
  description: string | null | undefined,
) {
  const [result] = await SQL.DB.insertInto("side_dishes")
    .values({
      title,
      type,
      status,
      description,
      date_updated: sql`now()`,
    })
    .returningAll()
    .execute();
  return result;
}

export async function updateSideDish(
  id: number,
  title: string,
  type: string,
  status: string,
  description: string | null | undefined,
) {
  const [result] = await SQL.DB.updateTable("side_dishes")
    .set({
      title,
      type,
      status,
      description,
    })
    .where("id", "=", id)
    .returningAll()
    .execute();
  return result;
}

export async function deleteSideDish(id: number) {
  await SQL.DB.deleteFrom("side_dishes")
    .where('id', '=', id)
    .execute();
  return true;
}

export function sideDishes() {
  return SQL.DB.selectFrom("side_dishes")
    .selectAll()
    .orderBy("date_created", "desc")
    .execute();
}

export async function getSideDish(id: number) {
  const [result] = await SQL.DB.selectFrom("side_dishes")
    .selectAll()
    .where("id", "=", id)
    .execute();
  return result
}
