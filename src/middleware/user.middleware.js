import { tokenKey } from "../../database/config.js";
import suftResp from "../../utils/response.js";
import HttpCode from "../../utils/statusCode.js";
import jwt from "jsonwebtoken";
import logger from "../services/logger.js";

const userMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return suftResp(res, {
      message: "Unauthenticated: Bearer token is missing or malformed.",
      code: HttpCode.forbidden,
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const user = jwt.verify(token, tokenKey);
    req.user = user?.data || user;
    next();
  } catch (err) {
    logger.error(err);
    return suftResp(res, {
      message: "Unauthenticated: Token is invalid or expired.",
      code: HttpCode.forbidden,
    });
  }
};

export default userMiddleware;
