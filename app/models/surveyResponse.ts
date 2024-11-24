import mongoose from "mongoose";

const areaSchema = new mongoose.Schema({
  UWSS: { type: mongoose.Schema.Types.Mixed }, // Can be boolean, number, or string
  USSM: { type: mongoose.Schema.Types.Mixed },
  RWSSM: { type: mongoose.Schema.Types.Mixed },
  RSSM: { type: mongoose.Schema.Types.Mixed },
  FM: { type: mongoose.Schema.Types.Mixed },
  RF: { type: mongoose.Schema.Types.Mixed },
  UOM: { type: mongoose.Schema.Types.Mixed }
});

const responsesSchema = new mongoose.Schema(
  {
    Id: { type: String, required: true, unique: true }, // User identifier
    responses: {
      type: Map, // Use a map for flexible key-value pairs
      of: areaSchema // The value for each key adheres to the `areaSchema`
    },
    submittedAt: { type: Date, required: true }
  },
  { timestamps: true } // Automatically add `createdAt` and `updatedAt` fields
);

export default mongoose.models.Responses ||
  mongoose.model("Responses", responsesSchema);
