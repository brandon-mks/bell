import express from "express";
const router = express.Router();

import { usersRouter } from "./users.js";
import { recipesRouter } from "./recipes.js";

//define api routes here
router.use("/users", usersRouter);
router.use("/recipes", recipesRouter);

export default router;
