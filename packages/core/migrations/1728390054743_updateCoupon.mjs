import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .alterTable("coupons")
    .addColumn("check_order", "boolean", (col) => col.notNull().defaultTo(false))
    .addColumn("hide_price", "boolean", (col) => col.notNull().defaultTo(false))
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema
    .alterTable("coupons")
    .dropColumn("check_order")
    .dropColumn("hide_price")
    .execute();
}
