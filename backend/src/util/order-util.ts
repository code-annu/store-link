import { OrderStatus } from "../domain/entity/order";
import { ConflictError } from "../domain/error/ConflictError";

const statusInOrderList = [
  OrderStatus.CONFIRMED,
  OrderStatus.SHIPPED,
  OrderStatus.DISPATCHED,
  OrderStatus.OUT_FOR_DELIVERY,
  OrderStatus.DELIVERED,
];
export const validateOrderStatus = (
  currentStatus: OrderStatus,
  intendedStatus: OrderStatus
) => {
  const indexOfCurrentStatus = statusInOrderList.indexOf(currentStatus);
  const indexOfIntendedStatus = statusInOrderList.indexOf(intendedStatus);

  if (indexOfIntendedStatus > indexOfCurrentStatus + 1) {
    throw new ConflictError(
      `Order cannot directly ${intendedStatus} when it's status is ${currentStatus}`
    );
  }

  if (indexOfIntendedStatus < indexOfCurrentStatus) {
    throw new ConflictError(
      `Order cannot be ${intendedStatus} after ${currentStatus}`
    );
  }
};
