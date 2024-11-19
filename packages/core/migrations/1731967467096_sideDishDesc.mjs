import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .alterTable("side_dishes")
    .addColumn("description", "text")
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema
    .alterTable("side_dishes")
    .dropColumn("description")
    .execute();
}
