import { Router } from "express";
import * as opportunityController from "../controllers/opportunity.controller";
import {
  authenticateJWT,
  authorizeRoles
} from "../middlewares/auth.middleware";

const router = Router();

// Routes protégées - Nécessitent une authentification
// Récupérer toutes les opportunités
router.get("/", authenticateJWT, opportunityController.getAllOpportunities);

// Récupérer une opportunité par ID
router.get("/:id", authenticateJWT, opportunityController.getOpportunityById);

// Récupérer les opportunités par entreprise
router.get(
  "/company/:companyId",
  authenticateJWT,
  opportunityController.getOpportunitiesByCompany
);

// Récupérer les opportunités par client
router.get(
  "/client/:clientId",
  authenticateJWT,
  opportunityController.getOpportunitiesByClient
);

// Récupérer les opportunités par statut
router.get(
  "/status/:status",
  authenticateJWT,
  opportunityController.getOpportunitiesByStatus
);

// Routes protégées - Nécessitent des droits de manager ou user
// Créer une nouvelle opportunité
router.post(
  "/",
  authenticateJWT,
  authorizeRoles("admin", "manager", "user"),
  opportunityController.createOpportunity
);

// Mettre à jour une opportunité
router.put(
  "/:id",
  authenticateJWT,
  authorizeRoles("admin", "manager", "user"),
  opportunityController.updateOpportunity
);

// Ajouter un contact à une opportunité
router.post(
  "/:opportunityId/contacts/:contactId",
  authenticateJWT,
  authorizeRoles("admin", "manager", "user"),
  opportunityController.addContactToOpportunity
);

// Routes protégées - Nécessitent des droits d'admin ou manager
// Supprimer une opportunité
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRoles("admin", "manager"),
  opportunityController.deleteOpportunity
);

export default router;
