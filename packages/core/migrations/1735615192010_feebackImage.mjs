import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .alterTable("review")
    .addColumn("img", "varchar(255)", (col) => col.notNull().defaultTo(''))
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema
    .alterTable("review")
    .dropColumn("img")
    .execute();

}
