import { Request, Response } from "express";
import UserSchema from "../models/user.model";
import { hashPassword } from "../utils/bycrypt";

/**
 * Automatically creates a default admin account
 * when the server starts (only if one doesn't exist).
 */
export const seedAdminAccount = async () => {
  try {
    // Check if an admin account already exists
    const existingAdmin = await UserSchema.findOne({
      $or: [
        { role: "admin" },
        { role: "super_admin" },
        { email: process.env.SEED_ADMIN_EMAIL },
      ],
    });

    // If found, skip creation
    if (existingAdmin) {
      console.log("✅ Admin account already exists.");
      return;
    }

    // Hash the default password for security
    const hashedPassword = await hashPassword(
      `${process.env.SEED_ADMIN_PASSWORD}`
    );

    // Create a new admin account with default credentials
    const admin = new UserSchema({
      fullname: process.env.SEED_ADMIN_FULLNAME,
      email: process.env.SEED_ADMIN_EMAIL,
      phone: process.env.SEED_ADMIN_PHONE,
      password: hashedPassword,
      role: "super_admin",
      active: true,
    });

    // Save the admin to the database
    await admin.save();
    console.log("✅ Admin account created successfully.");
  } catch (error) {
    console.log("❌ Failed to seed admin account: ", error);
  }
};

export const createAdminAccount = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password, role } = req.body;

    if (!fullname || !email || !password || !role) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const existingUser = await UserSchema.findOne({ email });

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
      password: hashedPassword,
      role,
      active: false,
    });

    res.status(201).json({
      success: true,
      message: "Admin account created successfully!",
      data: newUser,
    });
    return;
  } catch (error) {
    console.error("Failed to create admin account", error);
    res.status(500).json({ message: "Failed to create  dmin account" });
    return;
  }
};

export const getAllAdminAccount = async (req: Request, res: Response) => {
  try {
    // Find only users with role = 'admin and super_admin', excluding passwords
    const admins = await UserSchema.find({
      role: { $in: ["admin", "super_admin"] },
    }).select("-password -__v");

    return res.status(200).json({
      success: true,
      count: admins.length,
      data: admins,
    });
  } catch (error) {
    console.error("Failed fetchings admins", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch admins",
      error: error,
    });
  }
};
