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
            $set: {...data,
            "updatedAt":new Date()}
            
        },
    )
    return updateResult
}

exports.deleteProduct=async(id)=>{
    const Connection=await this.getConnection()
    const deleteResult=await Connection.deleteOne({
        _id: new ObjectId(id)
    })
    return deleteResult.deletedCount > 0;
    } 
