import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { tokenKey } from "../../database/config.js";
import logger from "./logger.js";

export const salt = 12;
export const compareData = async (data, hashWord) => {
  try {
    const match = await bcrypt.compare(data, hashWord);
    return match;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return false;
  }
};
export const generateToken = (data, guard = "user") => {
  return jwt.sign({ data, guard }, tokenKey, { expiresIn: "7days" });
};

export const generateSignUpToken = (data) => {
  return jwt.sign(data, tokenKey, { expiresIn: "7days" });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, tokenKey);
  } catch (error) {
    logger.info(error);
    return false;
  }
};

export const getTokenFromHeader = () => {
  const token = req.headers["authorization"]?.split(" ")[1];
};

export const generateResetToken = (user) => {
  return jwt.sign({ id: user.id }, tokenKey, { expiresIn: "10m" });
};
