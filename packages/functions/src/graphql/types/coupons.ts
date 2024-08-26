import {Coupons} from "@dinenation-postgresql/core/coupons";
import {Domain} from "@dinenation-postgresql/core/domain";
import {Office} from "@dinenation-postgresql/core/office";
import {SQL} from "@dinenation-postgresql/core/sql";
import {builder} from "../builder";
import {DomainType} from "./domain";
import {OfficeType} from "./office";

export const CouponsType = builder.objectRef<SQL.Row["coupons"]>("Coupons").implement({
  fields: (t) => ({
    id: t.exposeInt("id"),
    title: t.exposeString("title"),
    has_domain: t.exposeBoolean("has_domain"),
    domain: t.field({
      type: DomainType,
      resolve: (coupon) => Domain.getDomain(coupon.domain_id),
    }),
    office: t.field({
      type: [OfficeType],
      resolve: (coupon) => Office.getOfficesByCoupon(coupon.id),
    }),
    address: t.exposeString("address"),
    expiration_date: t.exposeString("expiration_date", {nullable: true}),
    status: t.exposeString("status"),
  }),
});

builder.queryFields((t)=> ({
  coupon: t.field({
    type: CouponsType,
    args: {
      id: t.arg.int({required: true}),
    },
    resolve: (_, args) => Coupons.getCoupon(args.id),
  }),
  coupons: t.field({
    type: [CouponsType],
    resolve: () => Coupons.coupons(),
  }),
}));

builder.mutationFields((t) => ({
  addCoupon: t.field({
    type: CouponsType,
    resolve: (_, args) => Coupons.addCoupon(
      args.title,
      args.has_domain,
      args.domain_id,
      args.address,
      args.expiration_date,
      args.status,
    ),
    args: {
      title: t.arg.string({required: true}),
      has_domain: t.arg.boolean({required: true}),
      domain_id: t.arg.int({required: true}),
      address: t.arg.string({required: true}),
      expiration_date: t.arg.string({required: false}),
      status: t.arg.string({required: true}),
    },
  }),
  updateCoupon: t.field({
    type: CouponsType,
    args: {
      id: t.arg.int({required: true}),
      title: t.arg.string({required: true}),
      has_domain: t.arg.boolean({required: true}),
      domain_id: t.arg.int({required: true}),
      address: t.arg.string({required: true}),
      expiration_date: t.arg.string({required: false}),
      status: t.arg.string({required: true}),
    },
    resolve: (_, args)=> Coupons.updateCoupon(
      args.id,
      args.title,
      args.has_domain,
      args.domain_id,
      args.address,
      args.expiration_date,
      args.status,
    ),
  }),
  deleteCoupon: t.field({
    type: 'Boolean',
    args: {
      id: t.arg.int({required: true}),
    },
    resolve: (_, args) => Coupons.deleteCoupon(args.id),
  }),
}));
