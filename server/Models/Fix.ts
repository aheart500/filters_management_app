import db from "../MySQL";
import { Optional, DataTypes, ModelDefined } from "sequelize";
import { CustomerAttributes } from "./Customer";

export interface FixAttributes {
  id: number;
  month: string;
  year: number;
  done: boolean;
  customer: CustomerAttributes;
  customerId: number;
  price: number;
}

export type FixModel = ModelDefined<
  FixAttributes,
  Optional<FixAttributes, "id">
>;
const Fix: FixModel = db.define(
  "Fix",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    month: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    done: DataTypes.BOOLEAN,
    price: DataTypes.FLOAT,
  },
  { timestamps: false }
);

export default Fix;
