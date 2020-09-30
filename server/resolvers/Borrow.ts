import { IResolvers } from "apollo-server-express";
import { FindOptions, Op } from "sequelize";
import { GraphQLContext } from "../types/Context";
import Worker from "../Models/Worker";
const LIMIT = 10;
export const BorrowQueryOptions: FindOptions = {
  order: [["id", "DESC"]],
  limit: LIMIT,
  include: [
    {
      model: Worker,
      as: "worker",
      attributes: ["name", "id"],
    },
  ],
};
const resolvers: IResolvers<any, GraphQLContext> = {
  Query: {
    borrows: (_, { offset, search }, { Borrow }) => {
      let where: any = offset
        ? {
            id: {
              [Op.lt]: offset,
            },
          }
        : {};
      if (search) {
        BorrowQueryOptions.include = [
          {
            ...BorrowQueryOptions.include[0],
            where: {
              [Op.or]: [
                { id: { [Op.regexp]: search } },
                { name: { [Op.regexp]: search } },
              ],
            },
          },
        ];
      }

      return Borrow.findAll({ ...BorrowQueryOptions, where });
    },
  },
  Mutation: {
    addBorrow: (_, args, { Borrow }) => {
      return Borrow.create(args);
    },
    updateBorrow: async (_, { id, ...args }, { Borrow }) => {
      await Borrow.update(args, { where: { id } });
      return "Updated";
    },
    deleteBorrow: async (_, { id }, { Borrow }) => {
      await Borrow.destroy({ where: { id } });
      return "Deleted";
    },
  },
};

export default resolvers;
