import {Response, NextFunction} from "express";
import {CreateSellerProfileUsecase} from "../../application/usecase/seller/CreateSellerProfileUsecase";
import {UpdateSellerProfileUsecase} from "../../application/usecase/seller/UpdateSellerProfileUsecase";
import {DeleteSellerProfileUsecase} from "../../application/usecase/seller/DeleteSellerProfileUsecase";
import {GetSellerProfileUsecase} from "../../application/usecase/seller/GetSellerProfileUsecase";
import {ISellerRepository} from "../../domain/repository/ISellerRepository";
import {IUserRepository} from "../../domain/repository/IUserRepository";
import {AuthRequest} from "../middleware/validate-authorization";

export class SellerController {
    private readonly createSellerProfile: CreateSellerProfileUsecase
    private readonly updateSellerProfile: UpdateSellerProfileUsecase
    private readonly deleteSellerProfile: DeleteSellerProfileUsecase
    private readonly getSellerProfile: GetSellerProfileUsecase

    constructor(sellerRepo: ISellerRepository, userRepo: IUserRepository) {
        this.createSellerProfile = new CreateSellerProfileUsecase(sellerRepo, userRepo)
        this.deleteSellerProfile = new DeleteSellerProfileUsecase(sellerRepo, userRepo)
        this.updateSellerProfile = new UpdateSellerProfileUsecase(sellerRepo, userRepo)
        this.getSellerProfile = new GetSellerProfileUsecase(sellerRepo, userRepo)
    }

    async postSeller(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userUid = req.auth?.userId
            const {fullname, profile_picture_url} = req.body

            const result = await this.createSellerProfile.execute({
                fullname: fullname, profile_picture_url: profile_picture_url, uid: userUid!
            })
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

    async getSeller(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userUid = req.auth?.userId

            const result = await this.getSellerProfile.execute(userUid!)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    async patchSeller(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userUid = req.auth?.userId
            const {fullname, profile_picture_url, verified} = req.body

            const result = await this.updateSellerProfile.execute(userUid!, {
                fullname: fullname, profile_picture_url: profile_picture_url, verified: verified,
            })
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    async deleteSeller(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userUid = req.auth?.userId

            const result = await this.deleteSellerProfile.execute(userUid!)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }


}