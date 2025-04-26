// routes/client.routes.ts
import { Router } from "express";
import * as clientController from "../controllers/client.controller";
import {
  authenticateJWT,
  authorizeRoles
} from "../middlewares/auth.middleware";

const router = Router();

// Routes publiques (si nécessaire)
// router.get("/public", clientController.getPublicClientInfo);

// Routes protégées par JWT
router.get("/", authenticateJWT, clientController.getAllClients);
router.get("/:id", authenticateJWT, clientController.getClientById);

// Routes avec vérification des rôles (exemple)
router.post(
  "/",
  authenticateJWT,
  authorizeRoles("admin", "manager"),
  clientController.createClient
);
router.put(
  "/:id",
  authenticateJWT,
  authorizeRoles("admin", "manager"),
  clientController.updateClient
);
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRoles("admin"),
  clientController.deleteClient
);

export default router;
