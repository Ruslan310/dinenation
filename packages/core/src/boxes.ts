export * as Boxes from "./boxes";
import {SQL} from "./sql";
import {sql} from "kysely";
import {BoxStatus, EStatusType} from "web/src/utils/utils";

export async function addBox(
  sticker: string,
  type: string,
  week_day: string,
  image: string,
  small_img: string,
  office: string | null | undefined,
  price: number,
  side_dish: string | null | undefined,
  side_dish_type: string | null | undefined,
  sauce: string | null | undefined,
  order_id: number,
  combo_id: number,
) {
  const [result] = await SQL.DB.insertInto("boxes")
    .values({
      sticker,
      type,
      week_day,
      image,
      small_img,
      office,
      price,
      side_dish,
      side_dish_type,
      sauce,
      order_id,
      combo_id,
      status: BoxStatus.NEW,
      date_updated: sql`now()`,
    })
    .returningAll()
    .execute();
  return result;
}

export async function updateBox(
  id: number,
  sticker: string,
  type: string,
  week_day: string,
  image: string,
  small_img: string,
  office: string | null | undefined,
  price: number,
  side_dish: string | null | undefined,
  side_dish_type: string | null | undefined,
  sauce: string | null | undefined,
  order_id: number,
  combo_id: number,
  status: string,
) {
  const [result] = await SQL.DB.updateTable("boxes")
    .set({
      id,
      sticker,
      type,
      week_day,
      image,
      small_img,
      office,
      price,
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

export async function updateBoxList(
  list: number[],
) {
  await Promise.all(
    list.map(async (id) => {
      const [result] = await SQL.DB.updateTable("boxes")
        .set({
          status: BoxStatus.PRINTED,
          date_updated: sql`now()`,
        })
        .where("id", "=", id)
        .returningAll()
        .execute();
      return result;
    })
  );
  return true
}

export async function deleteBox(id: number) {
  await SQL.DB.deleteFrom("boxes")
    .where('id', '=', id)
    .execute();
  return true;
}

export async function deleteBoxCombo(combo_id: number, order_id: number) {
  await SQL.DB.deleteFrom("boxes")
    .where('combo_id', '=', combo_id)
    .execute();
  const remainingBoxes = await SQL.DB.selectFrom("boxes")
    .selectAll()
    .where('order_id', '=', order_id)
    .execute();

  if (remainingBoxes.length === 0) {
    await SQL.DB.updateTable("orders")
      .set({status: EStatusType.CANCELLED})
      .where('id', '=', order_id)
      .execute();
  }
  return true
}

export function boxes() {
  return SQL.DB.selectFrom("boxes")
    .selectAll()
    .orderBy("date_created", "desc")
    .execute();
}

export function boxesDay(week_day: string) {
  return SQL.DB.selectFrom("boxes")
    .selectAll()
    .where("week_day", "=", week_day)
    .where("status", "=", week_day)
    .orderBy("date_created", "desc")
    .execute();
}

export async function getBox(id: number) {
  const [result] = await SQL.DB.selectFrom("boxes")
    .selectAll()
    .where("id", "=", id)
    .execute();
  return result
}
