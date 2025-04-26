// controllers/contact.controller.ts
import { Request, Response } from "express";
import * as contactService from "../services/contact.service";
import { logger } from "../utils/logger";

export const getAllContacts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const contacts = await contactService.getAllContacts();
    res.status(200).json(contacts);
  } catch (error) {
    logger.error("Error in getAllContacts controller", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des contacts" });
  }
};

export const getContactById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const contact = await contactService.getContactById(req.params.id);
    if (!contact) {
      res.status(404).json({ message: "Contact non trouvé" });
      return;
    }
    res.status(200).json(contact);
  } catch (error) {
    logger.error(
      `Error in getContactById controller for id ${req.params.id}`,
      error
    );
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération du contact" });
  }
};

export const getContactsByClientId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const contacts = await contactService.getContactsByClientId(
      req.params.clientId
    );
    res.status(200).json(contacts);
  } catch (error) {
    logger.error(
      `Error in getContactsByClientId controller for clientId ${req.params.clientId}`,
      error
    );
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération des contacts du client"
      });
  }
};

export const createContact = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newContact = await contactService.createContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    logger.error("Error in createContact controller", error);
    res.status(500).json({ message: "Erreur lors de la création du contact" });
  }
};

export const updateContact = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedContact = await contactService.updateContact(
      req.params.id,
      req.body
    );
    if (!updatedContact) {
      res.status(404).json({ message: "Contact non trouvé" });
      return;
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    logger.error(
      `Error in updateContact controller for id ${req.params.id}`,
      error
    );
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du contact" });
  }
};

export const deleteContact = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedContact = await contactService.deleteContact(req.params.id);
    if (!deletedContact) {
      res.status(404).json({ message: "Contact non trouvé" });
      return;
    }
    res.status(200).json({ message: "Contact supprimé avec succès" });
  } catch (error) {
    logger.error(
      `Error in deleteContact controller for id ${req.params.id}`,
      error
    );
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du contact" });
  }
};
