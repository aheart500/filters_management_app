import { ApolloServer } from "apollo-server-express";
import typeDefs from "./typedefs";
import resolvers from "./resolvers";
import { Worker, Customer } from "./Models";
import { GraphQLContext } from "./types/Context";

export default new ApolloServer({
  typeDefs,
  resolvers,
  context: (): GraphQLContext => ({
    Worker,
    Customer,
  }),
});
