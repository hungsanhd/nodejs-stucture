import { Request, Response, NextFunction } from "express";
import CreateSectionCVDto from "./dtos/section_cv.dto";
import SectionCVService from "./section_cv.service";

export default class SectionCVController {
    private sectionCVService = new SectionCVService();

    public getAllSectionCV = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const lstSectionCV = await this.sectionCVService.getAllSectionCV();
            res.status(200).json(lstSectionCV);
        } catch (error) {
            next(error);
        }
    }

    public createSectionCV = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const model: CreateSectionCVDto = req.body;
            const sectioncv = await this.sectionCVService.createSectionCV(model);
            res.status(200).json(sectioncv);
        } catch (error) {
            next(error);
        }
    };

    public updateSectionCV = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: CreateSectionCVDto = req.body;
            const Id = req.params.id;
            const sectioncv = await this.sectionCVService.updateSectionCV(Id, model);
            res.status(200).json(sectioncv);
        } catch (error) {
            next(error);
        }
    }

    public deleteSectionCV = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.sectionCVService.deleteSectionCV(req.params.id);
            res.status(200).json({success: true});
        } catch (error) {
            next(error);
        }
    };
}
