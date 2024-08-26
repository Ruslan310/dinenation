import {Users} from "@dinenation-postgresql/core/users";
import {SQL} from "@dinenation-postgresql/core/sql";
import {builder} from "../builder";
import {CouponsType} from "./coupons";
import {Coupons} from "@dinenation-postgresql/core/coupons";

const UsersType = builder.objectRef<SQL.Row["users"]>("Users").implement({
  fields: (t) => ({
    id: t.exposeInt("id"),
    first_name: t.exposeString("first_name"),
    last_name: t.exposeString("last_name"),
    email: t.exposeString("email"),
    address: t.exposeString("address", { nullable: true }),
    image: t.exposeString("image", { nullable: true }),
    phone: t.exposeString("phone"),
    role: t.exposeString("role"),
    coupon: t.field({
      type: CouponsType,
      resolve: (user) => Coupons.getCoupon(user.coupon_id),
    }),
  }),
});

builder.queryFields((t)=> ({
  user: t.field({
    type: UsersType,
    nullable: true,
    args: {
      email: t.arg.string({required: true}),
    },
    resolve: (_, args) => Users.getUser(args.email)
  }),
  users: t.field({
    type: [UsersType],
    resolve: () => Users.users(),
  }),
}));

builder.mutationFields((t) => ({
  addUser: t.field({
    type: UsersType,
    args: {
      first_name: t.arg.string({required: true}),
      last_name: t.arg.string({required: true}),
      email: t.arg.string({required: true}),
      address: t.arg.string({required: false}),
      phone: t.arg.string({required: true}),
      coupon_id: t.arg.int({required: true}),
    },
    resolve: (_, args) => Users.addUser(
      args.first_name,
      args.last_name,
      args.email,
      args.address,
      args.phone,
      args.coupon_id,
    ),
  }),
  updateUser: t.field({
    type: UsersType,
    args: {
      id: t.arg.int({required: true}),
      first_name: t.arg.string({required: true}),
      last_name: t.arg.string({required: true}),
      email: t.arg.string({required: true}),
      address: t.arg.string({required: false}),
      image: t.arg.string({required: false}),
      phone: t.arg.string({required: true}),
      coupon_id: t.arg.int({required: true}),
      role: t.arg.string({required: true}),
    },
    resolve: (_, args) => Users.updateUser(
      args.id,
      args.first_name,
      args.last_name,
      args.email,
      args.address,
      args.image,
      args.phone,
      args.coupon_id,
      args.role,
    ),
  }),
  updateUserImage: t.field({
    type: UsersType,
    args: {
      id: t.arg.int({required: true}),
      image: t.arg.string({required: false}),
    },
    resolve: (_, args) => Users.updateUserImage(args.id, args.image),
  }),
  deleteUser: t.field({
    type: 'Boolean',
    args: {
      id: t.arg.int({required: true}),
    },
    resolve: (_, args) => Users.deleteUser(args.id),
  }),
}));
