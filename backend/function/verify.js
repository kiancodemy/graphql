import jwt from "jsonwebtoken";
import { User } from "../models/usermodel.js";

export async function LoginVerify(req) {
  const token = req.cookies.jwt || "";

  try {
    if (!token) {
      throw new Error("you are not login");
    }

    const users = await jwt.verify(token, process.env.SECRET);

    const { _id } = await User.findById(users.id);
    if (!_id) {
      throw new Error("you are not login");
    } else {
      return _id;
    }
  } catch (err) {
    throw new Error(err.message);
  }
}
