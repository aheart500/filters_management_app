import { ApolloServer } from "apollo-server-express";
import typeDefs from "./typedefs";
import resolvers from "./resolvers";
import {
  Worker,
  Customer,
  Penalty,
  Absence,
  Basics,
  Borrow,
  Reward,
  InstallingFee,
  SellingFee,
  Installment,
  Loan,
  Order,
} from "./Models";
import { GraphQLContext } from "./types/Context";

export default new ApolloServer({
  typeDefs,
  resolvers,
  context: (): GraphQLContext => ({
    Worker,
    Customer,
    Penalty,
    Absence,
    Basics,
    Borrow,
    Reward,
    InstallingFee,
    SellingFee,
    Installment,
    Loan,
    Order,
  }),
});
