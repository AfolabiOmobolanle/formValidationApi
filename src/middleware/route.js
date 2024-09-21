import express from "express";

const router = express.Router();
export const route = router.use((req, res, next) => {
  next();
});
