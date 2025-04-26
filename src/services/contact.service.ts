// services/contact.service.ts
import Contact from "../models/contact.model";
import { IContact } from "../types";
import { Types } from "mongoose";
import { logger } from "../utils/logger";

export const getAllContacts = async (): Promise<IContact[]> => {
  return await Contact.find().populate("clientId", "name");
};

export const getContactById = async (id: string): Promise<IContact | null> => {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }
  return await Contact.findById(id).populate("clientId", "name");
};

export const getContactsByClientId = async (
  clientId: string
): Promise<IContact[]> => {
  if (!Types.ObjectId.isValid(clientId)) {
    return [];
  }
  return await Contact.find({ clientId }).sort({ primaryContact: -1 });
};

export const createContact = async (
  contactData: IContact
): Promise<IContact> => {
  const contact = new Contact(contactData);
  await contact.save();
  return contact;
};

export const updateContact = async (
  id: string,
  contactData: Partial<IContact>
): Promise<IContact | null> => {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }

  // Si ce contact est défini comme contact principal, désactiver les autres pour ce client
  if (contactData.primaryContact) {
    try {
      const contact = await Contact.findById(id);
      if (contact) {
        await Contact.updateMany(
          { clientId: contact.clientId, _id: { $ne: id } },
          { primaryContact: false }
        );
      }
    } catch (error) {
      logger.error(
        `Error updating primary contact status for contact ${id}`,
        error
      );
    }
  }

  return await Contact.findByIdAndUpdate(id, contactData, {
    new: true,
    runValidators: true
  });
};

export const deleteContact = async (id: string): Promise<IContact | null> => {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }
  return await Contact.findByIdAndDelete(id);
};
