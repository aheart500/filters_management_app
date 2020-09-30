import { ModelCtor, Model } from "sequelize";
import {
  AbsenceAttributes,
  AbsenceCreationAttributes,
} from "../Models/Absence";
import { BasicsAttributes, BasicsCreationAttributes } from "../Models/Basics";
import { BorrowAttributes, BorrowCreationAttributes } from "../Models/Borrow";
import {
  CustomerAttributes,
  CustomerCreationAttributes,
} from "../Models/Customer";
import {
  PenaltyAttributes,
  PenaltyCreationAttributes,
} from "../Models/Penalty";
import { RewardAttributes, RewardCreationAttributes } from "../Models/Reward";
import { WorkerAttributes, WorkerCreationAttributes } from "../Models/Worker";

export interface GraphQLContext {
  Worker: ModelCtor<Model<WorkerAttributes, WorkerCreationAttributes>>;
  Customer: ModelCtor<Model<CustomerAttributes, CustomerCreationAttributes>>;
  Penalty: ModelCtor<Model<PenaltyAttributes, PenaltyCreationAttributes>>;
  Absence: ModelCtor<Model<AbsenceAttributes, AbsenceCreationAttributes>>;
  Reward: ModelCtor<Model<RewardAttributes, RewardCreationAttributes>>;
  Basics: ModelCtor<Model<BasicsAttributes, BasicsCreationAttributes>>;
  Borrow: ModelCtor<Model<BorrowAttributes, BorrowCreationAttributes>>;
}
