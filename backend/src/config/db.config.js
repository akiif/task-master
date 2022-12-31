require("dotenv").config();
const mongoose = require("mongoose");

const username = process.env.DB_USER_NAME;
const password = process.env.DB_PASSWORD;
const cluster = process.env.DB_CLUSTER;

// const url = "mongodb://0.0.0.0/taskMasterDB";
const url = `mongodb+srv://${username}:${password}@${cluster}/taskMasterDB`;

mongoose.set('strictQuery', true);

const connectDB = async () => {
  try {
    return await mongoose.connect(url).then((mongoConnection) => {
      console.log("MongoDB is Connected...");
      return mongoConnection.connection.getClient();
    }); 
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;