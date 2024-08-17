import {Kysely, sql} from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("orders")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("number", "text", (col) => col.notNull())
    .addColumn("status", "text", (col) => col.notNull())
    .addColumn("price", "text", (col) => col.notNull())
    .addColumn("coupon_id", "integer", (col) => col.notNull().references("coupons.id"))
    .addColumn("customer_id", "integer", (col) => col.notNull().references("users.id"))
    .addColumn("comment", "text")
    .addColumn("address", "text")
    .addColumn("date_created", "text", (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn("date_updated", "text", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("boxes")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("sticker", "text", (col) => col.notNull())
    .addColumn("type", "text", (col) => col.notNull())
    .addColumn("week_day", "text", (col) => col.notNull())
    .addColumn("image", "text", (col) => col.notNull())
    .addColumn("office", "text")
    .addColumn("side_dish", "text")
    .addColumn("side_dish_type", "text")
    .addColumn("sauce", "text")
    .addColumn("order_id", "integer", (col) => col.notNull().references("orders.id"))
    .addColumn("combo_id", "integer", (col) => col.notNull())
    .addColumn("status", "text", (col) => col.notNull())
    .addColumn("date_created", "text", (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn("date_updated", "text", (col) => col.notNull())
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable("boxes").execute();
  await db.schema.dropTable("orders").execute();
}
