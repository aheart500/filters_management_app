/* import db from "../MySQL";
import { Optional, DataTypes, ModelDefined } from "sequelize";
import { WorkerAttributes } from "./Worker";

export interface LoanAttributes {
  id: number;
  month: number;
  year: number;
  notes: string;
  price: number;
  workerId: number;
  worker: WorkerAttributes;
}

export interface LoanCreationAttributes
  extends Optional<LoanAttributes, "id"> {}
const Loan: ModelDefined<LoanAttributes, LoanCreationAttributes> = db.define(
  "Loan",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    month: {
      type: DataTypes.INTEGER,
    },
    notes: {
      type: DataTypes.TEXT({ length: "long" }),
    },
    year: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.FLOAT,
    },
  },
  { timestamps: false }
);

export default Loan;
 */
export const h = "gg";
