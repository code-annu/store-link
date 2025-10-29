import { IOrderRepository } from "../../../domain/repository/IOrderRepository";
import { Order, OrderCreate, OrderStatus } from "../../../domain/entity/order";
import { IBuyerRepository } from "../../../domain/repository/IBuyerRepository";
import { IProductRepository } from "../../../domain/repository/IProductRepository";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { ConflictError } from "../../../domain/error/ConflictError";

export class CreateNewOrderUsecase {
  constructor(
    private readonly orderRepo: IOrderRepository,
    private readonly buyerRepo: IBuyerRepository,
    private readonly productRepo: IProductRepository
  ) {}

  private GST = 0.18;

  async execute(productUid: string, buyerUid: string): Promise<Order> {
    const buyer = await this.buyerRepo.getBuyer(buyerUid);
    if (!buyer) {
      throw new NotFoundError(
        "You need to create a buyer profile before placing an order"
      );
    }

    const product = await this.productRepo.getProduct(productUid);
    if (!product) {
      throw new NotFoundError(`Product with uid ${productUid} not found`);
    }

    if (!product.is_available) {
      throw new ConflictError("Product is currently unavailable");
    }

    const updatedProduct = await this.productRepo.updateProduct(productUid, {
      is_available: false,
      // updated_at: new Date().toISOString(),
    });

    if (!updatedProduct) {
      throw new ConflictError(
        "Failed to place order. Product might be unavailable now."
      );
    }

    const orderCreate: OrderCreate = {
      product_uid: productUid,
      buyer_uid: buyerUid,
      seller_uid: product.seller_uid,
      store_uid: product.store_uid,
      status: OrderStatus.CONFIRMED,
      delivery_address: buyer.address,
      delivery_partner_uid: null,
      total_amount: product.price + product.price * this.GST,
    };

    return await this.orderRepo.createOrder(orderCreate);
  }
}
