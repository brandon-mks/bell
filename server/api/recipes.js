import express from "express";

export const recipesRouter = express.Router();

recipesRouter.post("/", async (req, res, next) => {
    if(!req.body) {
        res.status(400).send("Please include all information required to create a recipe.");
    } 
})