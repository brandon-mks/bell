import express from "express";
export const usersRouter = express.Router();

usersRouter.get("/", async (req, res, next) => {
  res.send("inside of GET /api/users route!");
});

