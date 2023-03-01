import { Route } from "@core/interfaces";
import { authMiddleware } from "@core/middleware";
import { Router } from "express";
import SectionCVController from "./section_cv.controller";

export default class SummaryRoute implements Route {
    public path = "/api/v1/sectioncv";
    public router = Router();

    public sectionCVController = new SectionCVController();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(`${this.path}`, this.sectionCVController.getAllSectionCV);

        this.router.post(`${this.path}`, this.sectionCVController.createSectionCV);
        
        this.router.put(`${this.path}/:id`, this.sectionCVController.updateSectionCV);

        this.router.delete(`${this.path}/:id`, this.sectionCVController.deleteSectionCV)
    }
}