import UserSchema from "../../models/user.model";
import { hashPassword } from "../../utils/bycrypt";

/**
 * Automatically creates a default admin account
 * when the server starts (only if one doesn't exist).
 */
export const seedAdminAccount = async () => {
  try {
    // Check if an admin account already exists
    const existingAdmin = await UserSchema.findOne({ role: "admin" });

    // If found, skip creation
    if (existingAdmin) {
      console.log("✅ Admin account already exists.");
      return;
    }

    // Hash the default password for security
    const hashedPassword = await hashPassword(`${process.env.SEED_ADMIN_PASSWORD}`);

    // Create a new admin account with default credentials
    const admin = new UserSchema({
      fullname: process.env.SEED_ADMIN_FULLNAME,
      email: process.env.SEED_ADMIN_EMAIL,
      phone: process.env.SEED_ADMIN_PHONE,
      password: hashedPassword,
      role: "admin",
    });

    // Save the admin to the database
    await admin.save();
    console.log("✅ Admin account created successfully.");
  } catch (error) {
    console.log("❌ Failed to seed admin account: ", error);
  }
};
