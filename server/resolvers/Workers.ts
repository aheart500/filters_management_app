import { IResolvers } from "apollo-server-express";
import { FindOptions, Op } from "sequelize";
import { WorkerAttributes } from "../Models/Worker";
import { GraphQLContext } from "../types/Context";
const LIMIT = 1;
const query: FindOptions = {
  order: [["id", "DESC"]],
  limit: LIMIT,
};
const resolvers: IResolvers<any, GraphQLContext> = {
  Query: {
    workers: (_, { offset, search }, { Worker }) => {
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

      return Worker.findAll({ ...query, where });
    },
  },
  Mutation: {
    addWorker: (_, args, { Worker }) => {
      return Worker.create(args);
    },
    updateWorker: async (_, { id, ...args }, { Worker }) => {
      await Worker.update(args, { where: { id } });
      return "Updated";
    },
    deleteWorker: async (_, { id }, { Worker }) => {
      await Worker.destroy({ where: { id } });
      return "Deleted";
    },
  },
};

export default resolvers;
