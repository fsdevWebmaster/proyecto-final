enum RoleLevel {
  ADMIN,
  DRIVER, // chofer
  GATE, // porteria
  INSPECTOR,
  ANALYST, // medidor
}

export type UserRole = keyof typeof RoleLevel;

export type Role = {
  id: string;
  code: number;
  role: UserRole;
}