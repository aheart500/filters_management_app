import { IResolvers } from "apollo-server-express";
import { FindOptions, Op, where } from "sequelize";
import { Worker } from "../Models";
import Customer, { CustomerAttributes } from "../Models/Customer";
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
    installments: (_, { customerId }, { Installment }) =>
      Installment.findAll({ where: { customerId } }),
    fixes: (_, { customerId }, { Fix }) =>
      Fix.findAll({ where: { customerId } }),
  },
  Mutation: {
    addCustomer: async (
      _,
      args: CustomerAttributes,
      { Customer, Installment, Fix }
    ) => {
      const customer = await Customer.create(args);
      let [year, month]: any = args.load_date.split("-");
      year = Number(year);
      month = Number(month);
      let fixes: any[] = [];
      let myYear = year;
      let myMonth = month;
      for (let i = 0; i < 4; i++) {
        if (myMonth + 3 > 12) {
          myMonth = myMonth + 3 - 12;
          myYear += 1;
        } else {
          myMonth = myMonth + 3;
        }
        fixes.push({
          customerId: (customer as any).id,
          month: myMonth,
          year: myYear,
        });
      }
      await Fix.bulkCreate(fixes);
      if (args.payment_type === "قسط") {
        let installments: any[] = [];

        for (let i = 0; i < args.installments_number; i++) {
          installments.push({
            customerId: (customer as any).id,
            month,
            year,
          });
          if (month === 12) {
            year++;
            month = 1;
          } else {
            month++;
          }
        }
        await Installment.bulkCreate(installments);
      }
      return customer;
    },
    updateCustomer: async (_, { id, ...args }, { Customer }) => {
      await Customer.update(args, { where: { id } });
      return "Updated";
    },
    updateInstallment: async (_, { id, ...args }, { Installment }) => {
      await Installment.update(args, { where: { id } });
      return "Updated";
    },
    updateInstallments: async (_, { ids, ...args }, { Installment }) => {
      await Installment.update(args, { where: { id: { [Op.in]: ids } } });
      return "Updated";
    },
    updateFix: async (_, { id, ...args }, { Fix }) => {
      await Fix.update(args, { where: { id } });
      return "Updated";
    },
    updateFixes: async (_, { ids, ...args }, { Fix }) => {
      await Fix.update(args, { where: { id: { [Op.in]: ids } } });
      return "Updated";
    },
    deleteCustomer: async (_, { id }, { Customer }) => {
      await Customer.destroy({ where: { id } });
      return "Deleted";
    },
    customer: (_, { id }, { Customer }) => Customer.findOne({ where: { id } }),
    filteredInstallments: (_, { city, ...args }, { Installment }) => {
      return Installment.findAll({
        where: args,
        include: {
          model: Customer,
          as: "customer",
          attributes: ["id", "name", "city", "address", "installment_price"],
          where: city
            ? {
                city: {
                  [Op.in]: city.split("/"),
                },
              }
            : {},
        },
      });
    },
    filteredFixes: (_, { city, ...args }, { Fix }) => {
      return Fix.findAll({
        where: args,
        include: {
          model: Customer,
          as: "customer",
          attributes: ["id", "name", "city", "address"],
          where: city
            ? {
                city: {
                  [Op.in]: city.split("/"),
                },
              }
            : {},
        },
      });
    },
  },
};

export default resolvers;
