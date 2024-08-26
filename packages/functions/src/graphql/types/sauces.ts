import {Sauces} from "@dinenation-postgresql/core/sauces";
import {SQL} from "@dinenation-postgresql/core/sql";
import {builder} from "../builder";

const SaucesType = builder.objectRef<SQL.Row["sauces"]>("Sauces").implement({
  fields: (t) => ({
    id: t.exposeInt("id"),
    title: t.exposeString("title"),
    status: t.exposeString("status"),
  }),
});

builder.queryFields((t)=> ({
  sauce: t.field({
    type: SaucesType,
    args: {
      id: t.arg.int({required: true}),
    },
    resolve: async (_, args)=> {
      const result = await Sauces.getSauces(args.id);

      if (!result) {
        throw new Error("Sauces not found");
      }

      return result;
    },
  }),
  sauces: t.field({
    type: [SaucesType],
    resolve: () => Sauces.sauces(),
  }),
}));

builder.mutationFields((t) => ({
  addSauce: t.field({
    type: SaucesType,
    args: {
      title: t.arg.string({required: true}),
      status: t.arg.string({required: true}),
    },
    resolve: (_, args) => Sauces.addSauce(
      args.title,
      args.status,
    ),
  }),
  updateSauces: t.field({
    type: SaucesType,
    args: {
      id: t.arg.int({required: true}),
      title: t.arg.string({required: true}),
      status: t.arg.string({required: true}),
    },
    resolve: (_, args)=> Sauces.updateSauces(
      args.id,
      args.title,
      args.status,
    ),
  }),
  deleteSauces: t.field({
    type: 'Boolean',
    args: {
      id: t.arg.int({required: true}),
    },
    resolve: (_, args) => Sauces.deleteSauces(args.id),
  }),
}));
