import { Request, Response } from "express";
import * as clientService from "../services/client.service";
import { logger } from "../utils/logger";

export const getAllClients = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const clients = await clientService.getAllClients();
    res.status(200).json(clients);
  } catch (error) {
    logger.error("Error in getAllClients controller", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des clients" });
  }
};

export const getClientById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const client = await clientService.getClientById(req.params.id);
    if (!client) {
      res.status(404).json({ message: "Client non trouvé" });
      return;
    }
    res.status(200).json(client);
  } catch (error) {
    logger.error(
      `Error in getClientById controller for id ${req.params.id}`,
      error
    );
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération du client" });
  }
};

export const createClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newClient = await clientService.createClient(req.body);
    res.status(201).json(newClient);
  } catch (error) {
    logger.error("Error in createClient controller", error);
    res.status(500).json({ message: "Erreur lors de la création du client" });
  }
};

export const updateClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedClient = await clientService.updateClient(
      req.params.id,
      req.body
    );
    if (!updatedClient) {
      res.status(404).json({ message: "Client non trouvé" });
      return;
    }
    res.status(200).json(updatedClient);
  } catch (error) {
    logger.error(
      `Error in updateClient controller for id ${req.params.id}`,
      error
    );
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du client" });
  }
};

export const deleteClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedClient = await clientService.deleteClient(req.params.id);
    if (!deletedClient) {
      res.status(404).json({ message: "Client non trouvé" });
      return;
    }
    res.status(200).json({ message: "Client supprimé avec succès" });
  } catch (error) {
    logger.error(
      `Error in deleteClient controller for id ${req.params.id}`,
      error
    );
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du client" });
  }
};
