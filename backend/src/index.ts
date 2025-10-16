import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectToMongoDB from "./db/db.connect";

import { seedAdminAccount } from "./controllers/admin.controller";

import userRoutes from "./routes/user.route";
import adminRoutes from "./routes/admin.route";
import activityRoutes from "./routes/activity.route";

dotenv.config();

const PORT = Number.parseInt(process.env.PORT as string) || 5000;
const app = express();

const origins = process.env.CORS_ORIGINS
  ? JSON.parse(process.env.CORS_ORIGINS)
  : [];
app.use(
  cors({
    origin: origins,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/activity", activityRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.listen(PORT, "0.0.0.0", async () => {
  connectToMongoDB();
  await seedAdminAccount();
  console.log(`🚀 Server Running on port ${PORT}`);
});
