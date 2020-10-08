import db from "../MySQL";
import { Optional, DataTypes, ModelDefined } from "sequelize";
import { WorkerAttributes } from "./Worker";
import { InstallmentAttributes } from "./Installment";
import { FixAttributes } from "./Fix";

export interface OrderAttributes {
  id: number;
  city: string;
  day: string;
  month: string;
  year: number;
  installments: InstallmentAttributes[];
  fixes: FixAttributes[];
  notes: string;
  workerId: number;
  worker: WorkerAttributes;
}

export type OrderModel = ModelDefined<
  OrderAttributes,
  Optional<OrderAttributes, "id">
>;
const Order: OrderModel = db.define(
  "Order",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    day: DataTypes.STRING,
    month: DataTypes.STRING,
    year: DataTypes.INTEGER,
    city: DataTypes.STRING,
    notes: DataTypes.TEXT({ length: "long" }),
  },
  { timestamps: false }
);

export default Order;
