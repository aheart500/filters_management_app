import db from "../MySQL";
import { Optional, DataTypes, ModelDefined } from "sequelize";
import { WorkerAttributes } from "./Worker";
import { CustomerAttributes } from "./Customer";

export interface InstallingFeeAttributes {
  id: number;
  month: number;
  year: number;
  numberOfWorkers: number;
  workerRatio: number;
  workerId: number;
  customerId: number;
  worker: WorkerAttributes;
  customer: CustomerAttributes;
  price: number;
  notes: string;
}

export interface InstalligFeeCreationAttributes
  extends Optional<InstallingFeeAttributes, "id"> {}
const InstallingFee: ModelDefined<
  InstallingFeeAttributes,
  InstalligFeeCreationAttributes
> = db.define(
  "InstallingFee",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    month: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    numberOfWorkers: DataTypes.INTEGER,
    workerRatio: DataTypes.FLOAT,
    price: DataTypes.FLOAT,
    notes: DataTypes.TEXT({ length: "long" }),
  },
  { timestamps: false }
);

export default InstallingFee;
