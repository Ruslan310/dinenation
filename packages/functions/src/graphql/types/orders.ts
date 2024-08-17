import {Orders} from "@dinenation-postgresql/core/orders";
import {SQL} from "@dinenation-postgresql/core/sql";
import {builder} from "../builder";
import {BoxType} from "./boxes";

export const OrderType = builder.objectRef<SQL.Row["orders"]>("Orders").implement({
  fields: (t) => ({
    id: t.exposeInt("id"),
    number: t.exposeString("number"),
    status: t.exposeString("status"),
    price: t.exposeString("price"),
    coupon_id: t.exposeInt("coupon_id"),
    customer_id: t.exposeInt("customer_id"),
    comment: t.exposeString("comment", {nullable: true}),
    address: t.exposeString("address", {nullable: true}),
    date_created: t.exposeString("date_created"),
    products: t.field({
      type: [BoxType],
      resolve: (args) => Orders.orderProducts(args.id),
    }),
  }),
});

builder.queryFields((t)=> ({
  order: t.field({
    type: OrderType,
    args: {
      id: t.arg.int({required: true}),
    },
    resolve: async (_, args)=> {
      const result = await Orders.getOrder(args.id);

      if (!result) {
        throw new Error("Orders not found");
      }

      return result;
    },
  }),
  orderCustomerId: t.field({
    type: OrderType,
    args: {
      id: t.arg.int({required: true}),
      customer_id: t.arg.int({required: true}),
    },
    resolve: (_, args) => Orders.getOrderCustomerId(args.id, args.customer_id),
  }),
  ordersByCustomerId: t.field({
    type: [OrderType],
    args: {
      customer_id: t.arg.int({required: true}),
    },
    resolve: (_, args) => Orders.ordersByCustomerId(args.customer_id),
  }),
  orders: t.field({
    type: [OrderType],
    resolve: () => Orders.orders(),
  }),
}));

builder.mutationFields((t) => ({
  createOrder: t.field({
    type: OrderType,
    args: {
      status: t.arg.string({required: true}),
      price: t.arg.string({required: true}),
      coupon_id: t.arg.int({required: true}),
      customer_id: t.arg.int({required: true}),
      comment: t.arg.string({required: false}),
      address: t.arg.string({required: false}),
    },
    resolve: (_, args) => Orders.addOrder(
      args.status,
      args.price,
      args.coupon_id,
      args.customer_id,
      args.comment,
      args.address,
    ),
  }),
  updateOrder: t.field({
    type: OrderType,
    args: {
      id: t.arg.int({required: true}),
      number: t.arg.string({required: true}),
      status: t.arg.string({required: true}),
      price: t.arg.string({required: true}),
      coupon_id: t.arg.int({required: true}),
      customer_id: t.arg.int({required: true}),
      comment: t.arg.string({required: false}),
      address: t.arg.string({required: false}),
    },
    resolve: (_, args) => Orders.updateOrder(
      args.id,
      args.number,
      args.status,
      args.price,
      args.coupon_id,
      args.customer_id,
      args.comment,
      args.address,
    ),
  }),
  deleteOrder: t.field({
    type: OrderType,
    nullable: true,
    args: {
      id: t.arg.int({required: true}),
    },
    resolve: (_, args) => Orders.deleteOrder(args.id),
  }),
}));
