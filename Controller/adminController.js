const { validationResult} = require('express-validator'); 
const AdminModel = require("../Model/adminModel");


exports.addProducts=async(req,res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
       
        const product = await AdminModel.addProducts(req.body.name,req.body.category,req.body.price,req.body.quantity);

        res.status(201).json({ message: "Property added successfully", product });
    } catch (error) {
        console.error("Error adding property:", error);
        res.status(500).json({ error: "Failed to add property" });
    }
}

exports.getProducts=async(request,response)=>{
    try{
        const Products=await AdminModel.getProducts()
        response.status(200).json(Products);
    }catch(error){
        response.status(500).json({ error: error.message || 'Internal server error' });
    }


}

exports.getOneProduct=async(request,response)=>{
    try{
        const Products=await AdminModel.getOneProduct(request.params.id)
        response.status(200).json(Products);
    }catch(error){
        response.status(500).json({ error: error.message || 'Internal server error' });
    }

}

exports.updateProduct = async (request, response) => {
    try {
        
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({
                errors: errors.array()
            });
        }

        const updateProduct = await AdminModel.updateProduct(request.params.id, request.body);
        
        if (!updateProduct) {
            return response.status(404).json({ error: 'Product not found' });
        }

        response.status(200).json({ message: 'Product updated successfully', product: updateProduct });

    } catch (error) {
        response.status(500).json({ error: error.message || 'Internal server error' });
    }
};

exports.deleteProduct = async (request, response) => {
    try {
        const id = request.params.id
        const deleteProduct = await AdminModel.deleteProduct(id)
        if (!deleteProduct) {
            return response.status(404).json({ error: 'Product not found' });
        }

        response.status(200).json({ message: 'Product deleted successfully' });

    } catch (error) {
        response.status(500).json({ error: error.message || 'Internal server error' });
    }

}


//challenge 2

exports.getProductsQuery=async(request,response)=>{
    try{
     const page = parseInt(request.query.page) || 1;
        const Products=await AdminModel.getProductsQuery(page)
        response.status(200).json(Products);
    }catch(error){
        response.status(500).json({ error: error.message || 'Internal server error' });
    }


}



exports.getProductsByCategory = async(req,res)=>{
    const {category} =req.params
    const {page}= req.query
    try {
        const products = await AdminModel.getProductsByCategory(category, page);
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found for this category' });
        }

        res.status(200).json({ products });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
}