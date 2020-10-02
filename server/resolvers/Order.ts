import { IResolvers } from "apollo-server-express";
import { FindOptions, Op } from "sequelize";
import { GraphQLContext } from "../types/Context";
import Worker from "../Models/Worker";
import { Installment } from "../Models";
const LIMIT = 10;
export const OrderQueryOptions: FindOptions = {
  order: [["id", "DESC"]],
  limit: LIMIT,
  include: [
    {
      model: Worker,
      as: "worker",
      attributes: ["name", "id"],
    },
    {
      model: Installment,
      as: "installments",
      attributes: ["id"],
    },
  ],
};
const resolvers: IResolvers<any, GraphQLContext> = {
  Query: {
    orders: (_, { offset, search }, { Order }) => {
      let where: any = offset
        ? {
            id: {
              [Op.lt]: offset,
            },
          }
        : {};
      if (search) {
        OrderQueryOptions.include = [
          {
            ...OrderQueryOptions.include[0],
            where: {
              [Op.or]: [
                { id: { [Op.regexp]: search } },
                { name: { [Op.regexp]: search } },
              ],
            },
          },
          OrderQueryOptions.include[1],
        ];
      }

      return Order.findAll({ ...OrderQueryOptions, where });
    },
  },
  Mutation: {
    addOrder: (_, args, { Order }) => {
      return Order.create(args);
    },
    updateOrder: async (_, { id, ...args }, { Order }) => {
      await Order.update(args, { where: { id } });
      return "Updated";
    },
    deleteOrder: async (_, { id }, { Order }) => {
      await Order.destroy({ where: { id } });
      return "Deleted";
    },
  },
};

export default resolvers;
