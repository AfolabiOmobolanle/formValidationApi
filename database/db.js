import { Sequelize } from "sequelize";
import logger from "../src/services/logger.js";
import { DB_CONFIG } from "./config.js";

const sequelize = new Sequelize(DB_CONFIG);

try {
  await sequelize.authenticate();
} catch (error) {
  logger.error(error);
}

export default sequelize;
