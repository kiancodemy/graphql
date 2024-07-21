import mongoose from "mongoose";
export const connecter = async () => {
  try {
    await mongoose.connect(process.env.MONGOURL);
    console.log("it is connected");
  } catch {
    console.log("not connected");
  }
};
