import {Router} from "express";
import {BuyerController} from "../controller/BuyerController";
import {BuyerRepository} from "../../infrastructure/repository/BuyerRepository";
import {UserRepository} from "../../infrastructure/repository/UserRepository";
import {validateRequestBody} from "../middleware/validate-request-body";
import {validateAuthorization} from "../middleware/validate-authorization";
import {BuyerCreateProfileSchema, BuyerUpdateProfileSchema} from "../schema/buyer-schema";


export const buyerRouter = Router()
const buyerController = new BuyerController(new BuyerRepository(), new UserRepository())


buyerRouter.post('/', validateAuthorization, validateRequestBody(BuyerCreateProfileSchema), buyerController.postBuyer.bind(buyerController))
buyerRouter.get('/', validateAuthorization, buyerController.getBuyer.bind(buyerController))
buyerRouter.patch('/', validateAuthorization, validateRequestBody(BuyerUpdateProfileSchema), buyerController.patchBuyer.bind(buyerController))
buyerRouter.delete('/', validateAuthorization, buyerController.deleteBuyer.bind(buyerController))