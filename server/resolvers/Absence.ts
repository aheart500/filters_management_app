import { IResolvers } from "apollo-server-express";
import { FindOptions, Op } from "sequelize";
import { GraphQLContext } from "../types/Context";
import Worker from "../Models/Worker";
const LIMIT = 10;
export const AbsenceQueryOptions: FindOptions = {
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
    absence: (_, { offset, search }, { Absence }) => {
      let where: any = offset
        ? {
            id: {
              [Op.lt]: offset,
            },
          }
        : {};
      if (search) {
        AbsenceQueryOptions.include = [
          {
            ...AbsenceQueryOptions.include[0],
            where: {
              [Op.or]: [
                { id: { [Op.regexp]: search } },
                { name: { [Op.regexp]: search } },
              ],
            },
          },
        ];
      }

      return Absence.findAll({ ...AbsenceQueryOptions, where });
    },
  },
  Mutation: {
    addAbsence: (_, args, { Absence }) => {
      return Absence.create(args);
    },
    updateAbsence: async (_, { id, ...args }, { Absence }) => {
      await Absence.update(args, { where: { id } });
      return "Updated";
    },
    deleteAbsence: async (_, { id }, { Absence }) => {
      await Absence.destroy({ where: { id } });
      return "Deleted";
    },
  },
};

export default resolvers;
