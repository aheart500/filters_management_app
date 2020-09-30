import { IResolvers } from "apollo-server-express";
import { FindOptions, Op } from "sequelize";
import { GraphQLContext } from "../types/Context";
import Worker from "../Models/Worker";
const LIMIT = 10;
export const PenaltiesQueryOptions: FindOptions = {
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
    penalties: (_, { offset, search }, { Penalty }) => {
      let where: any = offset
        ? {
            id: {
              [Op.lt]: offset,
            },
          }
        : {};
      if (search) {
        PenaltiesQueryOptions.include = [
          {
            ...PenaltiesQueryOptions.include[0],
            where: {
              [Op.or]: [
                { id: { [Op.regexp]: search } },
                { name: { [Op.regexp]: search } },
              ],
            },
          },
        ];
      }

      return Penalty.findAll({ ...PenaltiesQueryOptions, where });
    },
  },
  Mutation: {
    addPenalty: (_, args, { Penalty }) => {
      return Penalty.create(args);
    },
    updatePenalty: async (_, { id, ...args }, { Penalty }) => {
      await Penalty.update(args, { where: { id } });
      return "Updated";
    },
    deletePenalty: async (_, { id }, { Penalty }) => {
      await Penalty.destroy({ where: { id } });
      return "Deleted";
    },
  },
};

export default resolvers;
