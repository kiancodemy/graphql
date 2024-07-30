import jwt from "jsonwebtoken";
import { User } from "../models/usermodel.js";

export async function LoginVerify(req) {
  const token = (await req.cookies.jwt) || "";

  try {
    if (!token) {
      throw new Error("you are not login");
    }

    const users = await jwt.verify(token, process.env.SECRET);

    const user = await User.findById(users.id);

    if (!user._id) {
      throw new Error("you are not login");
    } else {
      return user;
    }
  } catch (err) {
    throw new Error(err.message);
  }
}
