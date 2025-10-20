import express from 'express';
import {errorHandler} from "./api/middleware/handle-error";
import {authRouter} from "./api/router/signup-router";
import {buyerRouter} from "./api/router/buyer-router";

const app = express();

const BASE_API_URL = '/api/v1'

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(`${BASE_API_URL}/auth`, authRouter)
app.use(`${BASE_API_URL}/buyer`, buyerRouter)


app.use(errorHandler)


const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}${BASE_API_URL}`);
})
