import {Users} from "@dinenation-postgresql/core/users";
import {SQL} from "@dinenation-postgresql/core/sql";
import {builder} from "../builder";

const UsersType = builder.objectRef<SQL.Row["users"]>("Users").implement({
  fields: (t) => ({
    id: t.exposeInt("id"),
    full_name: t.exposeString("full_name"),
    email: t.exposeString("email"),
    address: t.exposeString("address", {nullable: true}),
    phone: t.exposeString("phone"),
    coupon: t.exposeString("coupon"),
    domain_id: t.exposeInt("domain_id"),
  }),
});

builder.queryFields((t)=> ({
  user: t.field({
    type: UsersType,
    args: {
      email: t.arg.string({required: true}),
    },
    resolve: async (_, args)=> {
      const result = await Users.getUser(args.email);

      if (!result) {
        throw new Error("User not found");
      }

      return result;
    },
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
      full_name: t.arg.string({required: true}),
      email: t.arg.string({required: true}),
      address: t.arg.string({required: false}),
      phone: t.arg.string({required: true}),
      coupon: t.arg.string({required: true}),
      domain_id: t.arg.int({required: true}),
    },
    resolve: (_, args) => Users.addUser(
      args.full_name,
      args.email,
      args.address,
      args.phone,
      args.coupon,
      args.domain_id,
    ),
  }),
  updateUser: t.field({
    type: UsersType,
    args: {
      id: t.arg.int({required: true}),
      full_name: t.arg.string({required: true}),
      email: t.arg.string({required: true}),
      address: t.arg.string({required: false}),
      phone: t.arg.string({required: true}),
      coupon: t.arg.string({required: true}),
      domain_id: t.arg.int({required: true}),
    },
    resolve: (_, args)=> Users.updateUser(
      args.id,
      args.full_name,
      args.email,
      args.address,
      args.phone,
      args.coupon,
      args.domain_id,
    ),
  }),
  deleteUser: t.field({
    type: UsersType,
    nullable: true,
    args: {
      id: t.arg.int({required: true}),
    },
    resolve: (_, args) => Users.deleteUser(args.id),
  }),
}));
