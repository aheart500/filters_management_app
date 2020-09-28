import db from "../MySQL";
import { Optional, DataTypes, ModelDefined } from "sequelize";
import Worker from "./Worker";
export interface CustomerAttributes {
  id: number;
  name: string;
  phone: string;
  city: string;
  state: string;
  address: string;
  payment_type: string;
  load_date: string;
  installment_price: number;
  forward_payment: number;
  total_price: number;
  installments_number: number;
  notes: string;
  m1: number;
  m2: number;
  m3: number;
  f1: number;
  f2: number;
  f3: number;
}

export interface CustomerCreationAttributes
  extends Optional<CustomerAttributes, "id"> {}
const Customer: ModelDefined<
  CustomerAttributes,
  CustomerCreationAttributes
> = db.define(
  "Customer",
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
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.TEXT({ length: "medium" }),
    },
    payment_type: {
      type: DataTypes.STRING,
    },
    load_date: {
      type: DataTypes.STRING,
    },
    installment_price: {
      type: DataTypes.INTEGER,
    },
    forward_payment: {
      type: DataTypes.INTEGER,
    },
    total_price: {
      type: DataTypes.INTEGER,
    },
    installments_number: {
      type: DataTypes.INTEGER,
    },
    notes: {
      type: DataTypes.TEXT({ length: "long" }),
    },
  },
  {
    timestamps: false,
  }
);
Customer.belongsTo(Worker, { as: "m1" });
Customer.belongsTo(Worker, { as: "m2" });
Customer.belongsTo(Worker, { as: "m3" });
Customer.belongsTo(Worker, { as: "f1" });
Customer.belongsTo(Worker, { as: "f2" });
Customer.belongsTo(Worker, { as: "f3" });

export default Customer;
