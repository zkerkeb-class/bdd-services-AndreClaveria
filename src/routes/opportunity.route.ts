import { Router } from "express";
import * as opportunityController from "../controllers/opportunity.controller";
import {
  authenticateJWT,
  authorizeRoles
} from "../middlewares/auth.middleware";

const router = Router();

// Toutes les routes protégées par l'authentification JWT
router.use(authenticateJWT);

// Routes publiques pour tous les utilisateurs authentifiés
router.get("/", opportunityController.getAllOpportunities);
router.get("/:id", opportunityController.getOpportunityById);
router.get(
  "/company/:companyId",
  opportunityController.getOpportunitiesByCompany
);
router.get("/client/:clientId", opportunityController.getOpportunitiesByClient);
router.get("/status/:status", opportunityController.getOpportunitiesByStatus);

// Routes protégées pour les rôles spécifiques
router.post(
  "/",
  authorizeRoles("manager", "user"),
  opportunityController.createOpportunity
);
router.put(
  "/:id",
  authorizeRoles("manager", "user"),
  opportunityController.updateOpportunity
);
router.delete(
  "/:id",
  authorizeRoles("manager"),
  opportunityController.deleteOpportunity
);
router.post(
  "/:opportunityId/contacts/:contactId",
  authorizeRoles("manager", "user"),
  opportunityController.addContactToOpportunity
);

export default router;
