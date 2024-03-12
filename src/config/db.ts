import { Sequelize } from "sequelize";

const databaseHost = process.env.DB_HOST || "";
const databaseName = process.env.DB_NAME || "";
const databaseUser = process.env.DB_USER || "";
const databasePassword = process.env.DB_PASS || "";

const sequelize = new Sequelize(databaseName, databaseUser, databasePassword, {
  host: databaseHost,
  dialect: "mysql",
});

const db = sequelize;

export default db;

