import { IResolvers } from "apollo-server-express";
import { FindOptions, Op } from "sequelize";
import { GraphQLContext } from "../types/Context";
import Worker from "../Models/Worker";
const LIMIT = 10;
export const LoanQueryOptions: FindOptions = {
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
    loans: (_, { offset, search }, { Loan }) => {
      let where: any = offset
        ? {
            id: {
              [Op.lt]: offset,
            },
          }
        : {};
      if (search) {
        LoanQueryOptions.include = [
          {
            ...LoanQueryOptions.include[0],
            where: {
              [Op.or]: [
                { id: { [Op.regexp]: search } },
                { name: { [Op.regexp]: search } },
              ],
            },
          },
        ];
      }

      return Loan.findAll({ ...LoanQueryOptions, where });
    },
  },
  Mutation: {
    addLoan: (_, args, { Loan }) => {
      return Loan.create(args);
    },
    updateLoan: async (_, { id, ...args }, { Loan }) => {
      await Loan.update(args, { where: { id } });
      return "Updated";
    },
    deleteLoan: async (_, { id }, { Loan }) => {
      await Loan.destroy({ where: { id } });
      return "Deleted";
    },
  },
};

export default resolvers;
