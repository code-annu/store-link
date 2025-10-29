import express from "express";
import { errorHandler } from "./api/middleware/handle-error";
import { authRouter } from "./api/router/signup-router";
import { buyerRouter } from "./api/router/buyer-router";
import { sellerRouter } from "./api/router/seller-router";
import { storeRouter } from "./api/router/store-router";
import { productRouter } from "./api/router/product-router";
import { orderRouter } from "./api/router/order-router";
import { validateAuthorization } from "./api/middleware/validate-authorization";
import { deliveryPartnerRouter } from "./api/router/delivery-partner-router";

const app = express();

const BASE_API_URL = "/api/v1";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${BASE_API_URL}/auth`, authRouter);

// Authorized routes
app.use(`${BASE_API_URL}/buyers`, validateAuthorization, buyerRouter);
app.use(`${BASE_API_URL}/sellers`, validateAuthorization, sellerRouter);
app.use(
  `${BASE_API_URL}/delivery-partners`,
  validateAuthorization,
  deliveryPartnerRouter
);
app.use(`${BASE_API_URL}/stores`, validateAuthorization, storeRouter);
app.use(`${BASE_API_URL}/orders`, validateAuthorization, orderRouter);

// Public routes
app.use(`${BASE_API_URL}/products`, productRouter);

app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}${BASE_API_URL}`);
});
