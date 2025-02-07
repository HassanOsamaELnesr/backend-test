require('dotenv').config();

exports.getConnection = async () => {
    try {
      const MongoClient = require("mongodb").MongoClient;
      const uri = process.env.MONGO_URI;
      const connect = await new MongoClient(uri).connect();
      const backend = connect.db("backendTest");
      const UsersCollection = await backend.collection("Users");
      return UsersCollection;
    } catch (error) {
      console.error("Database connection error:", error);
      throw new Error("Database connection failed");
    }
  };


  exports.SignIn = async (email, password) => {
    const Connection = await this.getConnection();
    const user = await Connection.findOne({ Email: email, Password: password});
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  };