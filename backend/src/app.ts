import express from "express";
import { authRouter } from "./api/router/auth-router";
import { validateAuthorization } from "./api/middleware/auth-middleware";
import { sellerRouter } from "./api/router/seller-router";
import { storeRouter } from "./api/router/store-router";
import { supabaseClient } from "./infrastructure/config/db";
import { productRouter } from "./api/router/product-router";

const app = express();
const BASE_URL = "/api/v1";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/test", async (req, res) => {
  const db = supabaseClient;
  const data = await db.from("test").select("*").like("name", "%jsdlfjsk%");
  console.log(data);
  res.json(data);
});

app.use(`${BASE_URL}/auth`, authRouter);
app.use(`${BASE_URL}/seller`, validateAuthorization, sellerRouter);
app.use(`${BASE_URL}/stores`, storeRouter);
app.use(`${BASE_URL}/products`, productRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening at: http://localhost:${PORT}${BASE_URL}`);
});
