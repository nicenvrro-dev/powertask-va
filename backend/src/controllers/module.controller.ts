import { Request, Response } from "express";
import ServicesModel from "../models/service.model";
import { v4 as uuidv4 } from "uuid";

/**
 * Automatically seeds the Services collection
 * with empty default categories if it doesn't exist.
 */
export const seedServicesCollection = async () => {
  try {
    // Check if a Services collection document already exists
    const existingServices = await ServicesModel.findOne();

    if (existingServices) {
      console.log("✅ Services collection already initialized.");
      return;
    }

    // Create a new Services document with empty default arrays
    const defaultServices = new ServicesModel({
      sales: { modules: [] },
      administrativeSupport: { modules: [] },
      customerService: { modules: [] },
    });

    await defaultServices.save();

    console.log("✅ Services collection initialized successfully.");
  } catch (error) {
    console.error("❌ Failed to seed services collection:", error);
  }
};

export const createTrainingModule = async (req: Request, res: Response) => {
  try {
    const { moduleInfo, lessons, metadata } = req.body;

    if (!moduleInfo || !lessons || !metadata) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields for creating training module",
      });
    }

    const { category } = moduleInfo;

    // Construct the full TrainingModule object
    const newModule = {
      title: moduleInfo.title,
      description: moduleInfo.description,
      category: moduleInfo.category || "sales",
      level: moduleInfo.level,
      duration: moduleInfo.duration,
      prerequisites: moduleInfo.prerequisites,
      learningObjectives: moduleInfo.learningObjectives,
      tags: moduleInfo.tags,
      language: moduleInfo.language,
      lessons,
      metadata,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // --- Determine which category to push into ---
    let targetCategory: string;
    switch (category) {
      case "admin":
        targetCategory = "administrativeSupport";
        break;
      case "customer":
        targetCategory = "customerService";
        break;
      default:
        targetCategory = "sales";
        break;
    }

    const updateField = `${targetCategory}.modules`;

    const updatedServices = await ServicesModel.findOneAndUpdate(
      {},
      { $push: { [updateField]: newModule } },
      { new: true, upsert: true }
    );

    if (!updatedServices) {
      return res.status(500).json({
        success: false,
        message: "Failed to update services collection.",
      });
    }

    return res.status(201).json({
      success: true,
      message: `Training module added to ${targetCategory}.`,
      data: newModule,
    });
  } catch (error) {
    console.error("Failed to create training module", error);
    res.status(500).json({ message: "Failed to create training module" });
    return;
  }
};
