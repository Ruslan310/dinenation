import {Kysely, sql} from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("office")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("coupon_id", "integer", (col) => col.notNull().references("coupons.id"))
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("date_created", "timestamp", (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn("date_updated", "timestamp", (col) => col.notNull())
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable("office").execute();
}
