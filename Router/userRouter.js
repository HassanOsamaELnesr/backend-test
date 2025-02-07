const express = require('express');
const UserRouter = express.Router();
const UserController = require("../Controller/userController");
const schema=require("../Schemas/allSchemas")


UserRouter.post("/login",schema.LoginSchema, UserController.SingIn);

module.exports = UserRouter;
