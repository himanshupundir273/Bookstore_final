import mongoose from "mongoose";

const dbconnect = (url) => {
  return mongoose.connect(url);
};

export default dbconnect;
