import mongoose from 'mongoose';

const todoSchema = mongoose.Schema({
    user : {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    todoItem : {type:String},
    isMarked:{type:Boolean},
    image:{type:String}
},
    {timestamps:true}
)
const Todo = mongoose.model('Todo' , todoSchema);

export default Todo;