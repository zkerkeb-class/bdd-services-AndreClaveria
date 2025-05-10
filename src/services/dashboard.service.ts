// services/dashboard.service.ts
import { getTeamsByMember } from "./team.service";
import { getCompanyById } from "./company.service";
import { ITeam, ICompany, IUser } from "../types";
import { logger } from "../utils/logger";
import { getUserById } from "../utils/auth/user.service";

interface UserDashboardData {
  user: IUser;
  teams: ITeam[];
  company: ICompany | null;
}

export const getUserDashboardData = async (
  userId: string,
  token: string // Ajoutez le paramètre token ici
): Promise<UserDashboardData | null> => {
  try {
    // 1. Récupérer l'utilisateur via le client d'authentification
    const user = await getUserById(userId, token);
    if (!user) {
      return null;
    }

    // 2. Trouver toutes les équipes dont l'utilisateur est membre
    const teams = await getTeamsByMember(userId);

    let company = null;
    if (teams.length > 0) {
      // Prendre la première équipe (la plupart des utilisateurs n'appartiennent qu'à une seule équipe)
      const companyId = teams[0].company.toString(); // Assurez-vous de convertir en string si nécessaire
      company = await getCompanyById(companyId);
    }

    return { user, teams, company };
  } catch (error) {
    logger.error(`Error fetching dashboard data for user ${userId}`, error);
    throw error;
  }
};
