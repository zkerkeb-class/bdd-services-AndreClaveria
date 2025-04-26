import mongoose, { Schema } from "mongoose";
import { IClient } from "../types";

const ClientSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    sector: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String },
    size: { type: String },
    revenueBracket: { type: String },
    goodForCustomer: {
      type: Number,
      min: 0,
      max: 100,
      default: 50
    },
    contacts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Contact"
      }
    ],
    opportunities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Opportunity"
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model<IClient & mongoose.Document>(
  "Client",
  ClientSchema
);
