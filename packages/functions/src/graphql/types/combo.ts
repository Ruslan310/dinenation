import {Combo} from "@dinenation-postgresql/core/combo";
import {SQL} from "@dinenation-postgresql/core/sql";
import {builder} from "../builder";
import {ProductType} from "./product";


const ComboType = builder.objectRef<SQL.Row["combo"]>("Combo").implement({
  fields: (t) => {
    return ({
      id: t.exposeInt("id"),
      title: t.exposeString("title"),
      domain_id: t.exposeInt("domain_id"),
      price: t.exposeFloat("price"),
      type: t.exposeString("type"),
      image: t.exposeString("image"),
      description: t.exposeString("description", {nullable: true}),
      week_day: t.exposeString("week_day"),
      status: t.exposeString("status"),
      products: t.field({
        type: [ProductType],
        resolve: (args) => Combo.comboProducts(args.id),
      }),
    });
  },
});

const ComboProductType = builder.objectRef<SQL.Row["combo_product"]>("ComboProduct").implement({
  fields: (t) => ({
    product_id: t.exposeInt("product_id"),
    combo_id: t.exposeInt("combo_id"),
    price: t.exposeFloat("price"),
    dish_type: t.exposeString("dish_type"),
  }),
});

builder.queryFields((t)=> ({
  comboById: t.field({
    type: ComboType,
    args: {
      id: t.arg.int({required: true}),
    },
    resolve: async (_, args)=> {
      const result = await Combo.getCombo(args.id);

      if (!result) {
        throw new Error("Product not found");
      }

      return result;
    },
  }),
  combosByCoupon: t.field({
    type: [ComboType],
    args: {
      domain_id: t.arg.int({required: true}),
    },
    resolve: (_, args) => Combo.getCombosByCoupon(args.domain_id),
  }),
  combosList: t.field({
    type: [ComboType],
    resolve: () => Combo.combos(),
  }),
}));

builder.mutationFields((t) => ({
  addCombo: t.field({
    type: ComboType,
    resolve: (_, args) => Combo.addCombo(
      args.title,
      args.domain_id,
      args.price,
      args.type,
      args.image,
      args.description,
      args.week_day,
      args.status,
    ),
    args: {
      title: t.arg.string({required: true}),
      domain_id: t.arg.int({required: true}),
      price: t.arg.float({required: true}),
      type: t.arg.string({required: true}),
      image: t.arg.string({required: true}),
      description: t.arg.string({required: false}),
      week_day: t.arg.string({required: true}),
      status: t.arg.string({required: true}),
    },
  }),
  updateCombo: t.field({
    type: ComboType,
    args: {
      id: t.arg.int({required: true}),
      title: t.arg.string({required: true}),
      domain_id: t.arg.int({required: true}),
      price: t.arg.float({required: true}),
      type: t.arg.string({required: true}),
      image: t.arg.string({required: true}),
      description: t.arg.string({required: false}),
      week_day: t.arg.string({required: true}),
      status: t.arg.string({required: true}),
    },
    resolve: (_, args) => Combo.updateCombo(
      args.id,
      args.title,
      args.domain_id,
      args.price,
      args.type,
      args.image,
      args.description,
      args.week_day,
      args.status,
    ),
  }),
  deleteCombo: t.field({
    type: ComboType,
    nullable: true,
    args: {
      id: t.arg.int({required: true}),
    },
    resolve: (_, args) => Combo.deleteCombo(args.id),
  }),
  addComboProducts: t.field({
    type: ComboProductType,
    args: {
      product_id: t.arg.int({required: true}),
      combo_id: t.arg.int({required: true}),
      price: t.arg.float({required: true}),
      dish_type: t.arg.string({required: true}),
    },
    resolve: (_, args) => Combo.addComboProducts(
      args.product_id,
      args.combo_id,
      args.price,
      args.dish_type,
    ),
  }),
  deleteComboProduct: t.field({
    type: 'Boolean',
    args: {
      combo_id: t.arg.int({required: true}),
    },
    resolve: (_, args) => Combo.deleteComboProduct(args.combo_id),
  }),
}));

