import {CheckUser} from "@dinenation-postgresql/core/check_user";
import {Coupons} from "@dinenation-postgresql/core/coupons";
import {SQL} from "@dinenation-postgresql/core/sql";
import {builder} from "../builder";
import {CouponsType} from "./coupons";

export const CheckUserEmailType = builder.objectRef<SQL.Row["check_email"]>("CheckUserEmail").implement({
  fields: (t) => ({
    id: t.exposeInt("id"),
    coupon_id: t.exposeInt("coupon_id"),
    email: t.exposeString("email"),
  }),
});

export const CheckUserDomainType = builder.objectRef<SQL.Row["check_domain"]>("CheckUserDomain").implement({
  fields: (t) => ({
    id: t.exposeInt("id"),
    coupon_id: t.exposeInt("coupon_id"),
    domain: t.exposeString("domain"),
  }),
});

builder.queryFields((t)=> ({
  checkUser: t.field({
    type: builder.objectRef("CheckUser").implement({
      fields: (t) => ({
        checkEmail: t.field({
          type: [CheckUserEmailType],
          resolve: () => CheckUser.checkEmails(),
        }),
        checkDomain: t.field({
          type: [CheckUserDomainType],
          resolve: () => CheckUser.checkDomains(),
        }),
        coupons: t.field({
          type: [CouponsType],
          resolve: () => Coupons.coupons(),
        }),
      }),
    }),
    resolve: async (_, args) => {
      const email = await CheckUser.checkEmails();
      const domain = await CheckUser.checkDomains();
      const coupons = await Coupons.coupons();
      return {checkEmail: email, checkDomain: domain, coupons: coupons};
    },
  }),
  checkEmail: t.field({
    type: CheckUserEmailType,
    args: {
      id: t.arg.int({required: true}),
    },
    resolve: (_, args) => CheckUser.getCheckEmail(args.id),
  }),
  checkDomain: t.field({
    type: CheckUserDomainType,
    args: {
      id: t.arg.int({required: true}),
    },
    resolve: (_, args) => CheckUser.getCheckDomain(args.id),
  }),
  checkEmails: t.field({
    type: [CheckUserEmailType],
    resolve: () => CheckUser.checkEmails(),
  }),
  checkDomains: t.field({
    type: [CheckUserDomainType],
    resolve: () => CheckUser.checkDomains(),
  }),
}));

builder.mutationFields((t) => ({
  createCheckEmail: t.field({
    type: CheckUserEmailType,
    args: {
      coupon_id: t.arg.int({required: true}),
      email: t.arg.string({required: true}),
    },
    resolve: (_, args) => CheckUser.addCheckEmail(
      args.coupon_id,
      args.email,
    ),
  }),
  createCheckDomain: t.field({
    type: CheckUserDomainType,
    args: {
      coupon_id: t.arg.int({required: true}),
      domain: t.arg.string({required: true}),
    },
    resolve: (_, args) => CheckUser.addCheckDomain(
      args.coupon_id,
      args.domain,
    ),
  }),
  updateCheckEmail: t.field({
    type: CheckUserEmailType,
    args: {
      id: t.arg.int({required: true}),
      coupon_id: t.arg.int({required: true}),
      email: t.arg.string({required: true}),
    },
    resolve: (_, args) => CheckUser.updateCheckEmail(
      args.id,
      args.coupon_id,
      args.email,
    ),
  }),
  updateCheckDomain: t.field({
    type: CheckUserDomainType,
    args: {
      id: t.arg.int({required: true}),
      coupon_id: t.arg.int({required: true}),
      domain: t.arg.string({required: true}),
    },
    resolve: (_, args) => CheckUser.updateCheckDomain(
      args.id,
      args.coupon_id,
      args.domain,
    ),
  }),
  deleteCheckEmail: t.field({
    type: 'Boolean',
    args: {
      id: t.arg.int({required: true}),
    },
    resolve: (_, args) => CheckUser.deleteCheckEmail(args.id),
  }),
  deleteCheckDomain: t.field({
    type: 'Boolean',
    args: {
      id: t.arg.int({required: true}),
    },
    resolve: (_, args) => CheckUser.deleteCheckDomain(args.id),
  }),
}));
