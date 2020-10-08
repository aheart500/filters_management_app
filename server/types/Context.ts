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
import { FixModel } from "../Models/Fix";
import {
  InstalligFeeCreationAttributes,
  InstallingFeeAttributes,
} from "../Models/InstallingFee";
import {
  InstallmentAttributes,
  InstallmentCreationAttributes,
} from "../Models/Installment";
import { LoanAttributes, LoanCreationAttributes } from "../Models/Loan";
import { OrderModel } from "../Models/Order";
import {
  PenaltyAttributes,
  PenaltyCreationAttributes,
} from "../Models/Penalty";
import { RewardAttributes, RewardCreationAttributes } from "../Models/Reward";
import {
  SellingFeeAttributes,
  SellingFeeCreationAttributes,
} from "../Models/SellingFee";
import { WorkerAttributes, WorkerCreationAttributes } from "../Models/Worker";

export interface GraphQLContext {
  Worker: ModelCtor<Model<WorkerAttributes, WorkerCreationAttributes>>;
  Customer: ModelCtor<Model<CustomerAttributes, CustomerCreationAttributes>>;
  Penalty: ModelCtor<Model<PenaltyAttributes, PenaltyCreationAttributes>>;
  Absence: ModelCtor<Model<AbsenceAttributes, AbsenceCreationAttributes>>;
  Reward: ModelCtor<Model<RewardAttributes, RewardCreationAttributes>>;
  Basics: ModelCtor<Model<BasicsAttributes, BasicsCreationAttributes>>;
  Borrow: ModelCtor<Model<BorrowAttributes, BorrowCreationAttributes>>;
  InstallingFee: ModelCtor<
    Model<InstallingFeeAttributes, InstalligFeeCreationAttributes>
  >;
  SellingFee: ModelCtor<
    Model<SellingFeeAttributes, SellingFeeCreationAttributes>
  >;
  Installment: ModelCtor<
    Model<InstallmentAttributes, InstallmentCreationAttributes>
  >;
  Loan: ModelCtor<Model<LoanAttributes, LoanCreationAttributes>>;
  Order: OrderModel;
  Fix: FixModel;
}
