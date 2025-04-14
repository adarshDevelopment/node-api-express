import express from "express";
// import { index } from "../controllers/postController";
import * as postController from "../controllers/postController.js";

const router = express.Router();

export default router.get('/', postController.index);