import {BaseRepository} from "./BaseRepository";
import {User, UserCreate, UserUpdate} from "../../domain/entity/user";
import {IUserRepository} from "../../domain/repository/IUserRepository";

const AUTH_TABLE = 'users'

export class UserRepository extends BaseRepository<User> implements IUserRepository {
    constructor() {
        super(AUTH_TABLE);
    }

    async createUser(userCreate: UserCreate): Promise<User> {
        return super.create(userCreate)
    }

    async deleteUser(userUid: string): Promise<void> {
        await super.deleteOne("uid", userUid)

    }

    async getUserByEmail(email: string): Promise<User | null> {
        return super.findBy("email", email)
    }

    async getUserByUid(userUid: string): Promise<User | null> {
        return super.findBy("uid", userUid)
    }

    async updateUser(userUid: string, updates: UserUpdate): Promise<User | null> {
        return super.updateOne('uid', userUid, updates)
    }

}