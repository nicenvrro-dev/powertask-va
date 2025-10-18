import { Request, Response } from "express";
import ServicesModel from "../models/service.model";
import { ServicesCollectionDoc } from "../types/services.types";

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

    // Construct the new training module object
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

    // Restrict targetCategory to known keys (fixes the TS error)
    type CategoryKey = keyof Pick<
      ServicesCollectionDoc,
      "sales" | "administrativeSupport" | "customerService"
    >;

    // --- Determine which category to push into ---
    const targetCategory: CategoryKey =
      category === "admin"
        ? "administrativeSupport"
        : category === "customer"
        ? "customerService"
        : "sales";

    const updateField = `${targetCategory}.modules`;

    // Push new module and return only the newly inserted one
    const updatedServices = await ServicesModel.findOneAndUpdate(
      {},
      { $push: { [updateField]: newModule } },
      {
        new: true,
        upsert: true,
        projection: {
          [`${updateField}`]: { $slice: -1 }, // Return only the last inserted module
        },
      }
    ).lean();

    if (!updatedServices) {
      return res.status(500).json({
        success: false,
        message: "Failed to update services collection.",
      });
    }

    // Get the newly inserted module
    const insertedModule =
      updatedServices[targetCategory]?.modules?.[0] || null;

    return res.status(201).json({
      success: true,
      message: `Training module added to ${targetCategory}.`,
      category: targetCategory,
      data: insertedModule,
    });
  } catch (error) {
    console.error("Failed to create training module", error);
    res.status(500).json({ message: "Failed to create training module" });
    return;
  }
};

/**
 * Fetches all training modules from the Services collection.
 */
export const fetchServicesData = async (req: Request, res: Response) => {
  try {
    // Fetch the entire Services collection document
    const services = await ServicesModel.find().lean();

    console.log("Services fetched:", services);

    if (!services) {
      return res.status(404).json({
        success: false,
        message: "Services collection not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("Failed to fetch training modules", error);
    res.status(500).json({ message: "Failed to fetch training modules" });
  }
};
