import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";

mysql
  .createConnection({
    user: "root",
    password: "@Aa01149707289",
  })
  .then((connection) => {
    connection.query("CREATE DATABASE IF NOT EXISTS filters_management;");
  });

const db = new Sequelize("filters_management", "root", "@Aa01149707289", {
  host: "localhost",
  dialect: "mysql",
  define: {
    charset: "utf8",
    collate: "utf8_general_ci",
  },
  logging: console.log,
});

/* db.sync(); */
/* db.sync({ force: true }); */
export default db;
