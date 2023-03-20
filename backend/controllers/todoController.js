import asyncHandler from 'express-async-handler';
import Todo from '../models/todoModal.js';

// @description Fetch all todos
// @route  GET /api/todos
// @acces Public
const getTodos = asyncHandler (async (req,res) => {
    const todos = await Todo.find({user:req.user._id})
    res.json(todos);

})
// @description Fetch single todos
// @route  GET /api/todos/:id
// @acces   Public
const getTodoById = asyncHandler (async (req,res) => {

    const todo = await Todo.findById(req.params.id);
    if(todo) {
        res.json(todo)
    } 
    else{
        res.status(404)
        throw new Error('Product not found')
    }

})

// @description Delete product
// @route  Delete /api/todos/:id
// @acces   Private

const deleteTodo = asyncHandler (async (req,res) => {
    const todo = await Todo.findById(req.params.id)
    if(todo) {
        await todo.deleteOne()
        res.json({message:'todo deleted'})
    } else {
        res.status(404)
        throw new Error('todo not found')
    }   
})



// @description Create product
// @route  POST /api/todos
// @acces   Private/Admin

const createTodo = asyncHandler (async (req,res) => {

    const {todoItem,image,isMarked} = req.body;
    const todo = new Todo({
        user:req.user._id,
        todoItem,
        image,
        isMarked
    })

    const createdTodo= await todo.save()
    res.status(201).json(createdTodo)

   
})

// @description Update product
// @route  Put /api/todos/:id
// @acces   Private/Admin

const updateTodo = asyncHandler (async (req,res) => {

    const {
        todoItem,isMarked,image
    } = req.body

    const todo = await Todo.findById(req.params.id)
    if(todo) {
      
        todo.todoItem = todoItem;
        todo.isMarked = isMarked;
        todo.image = image;
    

        const updatedTodo = await todo.save()
        res.status(201).json(updatedTodo)
    } else {
        res.status(404)
        throw new Error('todo not found')
    }
  

   
})

export {getTodos, getTodoById , deleteTodo , createTodo,updateTodo}