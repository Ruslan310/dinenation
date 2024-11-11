import {Orders, ordersByCouponDate} from "@dinenation-postgresql/core/orders";
import {Users} from "@dinenation-postgresql/core/users";
import {Coupons} from "@dinenation-postgresql/core/coupons";
import {SQL} from "@dinenation-postgresql/core/sql";
import {builder} from "../builder";
import {BoxType} from "./boxes";
import {UsersType} from "./users";
import {CouponsType} from "./coupons";

export const OrderType = builder.objectRef<SQL.Row["orders"]>("Orders").implement({
  fields: (t) => ({
    id: t.exposeInt("id"),
    number: t.exposeString("number"),
    status: t.exposeString("status"),
    price: t.exposeFloat("price"),
    combo_price: t.exposeFloat("combo_price"),
    coupon: t.field({
      type: CouponsType,
      resolve: (order) => Coupons.getCoupon(order.coupon_id),
    }),
    customer: t.field({
      type: UsersType,
      resolve: (order) => Users.getUserId(order.customer_id),
    }),
    comment: t.exposeString("comment", { nullable: true }),
    address: t.exposeString("address", { nullable: true }),
    date_created: t.exposeString("date_created"),
    products: t.field({
      type: [BoxType],
      resolve: (order) => Orders.orderProducts(order.id),
    }),
  }),
});

const BoxInputRef = builder.inputType('BoxInput', {
  fields: (t) => ({
    sticker: t.string({ required: true }),
    type: t.string({ required: true }),
    week_day: t.string({ required: true }),
    image: t.string({ required: true }),
    small_img: t.string({ required: true }),
    office: t.string({ required: false }),
    price: t.float({ required: true }),
    side_dish: t.string({ required: false }),
    side_dish_type: t.string({ required: false }),
    sauce: t.string({ required: false }),
    combo_id: t.int({ required: true }),
  }),
});

builder.queryFields((t) => ({
  order: t.field({
    type: OrderType,
    args: {
      id: t.arg.int({ required: true }),
    },
    resolve: (_, args) => Orders.getOrder(args.id),
  }),
  orderCustomerId: t.field({
    type: OrderType,
    args: {
      id: t.arg.int({ required: true }),
      customer_id: t.arg.int({ required: true }),
    },
    resolve: (_, args) => Orders.getOrderCustomerId(args.id, args.customer_id),
  }),
  ordersByCustomerId: t.field({
    type: [OrderType],
    args: {
      customer_id: t.arg.int({ required: true }),
    },
    resolve: (_, args) => Orders.ordersByCustomerId(args.customer_id),
  }),
  ordersByCoupon: t.field({
    type: [OrderType],
    args: {
      coupon_id: t.arg.int({ required: true }),
    },
    resolve: (_, args) => Orders.ordersByCoupon(args.coupon_id),
  }),
  ordersByCouponDate: t.field({
    type: [OrderType],
    args: {
      coupon_id: t.arg.int({ required: true }),
      date_start: t.arg.string({ required: true }),
      date_end: t.arg.string({ required: true }),
    },
    resolve: (_, args) => Orders.ordersByCouponDate(
      args.coupon_id,
      args.date_start,
      args.date_end,
    ),
  }),
  ordersCheckById: t.field({
    type: [OrderType],
    args: {
      customer_id: t.arg.int({ required: true }),
      status: t.arg.string({ required: true }),
    },
    resolve: (_, args) => Orders.ordersCheckById(args.customer_id, args.status),
  }),
  ordersByBox: t.field({
    type: [OrderType],
    resolve: (_, args) => Orders.ordersByBox(),
  }),
  ordersByStatus: t.field({
    type: [OrderType],
    args: {
      status: t.arg.string({ required: true }),
      limit: t.arg.int({ required: false }),
      offset: t.arg.int({ required: false }),
    },
    resolve: (_, args) => Orders.ordersByStatus(args.status, args.limit || 10, args.offset || 0),
  }),
  orders: t.field({
    type: [OrderType],
    resolve: () => Orders.orders(),
  }),
  totalCount: t.field({
    type: "Int",
    args: {
      status: t.arg.string({ required: true }),
    },
    resolve: (_, args) => Orders.orderTotalCount(args.status),
  }),
}));

builder.mutationFields((t) => ({
  createOrderWithBoxes: t.field({
    type: OrderType,
    args: {
      price: t.arg.float({ required: true }),
      combo_price: t.arg.float({ required: true }),
      coupon_id: t.arg.int({ required: true }),
      customer_id: t.arg.int({ required: true }),
      comment: t.arg.string({ required: false }),
      address: t.arg.string({ required: false }),
      boxes: t.arg({
        type: [BoxInputRef],
        required: true,
      }),
    },
    resolve: (_, args) => Orders.createOrderWithBoxes(
        args.price,
        args.combo_price,
        args.coupon_id,
        args.customer_id,
        args.comment,
        args.address,
        args.boxes
      )
  }),

  updateOrder: t.field({
    type: OrderType,
    args: {
      id: t.arg.int({ required: true }),
      number: t.arg.string({ required: true }),
      status: t.arg.string({ required: true }),
      price: t.arg.float({ required: true }),
      combo_price: t.arg.float({ required: true }),
      coupon_id: t.arg.int({ required: true }),
      customer_id: t.arg.int({ required: true }),
      comment: t.arg.string({ required: false }),
      address: t.arg.string({ required: false }),
    },
    resolve: (_, args) => Orders.updateOrder(
      args.id,
      args.number,
      args.status,
      args.price,
      args.combo_price,
      args.coupon_id,
      args.customer_id,
      args.comment,
      args.address,
    ),
  }),
  updateOrderWithBoxes: t.field({
    type: OrderType,
    args: {
      id: t.arg.int({ required: true }),
      status: t.arg.string({ required: true }),
      combo_id: t.arg.int({ required: true }),
      price: t.arg.float({ required: true }),
      customer_id: t.arg.int({ required: true }),
      boxes: t.arg({
        type: [BoxInputRef],
        required: true,
      }),
    },
    resolve: (_, args) => Orders.updateOrderWithBoxes(
      args.id,
      args.status,
      args.combo_id,
      args.price,
      args.customer_id,
      args.boxes
    )
  }),

  deleteOrder: t.field({
    type: 'Boolean',
    args: {
      id: t.arg.int({ required: true }),
    },
    resolve: (_, args) => Orders.deleteOrder(args.id),
  }),
}));
