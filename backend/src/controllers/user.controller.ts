import { Request, Response } from "express";
import UserSchema from "../models/user.model";
import { hashPassword, comparePassword } from "../utils/bycrypt";

export const getAllUserAccount = async (req: Request, res: Response) => {
  try {
    // Find only users with role = 'user', excluding passwords
    const users = await UserSchema.find({ role: "user" }).select(
      "-password -__v"
    );

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Failed fetchings users", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error,
    });
  }
};

export const createUserAccount = async (req: Request, res: Response) => {
  try {
    const { fullname, email, phone, password } = req.body;
    console.log("sdfsdfsdfds");

    if (!fullname || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
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
      return res
        .status(400)
        .json({ success: false, message: "email and password are required." });
    }

    const user = await UserSchema.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Account not found" });
    }

    if (!(await comparePassword(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    user.active = true;
    user.save();

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

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User id is required",
      });
    }

    const deletedUser = await UserSchema.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found or already deleted",
      });
    }

    return res.status(200).json({
      success: true,
      message: `User account for "${deletedUser.fullname}" has been deleted successfully.`,
    });
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the user account",
      error: error.message,
    });
  }
};
