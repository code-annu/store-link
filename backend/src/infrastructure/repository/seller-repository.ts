import { SellerCreate, Seller, SellerUpdate } from "../../domain/entity/seller";
import { CustomError } from "../../domain/error/custom-error";
import { ErrorType } from "../../domain/error/error-type";
import { ISellerRepository } from "../../domain/repository/iseller-repository";
import { BaseRepository } from "./base-repository";

const SELLER_TABLE = "sellers";
export class SellerRepository
  extends BaseRepository
  implements ISellerRepository
{
  constructor() {
    super(SELLER_TABLE);
  }

  async createSeller(sellerData: SellerCreate): Promise<Seller> {
    const { data, error } = await super.insert(sellerData);
    if (error) {
      switch (error.code) {
        case "23505":
          throw new CustomError(
            "Profile already created",
            ErrorType.RESOURCE_ALREADY_EXISTS
          );
        default:
          throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
      }
    }

    return data as Seller;
  }

  async getSellerByUid(uid: string): Promise<Seller | null> {
    const { data, error } = await super.getByUid(uid);
    if (data == null) return null;
    if (error) {
      console.log(error);
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }
    return data as Seller;
  }

  async updateSeller(
    uid: string,
    updates: SellerUpdate
  ): Promise<Seller | null> {
    const { data, error } = await super.update(uid, updates);

    if (error) {
      console.log(error);
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }

    return data as Seller;
  }

  async deleteSellerByUid(uid: string): Promise<Seller | null> {
    const { data, error } = await super.delete(uid);
    if (data == null) return null;
    if (error) {
      console.log(error);
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }
    return data as Seller;
  }
}
