import { DataTypes, Model } from "sequelize";
import sequelize from "../../database/db.js";
import { salt } from "../services/hash.js";
import logger from "../services/logger.js";
import { hash } from "bcrypt";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    fullName: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: "email",
        msg: "User already exists with this email.",
      },
      validate: {
        isEmail: {
          args: true,
          msg: "Please enter a valid email address.",
        },
      },
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    email_verified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    verification_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
          msg: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.",
        },
      },
      allowNull: false,
    },

    signup_method: {
      type: DataTypes.STRING,
      defaultValue: "manual",
    },
  },
  { sequelize, timestamps: true, tableName: "users", paranoid: true }
);

User.beforeCreate(async (user, option) => {
  const password = await hash(user.password.toString(), salt);
  user.password = password;
});

User.beforeUpdate(async (user, option) => {
  if (user.password) {
    logger.info(user.password);
    const password = await hash(user.password.toString(), salt);
    user.password = password;
  }
});

export default User;
