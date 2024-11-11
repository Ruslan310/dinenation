import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .alterTable("product")
    .addColumn("small_img", "varchar(255)", (col) => col.notNull().defaultTo(''))
    .execute();

  await db.schema
    .alterTable("boxes")
    .addColumn("small_img", "varchar(255)", (col) => col.notNull().defaultTo(''))
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema
    .alterTable("product")
    .dropColumn("small_img")
    .execute();

  await db.schema
    .alterTable("boxes")
    .dropColumn("small_img")
    .execute();
}
