import {Product} from "@dinenation-postgresql/core/product";
import {SQL} from "@dinenation-postgresql/core/sql";
import {builder} from "../builder";

export const ProductType = builder.objectRef<SQL.Row["product"]>("Product").implement({
  fields: (t) => ({
    id: t.exposeInt("id"),
    title: t.exposeString("title"),
    price: t.exposeFloat("price"),
    allergens: t.exposeString("allergens", {nullable: true}),
    sauces: t.exposeString("sauces", {nullable: true}),
    is_dish: t.exposeBoolean("is_dish"),
    categories: t.exposeString("categories"),
    dish_type: t.exposeString("dish_type"),
    image: t.exposeString("image"),
    small_img: t.exposeString("small_img"),
    description: t.exposeString("description", {nullable: true}),
    week_day: t.exposeString("week_day"),
    status: t.exposeString("status"),
    calories: t.exposeString("calories", {nullable: true}),
  }),
});

builder.queryFields((t)=> ({
  product: t.field({
    type: ProductType,
    args: {
      id: t.arg.int({required: true}),
    },
    resolve: (_, args) => Product.getProduct(args.id)
  }),
  products: t.field({
    type: [ProductType],
    resolve: () => Product.products(),
  }),
}));

builder.mutationFields((t) => ({
  createProduct: t.field({
    type: ProductType,
    args: {
      title: t.arg.string({required: true}),
      price: t.arg.float({required: true}),
      allergens: t.arg.string({required: false}),
      sauces: t.arg.string({required: false}),
      is_dish: t.arg.boolean({required: true}),
      categories: t.arg.string({required: true}),
      dish_type: t.arg.string({required: true}),
      image: t.arg.string({required: true}),
      small_img: t.arg.string({required: true}),
      description: t.arg.string({required: false}),
      week_day: t.arg.string({required: true}),
      status: t.arg.string({required: true}),
      calories: t.arg.string({required: false}),
    },
    resolve: (_, args) => Product.addProduct(
      args.title,
      args.price,
      args.allergens,
      args.sauces,
      args.is_dish,
      args.categories,
      args.dish_type,
      args.image,
      args.image,
      args.description,
      args.week_day,
      args.status,
      args.calories,
    ),
  }),
  updateProduct: t.field({
    type: ProductType,
    args: {
      id: t.arg.int({required: true}),
      title: t.arg.string({required: true}),
      price: t.arg.float({required: true}),
      allergens: t.arg.string({required: false}),
      sauces: t.arg.string({required: false}),
      is_dish: t.arg.boolean({required: true}),
      categories: t.arg.string({required: true}),
      dish_type: t.arg.string({required: true}),
      image: t.arg.string({required: true}),
      small_img: t.arg.string({required: true}),
      description: t.arg.string({required: false}),
      week_day: t.arg.string({required: true}),
      status: t.arg.string({required: true}),
      calories: t.arg.string({required: false}),
    },
    resolve: (_, args) => Product.updateProduct(
      args.id,
      args.title,
      args.price,
      args.allergens,
      args.sauces,
      args.is_dish,
      args.categories,
      args.dish_type,
      args.image,
      args.small_img,
      args.description,
      args.week_day,
      args.status,
      args.calories,
    ),
  }),
  deleteProduct: t.field({
    type: ProductType,
    nullable: true,
    args: {
      id: t.arg.int({required: true}),
    },
    resolve: (_, args) => Product.deleteProduct(args.id),
  }),
}));
