import { Request, Response } from "express";
import UserSchema from "../models/user.model";
import { hashPassword, comparePassword } from "../utils/bycrypt";

export const createUserAccount = async (req: Request, res: Response) => {
  try {
    const { fullname, email, phone, password } = req.body;
    console.log("sdfsdfsdfds");

    if (!fullname || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const existingUser = await UserSchema.findOne({
      $or: [{ fullname }, { email }],
    });

    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "Account already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await UserSchema.create({
      fullname,
      email,
      phone,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully!",
      data: newUser,
    });
    return;
  } catch (error) {
    console.error("Failed to create account", error);
    res.status(500).json({ message: "Failed to create account" });
    return;
  }
};

export const loginAccount = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "email and password are required." });
    }

    const user = await UserSchema.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "Account not found" });
    }

    if (!(await comparePassword(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    return res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      data: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Login error", error);
    return res.status(500).json({ message: "Failed to login user" });
  }
};
