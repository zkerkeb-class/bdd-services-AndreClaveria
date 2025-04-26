// routes/contact.routes.ts
import { Router } from "express";
import * as contactController from "../controllers/contact.controller";
import {
  authenticateJWT,
  authorizeRoles
} from "../middlewares/auth.middleware";

const router = Router();

// Routes protégées par JWT
router.get("/", authenticateJWT, contactController.getAllContacts);
router.get("/:id", authenticateJWT, contactController.getContactById);
router.get(
  "/client/:clientId",
  authenticateJWT,
  contactController.getContactsByClientId
);

// Routes avec vérification des rôles
router.post(
  "/",
  authenticateJWT,
  authorizeRoles("admin", "manager"),
  contactController.createContact
);
router.put(
  "/:id",
  authenticateJWT,
  authorizeRoles("admin", "manager"),
  contactController.updateContact
);
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRoles("admin"),
  contactController.deleteContact
);

export default router;
