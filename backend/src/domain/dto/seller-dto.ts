import { UserRole } from "../entity/auth-user";
import { Seller } from "../entity/seller";

export interface SellerDto extends Seller {
  role: UserRole;
}
