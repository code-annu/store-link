import {Router} from "express";
import {validateRequestBody} from "../middleware/validate-request-body";
import {validateAuthorization} from "../middleware/validate-authorization";
import {ProductController} from "../controller/ProductController";
import {ProductRepository} from "../../infrastructure/repository/ProductRepository";
import {SellerRepository} from "../../infrastructure/repository/SellerRepository";
import {StoreRepository} from "../../infrastructure/repository/StoreRepository";
import {ProductCreateSchema, ProductUpdateSchema} from "../schema/product-schema";


export const productRouter = Router()
const productController = new ProductController(new ProductRepository(), new SellerRepository(), new StoreRepository())


productRouter.post('/', validateAuthorization, validateRequestBody(ProductCreateSchema), productController.postProduct.bind(productController))
productRouter.get('/:productUid', validateAuthorization, productController.getProduct.bind(productController))
productRouter.patch('/:productUid', validateAuthorization, validateRequestBody(ProductUpdateSchema), productController.patchProduct.bind(productController))
productRouter.delete('/:productUid', validateAuthorization, productController.deleteProduct.bind(productController))