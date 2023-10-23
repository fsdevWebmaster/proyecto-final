export const enum RoleLevel {
  ADMINISTRATOR,
  DRIVER, // chofer
  GATE, // porteria
  EXIT, // exit
  INSPECTOR, // romanas y chequeo
}

export type UserRole = keyof typeof RoleLevel;

export type Role = {
  id: string;
  code: number;
  role: UserRole;
}

export const rolePermissions: Record<UserRole, string[]> = {
  ADMINISTRATOR: ['all'],
  DRIVER: ['none'],
  EXIT: ['exit'],
  GATE: ['gate', 'driver-registry'],
  INSPECTOR: ['container-registry', 'yard', 'check-one', 'check-two', 'scale-one', 'scale-two'],
}