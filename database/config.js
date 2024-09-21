import dotenv from "dotenv";
dotenv.config();

export const env = process.env;
export const tokenKey = env.TOKEN_KEY || "mysecretismyBeauty#.6";
export const DB_CONFIG = {
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  dialect: "mysql",
};
