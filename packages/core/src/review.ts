export * as Review from "./review";
import {SQL} from "./sql";
import {sql} from "kysely";

export async function addReview(
  user_id: number,
  review: string,
  rate: number,
  img: string,
  dish_name: string,
) {
  const [result] = await SQL.DB.insertInto("review")
    .values({
      user_id,
      review,
      rate,
      img,
      dish_name,
      date_updated: sql`now()`,
    })
    .returningAll()
    .execute();
  return result;
}

export async function updateReview(
  id: number,
  user_id: number,
  review: string,
  rate: number,
  img: string,
  dish_name: string,
) {
  const [result] = await SQL.DB.updateTable("review")
    .set({
      id,
      user_id,
      review,
      rate,
      img,
      dish_name,
      date_updated: sql`now()`,
    })
    .where("id", "=", id)
    .returningAll()
    .execute();
  return result;
}

export async function deleteReview(id: number) {
  await SQL.DB.deleteFrom("review")
    .where('id', '=', id)
    .execute();
  return true
}

export async function deleteUserReview(user_id: number) {
  await SQL.DB.deleteFrom("review")
    .where('user_id', '=', user_id)
    .execute();
  return true
}

export function userReviews(user_id: number) {
  return SQL.DB.selectFrom("review")
    .selectAll()
    .where("user_id", "=", user_id)
    .execute();
}

export function reviews() {
  return SQL.DB.selectFrom("review")
    .selectAll()
    .orderBy("date_created", "desc")
    .execute();
}

export async function getReview(id: number) {
  const [result] = await SQL.DB.selectFrom("review")
    .selectAll()
    .where("id", "=", id)
    .execute();
  return result
}
