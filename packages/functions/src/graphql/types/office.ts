import {getOfficesByCoupon, Office} from "@dinenation-postgresql/core/office";
import {SQL} from "@dinenation-postgresql/core/sql";
import {builder} from "../builder";

const OfficeType = builder.objectRef<SQL.Row["office"]>("Office").implement({
  fields: (t) => ({
    id: t.exposeInt("id"),
    coupon_id: t.exposeInt("coupon_id"),
    title: t.exposeString("title"),
  }),
});

builder.queryFields((t)=> ({
  office: t.field({
    type: OfficeType,
    args: {
      id: t.arg.int({required: true}),
    },
    resolve: async (_, args)=> {
      const result = await Office.getOffice(args.id);

      if (!result) {
        throw new Error("Sauces not found");
      }

      return result;
    },
  }),
  officesByCoupon: t.field({
    type: [OfficeType],
    args: {
      coupon_id: t.arg.int({required: true}),
    },
    resolve: (_, args) => Office.getOfficesByCoupon(args.coupon_id),
  }),
  offices: t.field({
    type: [OfficeType],
    resolve: () => Office.offices(),
  }),
}));

builder.mutationFields((t) => ({
  addOffice: t.field({
    type: OfficeType,
    args: {
      coupon_id: t.arg.int({required: true}),
      title: t.arg.string({required: true}),
    },
    resolve: (_, args) => Office.addOffice(
      args.coupon_id,
      args.title,
    ),
  }),
  updateOffice: t.field({
    type: OfficeType,
    args: {
      id: t.arg.int({required: true}),
      coupon_id: t.arg.int({required: true}),
      title: t.arg.string({required: true}),
    },
    resolve: (_, args)=> Office.updateOffice(
      args.id,
      args.coupon_id,
      args.title,
    ),
  }),
  deleteOffice: t.field({
    type: OfficeType,
    nullable: true,
    args: {
      coupon_id: t.arg.int({required: true}),
    },
    resolve: (_, args) => Office.deleteOffice(args.coupon_id),
  }),
}));
