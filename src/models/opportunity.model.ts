import mongoose, { Schema } from "mongoose";
import { IOpportunity } from "../types";

const OpportunitySchema: Schema = new Schema(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    value: { type: Number, required: true },
    stage: {
      type: String,
      required: true,
      enum: [
        "prospect",
        "qualification",
        "proposition",
        "négociation",
        "gagnée",
        "perdue"
      ],
      default: "prospect"
    },  
    probability: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    expectedCloseDate: { type: Date, required: true },
    products: [{ type: String }],
    contactIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Contact"
      }
    ],
    notes: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model<IOpportunity & mongoose.Document>(
  "Opportunity",
  OpportunitySchema
);
