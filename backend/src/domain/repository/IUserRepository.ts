import {User, UserCreate, UserUpdate,} from "../entity/user";

export interface IUserRepository {
    createUser(userCreate: UserCreate): Promise<User>;

    getUserByUid(userUid: string): Promise<User | null>;

    getUserByEmail(email: string): Promise<User | null>;

    updateUser(userUid: string, updates: UserUpdate): Promise<User | null>;

    deleteUser(userUid: string): Promise<void>;
}