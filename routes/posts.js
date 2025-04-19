import express from "express";
// import { index } from "../controllers/postController";
import * as postController from "../controllers/postController.js";
import { index, store, show, update, destroy } from "../controllers/postController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', postController.index);
router.post('/', auth, postController.store);
router.get('/:id', postController.show);
router.put('/:id', postController.update);
router.delete('/', postController.destroy);

export default router;