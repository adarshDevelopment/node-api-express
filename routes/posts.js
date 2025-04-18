import express from "express";
// import { index } from "../controllers/postController";
import * as postController from "../controllers/postController.js";
import{index,store,show,update,destroy} from "../controllers/postController.js";

const router = express.Router();

router.get('/', postController.index);
router.post('/', postController.store);
router.get('/:postId', postController.show);
router.put('/:postId', postController.update);
router.delete('/', postController.destroy);

export default router;