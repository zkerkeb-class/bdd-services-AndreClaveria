export interface IClient {
  _id?: string;
  name: string;
  sector: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  website?: string;
  size?: string;
  revenueBracket?: string;
  goodForCustomer?: number; // Indicateur "bonne poire" (0-100)
  contacts?: string[]; // IDs des contacts associés
  opportunities?: string[]; // IDs des opportunités associées
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IContact {
  _id?: string;
  clientId: string;
  firstName: string;
  lastName: string;
  position: string;
  email: string;
  phone: string;
  mobile?: string;
  primaryContact: boolean;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IOpportunity {
  _id?: string;
  clientId: string;
  title: string;
  description: string;
  value: number;
  stage: string;
  probability: number;
  expectedCloseDate: Date;
  products?: string[];
  contactIds?: string[];
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive?: boolean;
  teams?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICompany {
  _id?: string;
  name: string;
  description?: string;
  address?: {
    street?: string;
    city?: string;
    zipCode?: string;
    country?: string;
  };
  phone?: string;
  email?: string;
  website?: string;
  industry?: string;
  logo?: string;
  owner: string;
  teams?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
}

// Interface représentant une équipe
export interface ITeam {
  _id?: string;
  name: string;
  description?: string;
  company: string;
  members: string[];
  leader?: string; // ID du chef d'équipe
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
}
