import { IResolvers } from "apollo-server-express";
import { FindOptions, Op } from "sequelize";
import { GraphQLContext } from "../types/Context";
import Worker from "../Models/Worker";
const LIMIT = 10;
export const BasicsQueryOptions: FindOptions = {
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
    basics: (_, { offset, search }, { Basics }) => {
      let where: any = offset
        ? {
            id: {
              [Op.lt]: offset,
            },
          }
        : {};
      if (search) {
        BasicsQueryOptions.include = [
          {
            ...BasicsQueryOptions.include[0],
            where: {
              [Op.or]: [
                { id: { [Op.regexp]: search } },
                { name: { [Op.regexp]: search } },
              ],
            },
          },
        ];
      }

      return Basics.findAll({ ...BasicsQueryOptions, where });
    },
  },
  Mutation: {
    addBasics: (_, args, { Basics }) => {
      return Basics.create(args);
    },
    updateBasics: async (_, { id, ...args }, { Basics }) => {
      await Basics.update(args, { where: { id } });
      return "Updated";
    },
    deleteBasics: async (_, { id }, { Basics }) => {
      await Basics.destroy({ where: { id } });
      return "Deleted";
    },
  },
};

export default resolvers;
