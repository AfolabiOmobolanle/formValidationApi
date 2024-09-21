import formResp from "../../utils/response.js";
import User from "../models/user.model.js";
import HttpCode from "../../utils/statusCode.js";
import { generateToken, compareData } from "../services/hash.js";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return formResp(res, {
        message: "User already exists. Please login instead.",
        code: HttpCode.not_allowed,
      });
    }

    const newUser = await User.create({
      fullName,
      email,
      password,
    });

    return formResp(res, {
      message: "Signup successful. You are now logged in.",
      code: HttpCode.ok,
      newUser,
    });
  } catch (error) {
    console.error("Error in signup:", error);
    return formResp(res, {
      code: HttpCode.not_allowed,
      message: "An error occurred during signup.",
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      return formResp(res, {
        message: "Invalid email or password.",
        code: HttpCode.unauthorized,
      });
    }

    const isPasswordValid = await compareData(password, existingUser.password);

    if (!isPasswordValid) {
      return formResp(res, {
        message: "Invalid email or password.",
        code: HttpCode.unauthorized,
      });
    }

    // Generate a token for the existing user
    const token = generateToken({
      id: existingUser.id,
      email: existingUser.email,
    });

    return formResp(res, {
      message: "Login successful.",
      code: HttpCode.ok,
      token,
    });
  } catch (error) {
    console.error("Error in login:", error);
    return formResp(res, {
      code: HttpCode.not_allowed,
      message: "An error occurred during login.",
    });
  }
};
