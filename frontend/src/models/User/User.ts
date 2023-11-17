import { Role } from "@models/Role/Role";

export type Auth = {
  isAuthenticated: boolean;
  token: string;
  logDate: Date | null;
}

export type User = {
  id: string;
  name: string;
  lastName: string;
  avatar?: string;
  email: string;
  idDoc: number | string;
  roles: Role[];
  password?: string;
}