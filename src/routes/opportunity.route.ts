// routes/opportunity.routes.ts
import { Router } from "express";
import * as opportunityController from "../controllers/opportunity.controller";
import {
  authenticateJWT,
  authorizeRoles
} from "../middlewares/auth.middleware";

const router = Router();

// Routes protégées par JWT
router.get("/", authenticateJWT, opportunityController.getAllOpportunities);
router.get(
  "/stats",
  authenticateJWT,
  opportunityController.getOpportunityStats
);
router.get(
  "/stage/:stage",
  authenticateJWT,
  opportunityController.getOpportunitiesByStage
);
router.get(
  "/client/:clientId",
  authenticateJWT,
  opportunityController.getOpportunitiesByClientId
);
router.get("/:id", authenticateJWT, opportunityController.getOpportunityById);

// Routes avec vérification des rôles
router.post(
  "/",
  authenticateJWT,
  authorizeRoles("admin", "manager", "sales"),
  opportunityController.createOpportunity
);
router.put(
  "/:id",
  authenticateJWT,
  authorizeRoles("admin", "manager", "sales"),
  opportunityController.updateOpportunity
);
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRoles("admin", "manager"),
  opportunityController.deleteOpportunity
);

export default router;
