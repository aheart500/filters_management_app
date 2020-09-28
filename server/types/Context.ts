import { ModelCtor, Model } from "sequelize";
import {
  CustomerAttributes,
  CustomerCreationAttributes,
} from "../Models/Customer";
import { WorkerAttributes, WorkerCreationAttributes } from "../Models/Worker";

export interface GraphQLContext {
  Worker: ModelCtor<Model<WorkerAttributes, WorkerCreationAttributes>>;
  Customer: ModelCtor<Model<CustomerAttributes, CustomerCreationAttributes>>;
}
