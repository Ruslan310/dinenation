import {int} from "aws-sdk/clients/datapipeline";
export * as Boxes from "./boxes";
import {SQL} from "./sql";
import {sql} from "kysely";

export async function addBox(
  sticker: string,
  type: string,
  week_day: string,
  image: string,
  office: string | null | undefined,
  side_dish: string | null | undefined,
  side_dish_type: string | null | undefined,
  sauce: string | null | undefined,
  order_id: int,
  combo_id: int,
) {
  const [result] = await SQL.DB.insertInto("boxes")
    .values({
      sticker,
      type,
      week_day,
      image,
      office,
      side_dish,
      side_dish_type,
      sauce,
      order_id,
      combo_id,
      status: 'NEW',
      date_updated: sql`now()`,
    })
    .returningAll()
    .execute();
  return result;
}

export async function updateBox(
  id: int,
  sticker: string,
  type: string,
  week_day: string,
  image: string,
  office: string | null | undefined,
  side_dish: string | null | undefined,
  side_dish_type: string | null | undefined,
  sauce: string | null | undefined,
  order_id: int,
  combo_id: int,
  status: string,
) {
  const [result] = await SQL.DB.updateTable("boxes")
    .set({
      id,
      sticker,
      type,
      week_day,
      image,
      office,
      side_dish,
      side_dish_type,
      sauce,
      order_id,
      combo_id,
      status,
      date_updated: sql`now()`,
    })
    .where("id", "=", id)
    .returningAll()
    .execute();
  return result;
}

export async function deleteBox(id: int) {
  return await SQL.DB.deleteFrom("boxes")
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

export async function deleteBoxCombo(id: int) {
  return await SQL.DB.deleteFrom("boxes")
    .where('combo_id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

export function boxes() {
  return SQL.DB.selectFrom("boxes")
    .selectAll()
    .orderBy("date_created", "desc")
    .execute();
}

export async function getBox(id: int) {
  const [result] = await SQL.DB.selectFrom("boxes")
    .selectAll()
    .where("id", "=", id)
    .execute();
  return result
}
