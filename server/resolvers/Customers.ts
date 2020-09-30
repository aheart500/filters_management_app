import { IResolvers } from "apollo-server-express";
import { FindOptions, Op } from "sequelize";
import { Worker } from "../Models";
import { GraphQLContext } from "../types/Context";
const LIMIT = 10;
export const CustomerModelQuery = {
  order: [["id", "DESC"]],
  limit: LIMIT,
  include: [
    {
      model: Worker,
      as: "m1",
      attributes: ["name"],
    },
    {
      model: Worker,
      as: "m2",
      attributes: ["name"],
    },
    {
      model: Worker,
      as: "m3",
      attributes: ["name"],
    },
    {
      model: Worker,
      as: "f1",
      attributes: ["name"],
    },
    {
      model: Worker,
      as: "f2",
      attributes: ["name"],
    },
    {
      model: Worker,
      as: "f3",
      attributes: ["name"],
    },
  ],
} as FindOptions;

const resolvers: IResolvers<any, GraphQLContext> = {
  Query: {
    customers: (_, { offset, search }, { Customer }) => {
      let where: any = offset
        ? {
            id: {
              [Op.lt]: offset,
            },
          }
        : {};
      if (search)
        where = {
          ...where,
          [Op.or]: [
            { id: { [Op.regexp]: search } },
            { name: { [Op.regexp]: search } },
          ],
        };

      return Customer.findAll({ ...CustomerModelQuery, where });
    },
  },
  Mutation: {
    addCustomer: (_, args, { Customer }) => {
      return Customer.create(args);
    },
    updateCustomer: async (_, { id, ...args }, { Customer }) => {
      await Customer.update(args, { where: { id } });
      return "Updated";
    },
    deleteCustomer: async (_, { id }, { Customer }) => {
      await Customer.destroy({ where: { id } });
      return "Deleted";
    },
  },
};

export default resolvers;
