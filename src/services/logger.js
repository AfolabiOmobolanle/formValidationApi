import winston from "winston";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const fileSize = 5 * 1024 * 1024;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const loggerDIr = path.join(__dirname, "../../storage/logs");
if (!fs.existsSync(loggerDIr)) fs.mkdirSync(loggerDIr, { recursive: true });

const today = new Date();
const formattedDate = today.toISOString().slice(0, 10);

const logFileName = `${formattedDate}-logger.log`;

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, stack }) => {
      return stack
        ? `[${timestamp}] ${level}: ${stack}`
        : `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(loggerDIr, logFileName),
      maxsize: fileSize,
      maxFiles: 10,
    }),
  ],
});

export default logger;
