export interface AuthUser {
  user: {
    uid: string;
    email: string;
    role: string;
    created_at: string;
  };
  access_token: string;
  refresh_token: string;
}

export interface Profile {
  uid: string;
  email: string;
  created_at: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  role: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
