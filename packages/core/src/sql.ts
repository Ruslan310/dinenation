import { RDSData } from "@aws-sdk/client-rds-data";
import { RDS } from "sst/node/rds";
import { Kysely, Selectable } from "kysely";
import { DataApiDialect } from "kysely-data-api";
import type { Database } from "./sql.generated";

export const DB = new Kysely<Database>({
  dialect: new DataApiDialect({
    mode: "postgres",
    driver: {
      // secretArn: 'arn:aws:secretsmanager:us-east-1:533267358810:secret:dbClusterSecret229E8577-tQHwCpEBMrEt-478Dll',
      // resourceArn: 'arn:aws:rds:us-east-1:533267358810:cluster:prod-dinenation-postgresql-db',
      secretArn: RDS.db.secretArn,
      resourceArn: RDS.db.clusterArn,
      database: RDS.db.defaultDatabaseName,
      client: new RDSData({}),
    },
  }),
});

export type Row = {
  [Key in keyof Database]: Selectable<Database[Key]>;
};

export * as SQL from "./sql";
