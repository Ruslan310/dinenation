import {Kysely, sql} from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("domain")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("discount", "integer", (col) => col.notNull())
    .addColumn("expired_date", "text", (col) => col.notNull())
    .addColumn("date_created", "text", (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn("date_updated", "text", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("users")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("full_name", "text", (col) => col.notNull())
    .addColumn("email", "text", (col) => col.notNull())
    .addColumn("address", "text")
    .addColumn("image", "varchar(255)")
    .addColumn("phone", "text", (col) => col.notNull())
    .addColumn("coupon", "text", (col) => col.notNull())
    .addColumn("domain_id", "integer", (col) => col.notNull().references("domain.id"))
    .addColumn("date_created", "text", (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn("date_updated", "text", (col) => col.notNull())
    .execute();

  const currentDate = new Date();

  // Инсерт данных в таблицу domain
  await db
    .insertInto("domain")
    .values([
      { title: "nexters", discount: 10, expired_date: "2025-12-31", date_created: currentDate, date_updated: currentDate },
      { title: "subsum", discount: 20, expired_date: "2025-12-31", date_created: currentDate, date_updated: currentDate },
      { title: "appari", discount: 30, expired_date: "2025-12-31", date_created: currentDate, date_updated: currentDate }
    ])
    .execute();

  // Инсерт данных в таблицу users
  // await db
  //   .insertInto("users")
  //   .values([
  //     { full_name: "John Doe", email: "john.doe@example.com", address: "123 Main St", phone: "123-456-7890", domain_id: 1, date_created: currentDate, date_updated: currentDate },
  //     { full_name: "Jane Smith", email: "jane.smith@example.com", address: "456 Oak Ave", phone: "987-654-3210", domain_id: 2, date_created: currentDate, date_updated: currentDate },
  //     { full_name: "Alice Johnson", email: "alice.johnson@example.com", address: "789 Pine Rd", phone: "555-123-4567", domain_id: 3, date_created: currentDate, date_updated: currentDate },
  //     { full_name: "Bob Brown", email: "bob.brown@example.com", address: "101 Maple St", phone: "123-123-1234", domain_id: 1, date_created: currentDate, date_updated: currentDate },
  //     { full_name: "Charlie Davis", email: "charlie.davis@example.com", address: "202 Elm St", phone: "234-234-2345", domain_id: 2, date_created: currentDate, date_updated: currentDate },
  //     { full_name: "Diana Evans", email: "diana.evans@example.com", address: "303 Cedar St", phone: "345-345-3456", domain_id: 3, date_created: currentDate, date_updated: currentDate },
  //     { full_name: "Evan Foster", email: "evan.foster@example.com", address: "404 Birch St", phone: "456-456-4567", domain_id: 1, date_created: currentDate, date_updated: currentDate },
  //     { full_name: "Fiona Green", email: "fiona.green@example.com", address: "505 Walnut St", phone: "567-567-5678", domain_id: 2, date_created: currentDate, date_updated: currentDate },
  //     { full_name: "George Harris", email: "george.harris@example.com", address: "606 Chestnut St", phone: "678-678-6789", domain_id: 3, date_created: currentDate, date_updated: currentDate },
  //     { full_name: "Hannah Irving", email: "hannah.irving@example.com", address: "707 Poplar St", phone: "789-789-7890", domain_id: 1, date_created: currentDate, date_updated: currentDate }
  //   ])
  //   .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable("users").execute();
  await db.schema.dropTable("domain").execute();
}
