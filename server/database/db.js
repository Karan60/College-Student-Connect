import mongoose from "mongoose";

const Connection = async () => {
  const URL = `mongodb://karan60:karannath889@college-student-connect-shard-00-00.vvm3r.mongodb.net:27017,college-student-connect-shard-00-01.vvm3r.mongodb.net:27017,college-student-connect-shard-00-02.vvm3r.mongodb.net:27017/?ssl=true&replicaSet=atlas-sfpa42-shard-0&authSource=admin&retryWrites=true&w=majority&appName=college-student-connect`;
  try {
    await mongoose.connect(URL);
    console.log("database connected succesfully");
  } catch (error) {
    console.log("error while connecting with the database", error);
  }
};

export default Connection;
