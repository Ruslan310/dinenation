import {Domain} from "@dinenation-postgresql/core/domain";
import {SQL} from "@dinenation-postgresql/core/sql";
import {builder} from "../builder";

export const DomainType = builder.objectRef<SQL.Row["domain"]>("Domain").implement({
  fields: (t) => ({
    id: t.exposeInt("id"),
    title: t.exposeString("title"),
    discount: t.exposeFloat("discount"),
    expired_date: t.exposeString("expired_date", {nullable: true}),
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
      discount: t.arg.float({required: true}),
      expired_date: t.arg.string({required: true}),
    },
  }),
  updateDomain: t.field({
    type: DomainType,
    args: {
      id: t.arg.int({required: true}),
      title: t.arg.string({required: true}),
      discount: t.arg.float({required: true}),
      expired_date: t.arg.string({required: true}),
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
}));
