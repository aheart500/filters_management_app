import { IResolvers } from "apollo-server-express";
import { FindOptions, Op } from "sequelize";
import { GraphQLContext } from "../types/Context";
import Customer from "../Models/Customer";
import Worker from "../Models/Worker";

const LIMIT = 10;
export const FeeQueryOptions: FindOptions = {
  order: [["id", "DESC"]],
  limit: LIMIT,
  include: [
    {
      model: Worker,
      as: "worker",
      attributes: ["name", "id"],
    },
    {
      model: Customer,
      as: "customer",
      attributes: ["name", "id"],
    },
  ],
};
const resolvers: IResolvers<any, GraphQLContext> = {
  Query: {
    fees: (_, { type, offset, search }, { InstallingFee, SellingFee }) => {
      let where: any = offset
        ? {
            id: {
              [Op.lt]: offset,
            },
          }
        : {};
      if (search) {
        FeeQueryOptions.include = [
          {
            ...FeeQueryOptions.include[0],
            where: {
              [Op.or]: [
                { id: { [Op.regexp]: search } },
                { name: { [Op.regexp]: search } },
              ],
            },
          },
        ];
      }
      if (type === "Installing")
        return InstallingFee.findAll({ ...FeeQueryOptions, where });
      return SellingFee.findAll({ ...FeeQueryOptions, where });
    },
  },
  Mutation: {
    addFee: (_, { type, ...args }, { InstallingFee, SellingFee }) => {
      if (type === "Installing") return InstallingFee.create(args);
      return SellingFee.create(args);
    },
    updateFee: async (
      _,
      { id, type, ...args },
      { InstallingFee, SellingFee }
    ) => {
      if (type === "Installing") {
        await InstallingFee.update(args, { where: { id } });
      } else {
        await SellingFee.update(args, { where: { id } });
      }
      return "Updated";
    },
    deleteBorrow: async (_, { id, type }, { InstallingFee, SellingFee }) => {
      if (type === "Installing") {
        await InstallingFee.destroy({ where: { id } });
      } else {
        await SellingFee.destroy({ where: { id } });
      }
      return "Deleted";
    },
  },
};

export default resolvers;
