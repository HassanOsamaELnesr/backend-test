require('dotenv').config();
const { ObjectId } = require("mongodb");


exports.getConnection = async () => {
    try {
        const MongoClient = require("mongodb").MongoClient;
        const uri = process.env.MONGO_URI;
        const connect = await new MongoClient(uri).connect();
        const backend = connect.db("backendTest");
        const ProductsCollection = await backend.collection("Products");
        return ProductsCollection;
    } catch (error) {
        console.error("Database connection error:", error);
        throw new Error("Database connection failed");
    }
};


exports.addProducts = async (name, category, price, quantity) => {
    const Connection = await this.getConnection()
    const productResult = await Connection.insertOne({
        "name": name,
        "category": category,
        "price": price,
        "quantity": quantity,
        "createdAt": new Date()
    })
    return productResult
}

exports.getProducts = async () => {
    const Connection = await this.getConnection()
     const productResult = await Connection.find({}).toArray()
     console.log(productResult)
     return productResult
}

exports.getOneProduct = async (id) => {
    const Connection = await this.getConnection()
    const productResult = await Connection.findOne({
        _id: new ObjectId(id)
    })
    return productResult

}


exports.updateProduct = async (id, data) => {
    const Connection = await this.getConnection()
    const updateResult = await Connection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
            $set: {
                ...data,
                "updatedAt": new Date()
            }

        },
    )
    return updateResult
}

exports.deleteProduct = async (id) => {
    const Connection = await this.getConnection()
    const deleteResult = await Connection.deleteOne({
        _id: new ObjectId(id)
    })
    return deleteResult.deletedCount > 0;
}


//Challenge 2

exports.getProductsQuery = async (page = 1) => {
    const Connection = await this.getConnection();
    const products = await Connection.find({
        price: { $gte: 50, $lte: 200 } 
    })
        .sort({ price: 1 })  
        .skip((page - 1) * 10) 
        .limit(10)
        .toArray();

    return products;
}



exports.getProductsByCategory = async (category, page = 1) => {
    const Connection = await this.getConnection();
    await Connection.createIndex({category: 1})
    await Connection.createIndex({price: -1})
    const products = await Connection.find({
        category: category  
    })
        .sort({ price: -1 })  
        .skip((page - 1) * 5)  
        .limit(5)  
        .toArray();

    console.log(products)
    return products;
};