import { Request, Response } from "express";
import ActivityLogModel from "../models/activity.model";

export const fetchActivityLogs = async (req: Request, res: Response) => {
  try {
    const activityLogs = await ActivityLogModel.find().lean();

    if (!activityLogs || activityLogs.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No activity logs found" });
    }

    res.status(201).json({
      success: true,
      data: activityLogs,
    });
    return;
  } catch (error) {
    console.error("Failed to fetch activity logs", error);
    return res.status(500).json({ message: "Failed to fetch activity logs" });
  }
};

export const createActivityLog = async (req: Request, res: Response) => {
  try {
    const { actorId, actorName, actorRole, action } = req.body;

    if (!actorId || !actorName || !actorRole || !action) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required parameters" });
    }

    const newActivity = await ActivityLogModel.create({
      actorId,
      actorName,
      actorRole,
      action,
    });

    res.status(201).json({
      success: true,
      data: newActivity,
    });
    return;
  } catch (error) {
    console.error("Failed to create user activity", error);
    res.status(500).json({ message: "Failed to create user activity" });
    return;
  }
};
