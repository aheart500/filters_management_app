import db from "../MySQL";
import { Optional, DataTypes, ModelDefined } from "sequelize";
import Worker from "./Worker";

export interface BasicsAttributes {
  id: number;
  month: number;
  year: number;
  notes: string;
  price: number;
  workerId: number;
}

export interface BasicsCreationAttributes
  extends Optional<BasicsAttributes, "id"> {}
const Basics: ModelDefined<
  BasicsAttributes,
  BasicsCreationAttributes
> = db.define(
  "Basics",
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

Basics.belongsTo(Worker, { as: "worker" });
export default Basics;
