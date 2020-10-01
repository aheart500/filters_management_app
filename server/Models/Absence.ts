import db from "../MySQL";
import { Optional, DataTypes, ModelDefined } from "sequelize";

export interface AbsenceAttributes {
  id: number;
  absence_days: number;
  late_days: number;
  total_days: number;
  month: number;
  year: number;
  notes: string;
  price: number;
  workerId: number;
}

export interface AbsenceCreationAttributes
  extends Optional<AbsenceAttributes, "id"> {}
const Absence: ModelDefined<
  AbsenceAttributes,
  AbsenceCreationAttributes
> = db.define(
  "Absence",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    absence_days: {
      type: DataTypes.INTEGER,
    },
    late_days: {
      type: DataTypes.INTEGER,
    },
    total_days: {
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

export default Absence;
