// controllers/opportunity.controller.ts
import { Request, Response } from "express";
import * as opportunityService from "../services/opportunity.service";

import { logger } from "../utils/logger";

export const getAllOpportunities = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const opportunities = await opportunityService.getAllOpportunities();
    res.status(200).json(opportunities);
  } catch (error) {
    logger.error("Error in getAllOpportunities controller", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des opportunités" });
  }
};

export const getOpportunityById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const opportunity = await opportunityService.getOpportunityById(
      req.params.id
    );
    if (!opportunity) {
      res.status(404).json({ message: "Opportunité non trouvée" });
      return;
    }
    res.status(200).json(opportunity);
  } catch (error) {
    logger.error(
      `Error in getOpportunityById controller for id ${req.params.id}`,
      error
    );
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de l'opportunité" });
  }
};

export const getOpportunitiesByClientId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const opportunities = await opportunityService.getOpportunitiesByClientId(
      req.params.clientId
    );
    res.status(200).json(opportunities);
  } catch (error) {
    logger.error(
      `Error in getOpportunitiesByClientId controller for clientId ${req.params.clientId}`,
      error
    );
    res.status(500).json({
      message: "Erreur lors de la récupération des opportunités du client"
    });
  }
};

export const createOpportunity = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newOpportunity = await opportunityService.createOpportunity(req.body);
    res.status(201).json(newOpportunity);
  } catch (error) {
    logger.error("Error in createOpportunity controller", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'opportunité" });
  }
};

export const updateOpportunity = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedOpportunity = await opportunityService.updateOpportunity(
      req.params.id,
      req.body
    );
    if (!updatedOpportunity) {
      res.status(404).json({ message: "Opportunité non trouvée" });
      return;
    }
    res.status(200).json(updatedOpportunity);
  } catch (error) {
    logger.error(
      `Error in updateOpportunity controller for id ${req.params.id}`,
      error
    );
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de l'opportunité" });
  }
};

export const deleteOpportunity = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedOpportunity = await opportunityService.deleteOpportunity(
      req.params.id
    );
    if (!deletedOpportunity) {
      res.status(404).json({ message: "Opportunité non trouvée" });
      return;
    }
    res.status(200).json({ message: "Opportunité supprimée avec succès" });
  } catch (error) {
    logger.error(
      `Error in deleteOpportunity controller for id ${req.params.id}`,
      error
    );
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de l'opportunité" });
  }
};

export const getOpportunitiesByStage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const opportunities = await opportunityService.getOpportunitiesByStage(
      req.params.stage
    );
    res.status(200).json(opportunities);
  } catch (error) {
    logger.error(
      `Error in getOpportunitiesByStage controller for stage ${req.params.stage}`,
      error
    );
    res.status(500).json({
      message: "Erreur lors de la récupération des opportunités par étape"
    });
  }
};

export const getOpportunityStats = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const totalValue = await opportunityService.getTotalOpportunityValue();
    const weightedValue =
      await opportunityService.getWeightedOpportunityValue();

    res.status(200).json({
      totalValue,
      weightedValue,
      currency: "€"
    });
  } catch (error) {
    logger.error("Error in getOpportunityStats controller", error);
    res.status(500).json({
      message:
        "Erreur lors de la récupération des statistiques des opportunités"
    });
  }
};
