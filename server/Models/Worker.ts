import db from "../MySQL";
import { Optional, DataTypes, ModelDefined } from "sequelize";

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
export default Worker;
