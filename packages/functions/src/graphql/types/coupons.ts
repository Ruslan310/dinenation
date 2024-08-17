import {Coupons} from "@dinenation-postgresql/core/coupons";
import {SQL} from "@dinenation-postgresql/core/sql";
import {builder} from "../builder";

const CouponsType = builder.objectRef<SQL.Row["coupons"]>("Coupons").implement({
  fields: (t) => ({
    id: t.exposeInt("id"),
    title: t.exposeString("title"),
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
      args.expiration_date,
      args.status,
    ),
    args: {
      title: t.arg.string({required: true}),
      expiration_date: t.arg.string({required: false}),
      status: t.arg.string({required: true}),
    },
  }),
  updateCoupon: t.field({
    type: CouponsType,
    args: {
      id: t.arg.int({required: true}),
      title: t.arg.string({required: true}),
      expiration_date: t.arg.string({required: false}),
      status: t.arg.string({required: true}),
    },
    resolve: (_, args)=> Coupons.updateCoupon(
      args.id,
      args.title,
      args.expiration_date,
      args.status,
    ),
  }),
  deleteCoupon: t.field({
    type: CouponsType,
    nullable: true,
    args: {
      id: t.arg.int({required: true}),
    },
    resolve: (_, args) => Coupons.deleteCoupon(args.id),
  }),
}));
