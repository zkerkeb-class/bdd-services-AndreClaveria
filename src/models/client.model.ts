import mongoose, { Schema } from "mongoose";
import { IClient } from "../types";

const ClientSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    sector: { type: String },
    address: {
      street: { type: String },
      city: { type: String },
      zipCode: { type: String },
      country: { type: String }
    },
    phone: { type: String },
    email: { type: String },
    logo: { type: String },
    company: { type: Schema.Types.ObjectId, ref: "Company", required: true }, // Référence à l'entreprise propriétaire
    team: { type: Schema.Types.ObjectId, ref: "Team" }, // Équipe responsable de ce client
    assignedTo: { type: String }, // ID utilisateur responsable
    goodForCustomer: { type: Number, min: 0, max: 100, default: 50 },
    contacts: [{ type: String }], // IDs des contacts - gérés par le service contact
    opportunities: [{ type: String }], // IDs des opportunités - gérées par le service opportunité
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model<IClient>("Client", ClientSchema);
