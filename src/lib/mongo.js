import mongoose from "mongoose";

export async function dbConnect() {
  try {
    let conn = await mongoose.connect(String(process.env.MONGO_URI));
    return conn;
  } catch (e) {
    throw new Error(e);
  }
}
