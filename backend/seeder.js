import mongoose from "mongoose";
import dotenv from "dotenv";

import users from "./data/users.js";
import todos from "./data/todos.js";
import User from "./models/userModel.js";
import Todo from "./models/todoModal.js";

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Todo.deleteMany();
    await User.deleteMany();

    const createdUser = await User.insertMany(users);
    const adminUser = createdUser[0]._id;

    const sampleTodos = todos.map((product) => {
      return { ...product, user: adminUser };
    });

    await Todo.insertMany(sampleTodos);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Todo.deleteMany();
    await User.deleteMany();
    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
