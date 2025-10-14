import express from "express";
import { authRouter } from "./api/router/auth-router";
import { validateAuthorization } from "./api/middleware/auth-middleware";
import { sellerRouter } from "./api/router/seller-router";
import { validateRequestBody } from "./api/middleware/validate-request-body";

const app = express();
const BASE_URL = "/api/v1";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${BASE_URL}/auth`, authRouter);
app.use(`${BASE_URL}/seller`, validateAuthorization, sellerRouter);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening at: http://localhost:${PORT}${BASE_URL}`);
});
