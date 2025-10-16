import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      default: null,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin", "super_admin"],
      default: "user",
      required: true,
    },

    active: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const UserSchema = mongoose.model("User", userSchema);
export default UserSchema;
