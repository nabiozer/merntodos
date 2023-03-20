import express from 'express';

const router = express.Router();

import {protect} from '../middleware/authMiddleware.js'
import {getTodos,getTodoById ,deleteTodo ,updateTodo ,createTodo} from '../controllers/todoController.js'

router.route('/').get(protect,getTodos).post(protect,createTodo);

router.route('/:id')
.get(protect,getTodoById)
.delete(protect,deleteTodo)
.put(protect,updateTodo);

export default router;