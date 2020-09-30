import db from "../MySQL";
import { Optional, DataTypes, ModelDefined } from "sequelize";
import Worker from "./Worker";

export interface PenaltyAttributes {
  id: number;
  days: number;
  month: number;
  year: number;
  notes: string;
  price: number;
  workerId: number;
}

export interface PenaltyCreationAttributes
  extends Optional<PenaltyAttributes, "id"> {}
const Penalty: ModelDefined<
  PenaltyAttributes,
  PenaltyCreationAttributes
> = db.define(
  "Penalty",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    days: {
      type: DataTypes.INTEGER,
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

Penalty.belongsTo(Worker, { as: "worker" });
export default Penalty;
