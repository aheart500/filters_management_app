import { IResolvers } from "apollo-server-express";
import { FindOptions, Op } from "sequelize";
import { Worker } from "../Models";
import { GraphQLContext } from "../types/Context";
const LIMIT = 10;
const query = {
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
    customers: (_, { cursor }, { Customer }) => {
      if (cursor)
        return Customer.findAll({
          where: {
            id: {
              [Op.lt]: cursor,
            },
          },
          ...query,
        });

      return Customer.findAll({
        ...query,
      });
    },
  },
  Mutation: {
    addCustomer: (_, args, { Customer }) => {
      return Customer.create(args);
    },
  },
};

export default resolvers;
