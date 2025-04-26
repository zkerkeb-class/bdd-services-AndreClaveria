// services/opportunity.service.ts
import Opportunity from "../models/opportunity.model";
import { IOpportunity } from "../types";
import { Types } from "mongoose";
import { logger } from "../utils/logger";

export const getAllOpportunities = async (): Promise<IOpportunity[]> => {
  return await Opportunity.find()
    .populate("clientId", "name")
    .populate("contactIds", "firstName lastName");
};

export const getOpportunityById = async (
  id: string
): Promise<IOpportunity | null> => {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }
  return await Opportunity.findById(id)
    .populate("clientId", "name")
    .populate("contactIds", "firstName lastName");
};

export const getOpportunitiesByClientId = async (
  clientId: string
): Promise<IOpportunity[]> => {
  if (!Types.ObjectId.isValid(clientId)) {
    return [];
  }
  return await Opportunity.find({ clientId })
    .populate("contactIds", "firstName lastName")
    .sort({ expectedCloseDate: 1 });
};

export const createOpportunity = async (
  opportunityData: IOpportunity
): Promise<IOpportunity> => {
  const opportunity = new Opportunity(opportunityData);
  await opportunity.save();
  return opportunity;
};

export const updateOpportunity = async (
  id: string,
  opportunityData: Partial<IOpportunity>
): Promise<IOpportunity | null> => {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }

  return await Opportunity.findByIdAndUpdate(id, opportunityData, {
    new: true,
    runValidators: true
  })
    .populate("clientId", "name")
    .populate("contactIds", "firstName lastName");
};

export const deleteOpportunity = async (
  id: string
): Promise<IOpportunity | null> => {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }
  return await Opportunity.findByIdAndDelete(id);
};

export const getOpportunitiesByStage = async (
  stage: string
): Promise<IOpportunity[]> => {
  return await Opportunity.find({ stage })
    .populate("clientId", "name")
    .populate("contactIds", "firstName lastName")
    .sort({ expectedCloseDate: 1 });
};

export const getTotalOpportunityValue = async (): Promise<number> => {
  const result = await Opportunity.aggregate([
    { $match: { stage: { $ne: "perdue" } } },
    { $group: { _id: null, totalValue: { $sum: "$value" } } }
  ]);

  return result.length > 0 ? result[0].totalValue : 0;
};

export const getWeightedOpportunityValue = async (): Promise<number> => {
  const result = await Opportunity.aggregate([
    { $match: { stage: { $ne: "perdue" } } },
    {
      $group: {
        _id: null,
        weightedValue: {
          $sum: { $multiply: ["$value", { $divide: ["$probability", 100] }] }
        }
      }
    }
  ]);

  return result.length > 0 ? result[0].weightedValue : 0;
};
