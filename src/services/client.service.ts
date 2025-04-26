import Client from "../models/client.model";
import { IClient } from "../types";
import { logger } from "../utils/logger";

export const getAllClients = async (): Promise<IClient[]> => {
  try {
    return await Client.find().sort({ name: 1 });
  } catch (error) {
    logger.error("Error fetching all clients", error);
    throw error;
  }
};

export const getClientById = async (id: string): Promise<IClient | null> => {
  try {
    return await Client.findById(id);
  } catch (error) {
    logger.error(`Error fetching client with id ${id}`, error);
    throw error;
  }
};

export const createClient = async (clientData: IClient): Promise<IClient> => {
  try {
    const newClient = new Client(clientData);
    return await newClient.save();
  } catch (error) {
    logger.error("Error creating new client", error);
    throw error;
  }
};

export const updateClient = async (
  id: string,
  clientData: Partial<IClient>
): Promise<IClient | null> => {
  try {
    return await Client.findByIdAndUpdate(id, clientData, { new: true });
  } catch (error) {
    logger.error(`Error updating client with id ${id}`, error);
    throw error;
  }
};

export const deleteClient = async (id: string): Promise<IClient | null> => {
  try {
    return await Client.findByIdAndDelete(id);
  } catch (error) {
    logger.error(`Error deleting client with id ${id}`, error);
    throw error;
  }
};
