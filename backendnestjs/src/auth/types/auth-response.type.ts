export type AuthUserResponse = {
  id: string;
  email: string;
  name: string;
  phone?: string;
};

export type AuthResponse = {
  token: string;
  user: AuthUserResponse;
};
