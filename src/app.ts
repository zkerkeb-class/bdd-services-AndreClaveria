import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import helmet from "helmet";
import morgan from "morgan";

import swaggerUi from "swagger-ui-express";
import route from "./routes/index";
import { errorMiddleware } from "./middlewares/error.middleware";
import { logger } from "./utils/logger";
import { HealthMonitor } from "./utils/healthMonitor";
import { discordService } from "./utils/discord";

// Charger les variables d'environnement

const app: Application = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(
  morgan("combined", {
    stream: {
      write: (message: string) => logger.info(message.trim())
    }
  })
);

// Routes
app.use("/api", route);

// Swagger documentation - À configurer plus tard
// const swaggerDocument = require('../swagger.json');
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health check endpoint amélioré avec capacité de notification
app.get("/health", async (req: Request, res: Response) => {
  // Vérifie si une vérification manuelle est demandée
  const forceCheck = req.query.check === "true";
  const notifyDiscord = req.query.notify === "true";

  // Pour cet exemple, nous considérons le service comme sain si l'endpoint est accessible
  const status = { status: "UP", timestamp: new Date().toISOString() };

  // Si une notification est demandée, l'envoyer via Discord
  if (notifyDiscord) {
    await discordService.sendServiceStatusNotification(
      "UP",
      "Vérification manuelle demandée via l'endpoint /health"
    );
  }

  // Si une vérification manuelle est demandée, exécuter le healthMonitor
  if (forceCheck && healthMonitor) {
    await healthMonitor.performCheck();
  }

  res.status(200).json(status);
});

// Créer une fonction de vérification de santé personnalisée
const checkApiHealth = async (): Promise<boolean> => {
  try {
    // Ici, vous pouvez ajouter une logique de vérification plus complexe
    // Par exemple, vérifier la connexion à la base de données, aux services externes, etc.

    // Pour cet exemple simple, nous considérons le service comme sain s'il est en cours d'exécution
    return true;
  } catch (error) {
    logger.error("Health check failed:", error);
    return false;
  }
};

// Initialiser et démarrer le moniteur de santé
const healthMonitor = new HealthMonitor(
  checkApiHealth,
  parseInt(process.env.HEALTH_CHECK_INTERVAL || "60000")
);

// Error handling
app.use(errorMiddleware);

// Exporter l'application et le moniteur de santé
export { app, healthMonitor };
