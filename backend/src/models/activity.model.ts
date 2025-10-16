import mongoose, { Types } from "mongoose";
import UserSchema from "./user.model";

const activityLogSchema = new mongoose.Schema(
  {
    actorId: {
      type: Types.ObjectId,
      required: true,
      ref: UserSchema,
    },

    actorName: {
      type: String,
      required: true,
    },

    actorRole: {
      type: String,
      required: true,
    },

    action: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ActivityLogModel = mongoose.model("activity_logs", activityLogSchema);
export default ActivityLogModel;
