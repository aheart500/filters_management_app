import db from "../MySQL";
import { Optional, DataTypes, ModelDefined } from "sequelize";
import { CustomerAttributes } from "./Customer";

export interface InstallmentAttributes {
  id: number;
  month: number;
  year: number;
  fixed: boolean;
  paid: boolean;
  customerId: number;
  customer: CustomerAttributes;
}

export interface InstallmentCreationAttributes
  extends Optional<InstallmentAttributes, "id"> {}
const Installment: ModelDefined<
  InstallmentAttributes,
  InstallmentCreationAttributes
> = db.define(
  "Installment",
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
    year: {
      type: DataTypes.INTEGER,
    },
    fixed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: false }
);

export default Installment;
