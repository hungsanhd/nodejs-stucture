import { Route } from "@core/interfaces";
import { authMiddleware } from "@core/middleware";
import { Router } from "express";
import SummaryController from "./summaries.controller";

export default class SummaryRoute implements Route {
    public path = "/api/v1/summary";
    public router = Router();

    public summaryController = new SummaryController();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(`${this.path}`, authMiddleware, this.summaryController.getAllSummary);

        this.router.post(`${this.path}`, authMiddleware, this.summaryController.createSummary);
        
        this.router.put(`${this.path}`, authMiddleware, this.summaryController.updateSummary);
    }
}