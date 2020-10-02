import db from "../MySQL";
import { Optional, DataTypes, ModelDefined } from "sequelize";
import Penalty from "./Penalty";
import Absence from "./Absence";
import Basics from "./Basics";
import Borrow from "./Borrow";
import Customer from "./Customer";
import Reward from "./Reward";
import InstallingFee from "./InstallingFee";
import SellingFee from "./SellingFee";
import Installment from "./Installment";
import Loan from "./Loan";
import Order from "./Order";

export interface WorkerAttributes {
  id: number;
  name: string;
  phone: string;
  address: string;
  hire_date: string;
  marital_status: string;
}

export interface WorkerCreationAttributes
  extends Optional<WorkerAttributes, "id"> {}
const Worker: ModelDefined<
  WorkerAttributes,
  WorkerCreationAttributes
> = db.define(
  "Worker",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.TEXT({ length: "medium" }),
    },
    marital_status: {
      type: DataTypes.STRING,
    },
    hire_date: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);
Worker.hasMany(Penalty, { as: "penalties", foreignKey: "workerId" });
Worker.hasMany(Absence, { as: "absence", foreignKey: "workerId" });
Worker.hasMany(Basics, { as: "basics", foreignKey: "workerId" });
Worker.hasMany(Borrow, { as: "borrows", foreignKey: "workerId" });
Worker.hasMany(Reward, { as: "rewards", foreignKey: "workerId" });

Worker.hasMany(InstallingFee, { as: "installingFees", foreignKey: "workerId" });
Worker.hasMany(SellingFee, { as: "sellingFees", foreignKey: "workerId" });

Worker.hasMany(Customer, { as: "m1", foreignKey: "m1Id" });
Worker.hasMany(Customer, { as: "m2", foreignKey: "m2Id" });
Worker.hasMany(Customer, { as: "m3", foreignKey: "m3Id" });
Worker.hasMany(Customer, { as: "f1", foreignKey: "f1Id" });
Worker.hasMany(Customer, { as: "f2", foreignKey: "f2Id" });
Worker.hasMany(Customer, { as: "f3", foreignKey: "f3Id" });

Penalty.belongsTo(Worker, { as: "worker" });
Absence.belongsTo(Worker, { as: "worker" });
Basics.belongsTo(Worker, { as: "worker" });
Borrow.belongsTo(Worker, { as: "worker" });
Reward.belongsTo(Worker, { as: "worker" });
Loan.belongsTo(Worker, { as: "worker" });
Order.belongsTo(Worker, { as: "worker" });

InstallingFee.belongsTo(Worker, { as: "worker" });
SellingFee.belongsTo(Worker, { as: "worker" });
InstallingFee.belongsTo(Customer, { as: "customer" });
SellingFee.belongsTo(Customer, { as: "customer" });

Installment.belongsTo(Customer, { as: "customer" });
Order.hasMany(Installment, { as: "installments", foreignKey: "orderId" });
Customer.hasMany(Installment, { as: "installments", foreignKey: "customerId" });
Customer.belongsTo(Worker, { as: "m1" });
Customer.belongsTo(Worker, { as: "m2" });
Customer.belongsTo(Worker, { as: "m3" });
Customer.belongsTo(Worker, { as: "f1" });
Customer.belongsTo(Worker, { as: "f2" });
Customer.belongsTo(Worker, { as: "f3" });
export default Worker;
