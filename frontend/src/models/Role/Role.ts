enum RoleLevel {
  ADMINISTRATOR,
  DRIVER, // chofer
  GATE, // porteria
  INSPECTOR,
  ANALIZER, // medidor
}

export type UserRole = keyof typeof RoleLevel;

export type Role = {
  id: string;
  role: UserRole;
}