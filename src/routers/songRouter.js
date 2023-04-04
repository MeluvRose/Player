import express from "express";
import { getUpload, postUpload, playing } from "../controllers/songController";

const songRouter = express.Router();

songRouter.get("/:id([0-9a-f]{24})", playing);
songRouter.route("/upload").get(getUpload).post(postUpload);

export default songRouter;
