import dotenv from "dotenv";

dotenv.config();
export const env = process.env;

export const tokenKey = process.env.TOKEN_KEY || "mysecretismyBeauty#.6";
export const DB_CONFIG = {
  host: process.env.MYSQL_ADDON_HOST,
  database: process.env.MYSQL_ADDON_DB,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  port: process.env.MYSQL_ADDON_PORT || 3306,
};
