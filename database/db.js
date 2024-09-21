import { Sequelize } from "sequelize";
import logger from "../src/services/logger.js";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Set up Sequelize connection
const sequelize = new Sequelize(
  process.env.MYSQL_ADDON_DB, // Database name
  process.env.MYSQL_ADDON_USER, // Username
  process.env.MYSQL_ADDON_PASSWORD, // Password
  {
    host: process.env.MYSQL_ADDON_HOST, // Host
    port: process.env.MYSQL_ADDON_PORT || 3306, // Port, default to 3306 if not provided
    dialect: "mysql", // Specify the dialect
    logging: false, // Disable SQL query logging (optional)
  }
);

// Test the connection inside an async function
(async () => {
  try {
    await sequelize.authenticate(); // Test the connection
    console.log("Connection has been established successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
  }
})();

export default sequelize;
