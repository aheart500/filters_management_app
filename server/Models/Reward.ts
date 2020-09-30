import db from "../MySQL";
import { Optional, DataTypes, ModelDefined } from "sequelize";
import Worker from "./Worker";

export interface RewardAttributes {
  id: number;
  month: number;
  year: number;
  notes: string;
  price: number;
  workerId: number;
}

export interface RewardCreationAttributes
  extends Optional<RewardAttributes, "id"> {}
const Reward: ModelDefined<
  RewardAttributes,
  RewardCreationAttributes
> = db.define(
  "Reward",
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

Reward.belongsTo(Worker, { as: "worker" });
export default Reward;
