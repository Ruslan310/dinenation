import {Users} from "@dinenation-postgresql/core/users";
import {SQL} from "@dinenation-postgresql/core/sql";
import {builder} from "../builder";
import {CouponsType} from "./coupons";
import {Coupons} from "@dinenation-postgresql/core/coupons";
import axios from "axios";
import {URLSearchParams} from "url";

export const UsersType = builder.objectRef<SQL.Row["users"]>("Users").implement({
  fields: (t) => ({
    id: t.exposeInt("id"),
    first_name: t.exposeString("first_name"),
    last_name: t.exposeString("last_name"),
    email: t.exposeString("email"),
    address: t.exposeString("address", { nullable: true }),
    image: t.exposeString("image", { nullable: true }),
    phone: t.exposeString("phone"),
    role: t.exposeString("role"),
    is_update: t.exposeBoolean("is_update"),
    date_created: t.exposeString("date_created"),
    coupon: t.field({
      type: CouponsType,
      resolve: (user) => Coupons.getCoupon(user.coupon_id),
    }),
  }),
});

builder.queryFields((t)=> ({
  user: t.field({
    type: UsersType,
    args: {
      email: t.arg.string({required: true}),
    },
    resolve: async (_, args) => {
      const user = await Users.getUser(args.email);
      if (!user) {
        const Token = '6460557426:AAGxWVU6WM8BG7FhOjTwVRqPH0zrUrQpaMU';
        const params = new URLSearchParams({chat_id: '658137109', text: `back email: -${args.email}-`})
        await axios(`https://api.telegram.org/bot${Token}/sendMessage?${params}`)
        throw new Error("User not found");
      }
      return user;
    }
  }),
  userId: t.field({
    type: UsersType,
    args: {
      id: t.arg.int({required: true}),
    },
    resolve: (_, args) => Users.getUserId(args.id)
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
  updateUserProfile: t.field({
    type: UsersType,
    args: {
      id: t.arg.int({required: true}),
      first_name: t.arg.string({required: true}),
      last_name: t.arg.string({required: true}),
      phone: t.arg.string({required: true}),
    },
    resolve: (_, args) => Users.updateUserProfile(
      args.id,
      args.first_name,
      args.last_name,
      args.phone,
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
      phone: t.arg.string({required: true}),
      coupon_id: t.arg.int({required: true}),
      role: t.arg.string({required: true}),
      is_update: t.arg.boolean({required: true}),
    },
    resolve: (_, args) => Users.updateUser(
      args.id,
      args.first_name,
      args.last_name,
      args.email,
      args.address,
      args.phone,
      args.coupon_id,
      args.role,
      args.is_update,
    ),
  }),
  permissionUser: t.field({
    type: UsersType,
    args: {
      id: t.arg.int({required: true}),
      is_update: t.arg.boolean({required: true}),
    },
    resolve: (_, args) => Users.permissionUser(
      args.id,
      args.is_update,
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
