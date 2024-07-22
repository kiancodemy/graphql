import jwt from "jsonwebtoken";
import { User } from "../models/usermodel.js";

export async function LoginVerify(req, res, next) {
  const token = req.cookies.jwt || "";

  try {
    if (!token) {
      throw new Error("you are not login");
    }

    const user = jwt.verify(token, process.env.SECRET);

    req.user = await User.findById(user.id);
  } catch (err) {
    throw new Error(err.message);
  }
}
