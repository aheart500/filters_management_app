import db from "../MySQL";
import { Optional, DataTypes, ModelDefined } from "sequelize";
import Worker from "./Worker";

export interface BorrowAttributes {
  id: number;
  month: number;
  year: number;
  notes: string;
  price: number;
  workerId: number;
}

export interface BorrowCreationAttributes
  extends Optional<BorrowAttributes, "id"> {}
const Borrow: ModelDefined<
  BorrowAttributes,
  BorrowCreationAttributes
> = db.define(
  "Borrow",
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

Borrow.belongsTo(Worker, { as: "worker" });
export default Borrow;
