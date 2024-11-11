import {Boxes} from "@dinenation-postgresql/core/boxes";
import {SQL} from "@dinenation-postgresql/core/sql";
import {builder} from "../builder";

export const BoxType = builder.objectRef<SQL.Row["boxes"]>("Boxes").implement({
  fields: (t) => ({
    id: t.exposeInt("id"),
    sticker: t.exposeString("sticker"),
    type: t.exposeString("type"),
    week_day: t.exposeString("week_day"),
    image: t.exposeString("image"),
    small_img: t.exposeString("small_img"),
    office: t.exposeString("office", {nullable: true}),
    price: t.exposeFloat("price"),
    side_dish: t.exposeString("side_dish", {nullable: true}),
    side_dish_type: t.exposeString("side_dish_type", {nullable: true}),
    sauce: t.exposeString("sauce", {nullable: true}),
    order_id: t.exposeInt("order_id"),
    combo_id: t.exposeInt("combo_id"),
    status: t.exposeString("status"),
    date_updated: t.exposeString("date_updated"),
  }),
});

builder.queryFields((t)=> ({
  box: t.field({
    type: BoxType,
    args: {
      id: t.arg.int({required: true}),
    },
    resolve: async (_, args)=>
      await Boxes.getBox(args.id)
  }),
  boxes: t.field({
    type: [BoxType],
    resolve: () => Boxes.boxes(),
  }),
  boxesDay: t.field({
    type: [BoxType],
    args: {
      week_day: t.arg.string({required: true}),
    },
    resolve: (_, args) => Boxes.boxesDay(args.week_day),
  }),
}));

builder.mutationFields((t) => ({
  createBox: t.field({
    type: BoxType,
    args: {
      sticker: t.arg.string({required: true}),
      type: t.arg.string({required: true}),
      week_day: t.arg.string({required: true}),
      image: t.arg.string({required: true}),
      small_img: t.arg.string({required: true}),
      office: t.arg.string({required: false}),
      price: t.arg.float({required: true}),
      side_dish: t.arg.string({required: false}),
      side_dish_type: t.arg.string({required: false}),
      sauce: t.arg.string({required: false}),
      order_id: t.arg.int({required: true}),
      combo_id: t.arg.int({required: true}),
    },
    resolve: (_, args) => Boxes.addBox(
      args.sticker,
      args.type,
      args.week_day,
      args.image,
      args.small_img,
      args.office,
      args.price,
      args.side_dish,
      args.side_dish_type,
      args.sauce,
      args.order_id,
      args.combo_id,
    ),
  }),
  updateBox: t.field({
    type: BoxType,
    args: {
      id: t.arg.int({required: true}),
      sticker: t.arg.string({required: true}),
      type: t.arg.string({required: true}),
      week_day: t.arg.string({required: true}),
      image: t.arg.string({required: true}),
      small_img: t.arg.string({required: true}),
      office: t.arg.string({required: false}),
      price: t.arg.float({required: true}),
      side_dish: t.arg.string({required: false}),
      side_dish_type: t.arg.string({required: false}),
      sauce: t.arg.string({required: false}),
      order_id: t.arg.int({required: true}),
      combo_id: t.arg.int({required: true}),
      status: t.arg.string({required: true}),
    },
    resolve: (_, args) => Boxes.updateBox(
      args.id,
      args.sticker,
      args.type,
      args.week_day,
      args.image,
      args.small_img,
      args.office,
      args.price,
      args.side_dish,
      args.side_dish_type,
      args.sauce,
      args.order_id,
      args.combo_id,
      args.status,
    ),
  }),
  updateBoxList: t.field({
    type: 'Boolean',
    args: {
      list: t.arg.intList({ required: true }),
    },
    resolve: (_, args) => Boxes.updateBoxList(args.list),
  }),
  deleteBox: t.field({
    type: 'Boolean',
    args: {
      id: t.arg.int({required: true}),
    },
    resolve: (_, args) => Boxes.deleteBox(args.id),
  }),
  deleteBoxCombo: t.field({
    type: 'Boolean',
    args: {
      combo_id: t.arg.int({required: true}),
      order_id: t.arg.int({required: true}),
    },
    resolve: (_, args) => Boxes.deleteBoxCombo(args.combo_id, args.order_id),
  }),
}));
