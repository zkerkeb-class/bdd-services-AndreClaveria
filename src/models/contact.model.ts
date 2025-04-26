import mongoose, { Schema } from "mongoose";
import { IContact } from "../types";

const ContactSchema: Schema = new Schema(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    position: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    mobile: { type: String },
    primaryContact: { type: Boolean, default: false },
    notes: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model<IContact & mongoose.Document>(
  "Contact",
  ContactSchema
);
