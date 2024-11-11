export * as Domain from "./domain";
import {SQL} from "./sql";
import {sql} from "kysely";

export async function addDomain(
  title: string,
  discount: number | null | undefined,
  expired_date: string | null | undefined,
) {
  const [result] = await SQL.DB.insertInto("domain")
    .values({
      title,
      discount,
      expired_date,
      date_updated: sql`now()`,
    })
    .returningAll()
    .execute();
  return result;
}

export async function addDomainCombo(
  domain_id: number,
  combo_id: number,
) {
  const [result] = await SQL.DB.insertInto("domain_combo")
    .values({
      domain_id,
      combo_id,
      date_updated: sql`now()`,
    })
    .returningAll()
    .execute();
  return result;
}

export async function updateDomain(
  id: number,
  title: string,
  discount: number | null | undefined,
  expired_date: string | null | undefined,
) {
  const [result] = await SQL.DB.updateTable("domain")
    .set({
      title,
      discount,
      expired_date,
      date_updated: sql`now()`,
    })
    .where("id", "=",id)
    .returningAll()
    .execute();
  return result;
}

export async function deleteDomain(id: number) {
  await SQL.DB.deleteFrom("domain_combo")
    .where('domain_id', '=', id)
    .execute();

  await SQL.DB.deleteFrom("domain")
    .where('id', '=', id)
    .execute();
  return true;
}

export async function deleteDomainCombo(id: number) {
  await SQL.DB.deleteFrom("domain_combo")
    .where('domain_id', '=', id)
    .execute();
  return true;
}

export function domains() {
  return SQL.DB.selectFrom("domain")
    .selectAll()
    .orderBy("date_created", "desc")
    .execute();
}

export async function getDomain(id: number) {
  const [result] = await SQL.DB.selectFrom("domain")
    .selectAll()
    .where("id", "=", id)
    .execute();
  return result
}

export async function domainsCombos(id: number) {
  return await SQL.DB.selectFrom('combo')
    .innerJoin("domain_combo", "combo.id", "domain_combo.combo_id")
    .innerJoin("domain", "domain.id", "domain_combo.domain_id")
    .selectAll("combo")
    .where("domain.id", "=", id)
    .orderBy("combo.date_created", "desc")
    .execute();
}
