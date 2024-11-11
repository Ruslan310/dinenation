import {Domain} from "@dinenation-postgresql/core/domain";
import {SQL} from "@dinenation-postgresql/core/sql";
import {builder} from "../builder";
import {ComboType} from "./combo";

export const DomainType = builder.objectRef<SQL.Row["domain"]>("Domain").implement({
  fields: (t) => ({
    id: t.exposeInt("id"),
    title: t.exposeString("title"),
    discount: t.exposeFloat("discount", {nullable: true}),
    combos: t.field({
      type: [ComboType],
      resolve: (args) => Domain.domainsCombos(args.id),
    }),
    expired_date: t.exposeString("expired_date", {nullable: true}),
  }),
});

const DomainComboType = builder.objectRef<SQL.Row["domain_combo"]>("DomainCombo").implement({
  fields: (t) => ({
    id: t.exposeInt("id"),
    domain_id: t.exposeInt("domain_id"),
    combo_id: t.exposeInt("combo_id"),
  }),
});

builder.queryFields((t)=> ({
  domain: t.field({
    type: DomainType,
    args: {
      id: t.arg.int({required: true}),
    },
    resolve: (_, args) => Domain.getDomain(args.id),
  }),
  domains: t.field({
    type: [DomainType],
    resolve: () => Domain.domains(),
  }),
}));

builder.mutationFields((t) => ({
  addDomain: t.field({
    type: DomainType,
    resolve: (_, args) => Domain.addDomain(
      args.title,
      args.discount,
      args.expired_date,
    ),
    args: {
      title: t.arg.string({required: true}),
      discount: t.arg.float({required: false}),
      expired_date: t.arg.string({required: false}),
    },
  }),
  addDomainCombo: t.field({
    type: DomainComboType,
    args: {
      domain_id: t.arg.int({required: true}),
      combo_id: t.arg.int({required: true}),
    },
    resolve: (_, args) => Domain.addDomainCombo(
      args.domain_id,
      args.combo_id,
    ),
  }),
  updateDomain: t.field({
    type: DomainType,
    args: {
      id: t.arg.int({required: true}),
      title: t.arg.string({required: true}),
      discount: t.arg.float({required: false}),
      expired_date: t.arg.string({required: false}),
    },
    resolve: (_, args)=> Domain.updateDomain(
      args.id,
      args.title,
      args.discount,
      args.expired_date,
    ),
  }),
  deleteDomain: t.field({
    type: 'Boolean',
    args: {
      id: t.arg.int({required: true}),
    },
    resolve: (_, args) => Domain.deleteDomain(args.id),
  }),
  deleteDomainCombo: t.field({
    type: 'Boolean',
    args: {
      domain_id: t.arg.int({required: true}),
    },
    resolve: (_, args) => Domain.deleteDomainCombo(args.domain_id),
  }),
}));
