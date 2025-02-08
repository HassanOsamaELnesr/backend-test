const express = require('express');
const adminRouter = express.Router();
const AdminController = require("../Controller/adminController");
const schema=require("../Schemas/allSchemas")
const middleWare=require("../MiddleWare/auth")


adminRouter.post("/add", middleWare.verifyToken, middleWare.checkRole('Admin'), schema.productsSchema ,AdminController.addProducts)
adminRouter.get("/listAll",middleWare.verifyToken, middleWare.checkRole('Admin'),AdminController.getProducts)
adminRouter.get("/getOne/:id",middleWare.verifyToken, middleWare.checkRole('Admin'),AdminController.getOneProduct)
adminRouter.put("/update/:id", middleWare.verifyToken, middleWare.checkRole('Admin'), schema.productsSchema ,AdminController.updateProduct)
adminRouter.delete("/delete/:id",middleWare.verifyToken, middleWare.checkRole('Admin'),AdminController.deleteProduct)

//challenge 2
adminRouter.get("/Query",middleWare.verifyToken, middleWare.checkRole('Admin'),AdminController.getProductsQuery)
adminRouter.get("/getByCategory/:category",middleWare.verifyToken, middleWare.checkRole('Admin'),AdminController.getProductsByCategory)

module.exports=adminRouter