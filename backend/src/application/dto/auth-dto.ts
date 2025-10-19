export interface AuthOutput {
    user: {
        uid: string;
        email: string;
        role: string;
        created_at: string;
    };
    access_token?: string;
    refresh_token?: string;
}

export interface SignupInput {
    email: string;
    password: string;
    role?: string;
}

export interface LoginInput {
    email: string;
    password: string;
}