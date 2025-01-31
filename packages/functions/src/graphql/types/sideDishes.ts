import {SideDish} from "@dinenation-postgresql/core/sideDishes";
import {SQL} from "@dinenation-postgresql/core/sql";
import {builder} from "../builder";

const SideDishType = builder.objectRef<SQL.Row["side_dishes"]>("SideDish").implement({
  fields: (t) => ({
    id: t.exposeInt("id"),
    title: t.exposeString("title"),
    type: t.exposeString("type"),
    status: t.exposeString("status"),
  }),
});

builder.queryFields((t)=> ({
  sideDish: t.field({
    type: SideDishType,
    args: {
      id: t.arg.int({required: true}),
    },
    resolve: async (_, args)=> {
      const result = await SideDish.getSideDish(args.id);

      if (!result) {
        throw new Error("Combo not found");
      }

      return result;
    },
  }),
  sideDishes: t.field({
    type: [SideDishType],
    resolve: () => SideDish.sideDishes(),
  }),
}));

builder.mutationFields((t) => ({
  addSideDish: t.field({
    type: SideDishType,
    resolve: (_, args) => SideDish.addSideDish(
      args.title,
      args.type,
      args.status,
    ),
    args: {
      title: t.arg.string({required: true}),
      type: t.arg.string({required: true}),
      status: t.arg.string({required: true}),
    },
  }),
  updateSideDish: t.field({
    type: SideDishType,
    args: {
      id: t.arg.int({required: true}),
      title: t.arg.string({required: true}),
      type: t.arg.string({required: true}),
      status: t.arg.string({required: true}),
    },
    resolve: (_, args)=> SideDish.updateSideDish(
      args.id,
      args.title,
      args.type,
      args.status,
    ),
  }),
  deleteSideDish: t.field({
    type: SideDishType,
    nullable: true,
    args: {
      id: t.arg.int({required: true}),
    },
    resolve: (_, args) => SideDish.deleteSideDish(args.id),
  }),
}));
