import { IResolvers } from "apollo-server-express";
import { FindOptions, Op } from "sequelize";
import { GraphQLContext } from "../types/Context";
import Worker from "../Models/Worker";
const LIMIT = 10;
export const RewardQueryOptions: FindOptions = {
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
    rewards: (_, { offset, search }, { Reward }) => {
      let where: any = offset
        ? {
            id: {
              [Op.lt]: offset,
            },
          }
        : {};
      if (search) {
        RewardQueryOptions.include = [
          {
            ...RewardQueryOptions.include[0],
            where: {
              [Op.or]: [
                { id: { [Op.regexp]: search } },
                { name: { [Op.regexp]: search } },
              ],
            },
          },
        ];
      }

      return Reward.findAll({ ...RewardQueryOptions, where });
    },
  },
  Mutation: {
    addReward: (_, args, { Reward }) => {
      return Reward.create(args);
    },
    updateReward: async (_, { id, ...args }, { Reward }) => {
      await Reward.update(args, { where: { id } });
      return "Updated";
    },
    deleteReward: async (_, { id }, { Reward }) => {
      await Reward.destroy({ where: { id } });
      return "Deleted";
    },
  },
};

export default resolvers;
