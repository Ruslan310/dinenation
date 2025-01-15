import {Review} from "@dinenation-postgresql/core/review";
import {SQL} from "@dinenation-postgresql/core/sql";
import {builder} from "../builder";
import {UsersType} from "./users";
import {Users} from "@dinenation-postgresql/core/users";

const ReviewType = builder.objectRef<SQL.Row["review"]>("Review").implement({
  fields: (t) => ({
    id: t.exposeInt("id"),
    user: t.field({
      type: UsersType,
      resolve: (user) => Users.getUserId(user.user_id),
    }),
    review: t.exposeString("review"),
    rate: t.exposeInt("rate"),
    img: t.exposeString("img"),
    dish_name: t.exposeString("dish_name"),
    date_created: t.exposeString("date_created"),
  }),
});

builder.queryFields((t)=> ({
  review: t.field({
    type: ReviewType,
    args: {
      id: t.arg.int({required: true}),
    },
    resolve: async (_, args)=> {
      const result = await Review.getReview(args.id);

      if (!result) {
        throw new Error("Review not found");
      }

      return result;
    },
  }),
  userReviews: t.field({
    type: [ReviewType],
    args: {
      user_id: t.arg.int({required: true}),
    },
    resolve: (_, args) => Review.userReviews(args.user_id),
  }),
  reviews: t.field({
    type: [ReviewType],
    resolve: () => Review.reviews(),
  }),
}));

builder.mutationFields((t) => ({
  addReview: t.field({
    type: ReviewType,
    args: {
      user_id: t.arg.int({required: true}),
      review: t.arg.string({required: true}),
      rate: t.arg.int({required: true}),
      img: t.arg.string({required: true}),
      dish_name: t.arg.string({required: true}),
    },
    resolve: (_, args) => Review.addReview(
      args.user_id,
      args.review,
      args.rate,
      args.img,
      args.dish_name,
    ),
  }),
  updateReview: t.field({
    type: ReviewType,
    args: {
      id: t.arg.int({required: true}),
      user_id: t.arg.int({required: true}),
      review: t.arg.string({required: true}),
      rate: t.arg.int({required: true}),
      img: t.arg.string({required: true}),
      dish_name: t.arg.string({required: true}),
    },
    resolve: (_, args)=> Review.updateReview(
      args.id,
      args.user_id,
      args.review,
      args.rate,
      args.img,
      args.dish_name,
    ),
  }),
  deleteReview: t.field({
    type: 'Boolean',
    args: {
      id: t.arg.int({required: true}),
    },
    resolve: (_, args) => Review.deleteReview(args.id),
  }),
  deleteUserReview: t.field({
    type: 'Boolean',
    args: {
      user_id: t.arg.int({required: true}),
    },
    resolve: (_, args) => Review.deleteUserReview(args.user_id),
  }),
}));
