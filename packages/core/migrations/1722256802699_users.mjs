import {Kysely, sql} from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {

  await db.schema
    .createTable("users")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("first_name", "text", (col) => col.notNull())
    .addColumn("last_name", "text", (col) => col.notNull())
    .addColumn("email", "text", (col) => col.notNull())
    .addColumn("address", "text")
    .addColumn("image", "varchar(255)")
    .addColumn("phone", "text", (col) => col.notNull())
    .addColumn("coupon_id", "integer", (col) => col.notNull().references("coupons.id"))
    .addColumn("is_update", "boolean", (col) => col.notNull().defaultTo(false))
    .addColumn("role", "text", (col) => col.notNull())
    .addColumn("date_created", "text", (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn("date_updated", "text", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("orders")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("number", "text", (col) => col.notNull())
    .addColumn("status", "text", (col) => col.notNull())
    .addColumn("price", "real", (col) => col.notNull())
    .addColumn("combo_price", "real", (col) => col.notNull())
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
    .addColumn("price", "real", (col) => col.notNull())
    .addColumn("side_dish", "text")
    .addColumn("side_dish_type", "text")
    .addColumn("sauce", "text")
    .addColumn("order_id", "integer", (col) => col.notNull().references("orders.id"))
    .addColumn("combo_id", "integer", (col) => col.notNull())
    .addColumn("status", "text", (col) => col.notNull())
    .addColumn("date_created", "text", (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn("date_updated", "text", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("review")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("user_id", "integer", (col) => col.notNull().references("users.id"))
    .addColumn("review", "text", (col) => col.notNull())
    .addColumn("rate", "integer", (col) => col.notNull())
    .addColumn("dish_name", "text", (col) => col.notNull())
    .addColumn("date_created", "text", (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn("date_updated", "text", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("check_domain")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("coupon_id", "integer", (col) => col.notNull().references("coupons.id"))
    .addColumn("domain", "varchar(100)", (col) => col.notNull())
    .addColumn("date_created", "text", (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn("date_updated", "text", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("check_email")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("coupon_id", "integer", (col) => col.notNull().references("coupons.id"))
    .addColumn("email", "varchar(110)", (col) => col.notNull())
    .addColumn("date_created", "text", (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn("date_updated", "text", (col) => col.notNull())
    .execute();

  const currentDate = new Date();

  await db.insertInto('check_domain').values([
    { coupon_id: 1, domain: 'promail366.com', date_updated: currentDate },
    { coupon_id: 1, domain: 'remonovo.com', date_updated: currentDate },
    { coupon_id: 1, domain: 'nexters.com', date_updated: currentDate },
    { coupon_id: 1, domain: 'gdev.inc', date_updated: currentDate },
  ]).execute();

  await db.insertInto('check_email').values([
    { coupon_id: 1, email: 'mak.ivanov11@gmail.com', date_updated: currentDate },
    { coupon_id: 1, email: 'aborisovafe11@gmail.com', date_updated: currentDate },
    { coupon_id: 1, email: 'kyntsevich11@mail.ru', date_updated: currentDate },
    { coupon_id: 3, email: 'bryansk.nicholas11@gmail.com', date_updated: currentDate },
    { coupon_id: 3, email: 'multnatalja11@gmail.com', date_updated: currentDate },
    { coupon_id: 3, email: 'vgaverichev11@gmail.com', date_updated: currentDate },
    { coupon_id: 3, email: 'epvolishevskaya11@gmail.com', date_updated: currentDate },
    { coupon_id: 3, email: 'flash210xxx@gmail.com', date_updated: currentDate },
  ]).execute();

}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable("check_domain").execute();
  await db.schema.dropTable("check_email").execute();
  await db.schema.dropTable("review").execute();
  await db.schema.dropTable("boxes").execute();
  await db.schema.dropTable("orders").execute();
  await db.schema.dropTable("users").execute();
}
