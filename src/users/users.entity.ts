export const USER_ROLE = {
  admin: 'admin',
  editor: 'editor',
  viewer: 'viewer',
} as const;

export type UserRoleType = keyof typeof USER_ROLE;

export interface User {
  id: string;
  login: string;
  password: string;
  role: UserRoleType;
  createdAt: number;
  updatedAt: number;
}
