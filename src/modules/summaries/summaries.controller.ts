import { Request, Response, NextFunction } from "express";
import CreateSummaryDto from "./dtos/summary.dto";
import SummaryService from "./summaries.service";

export default class SummaryController {
  private summaryService = new SummaryService();

  public getAllSummary = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const lstSummaries = await this.summaryService.getAllSummary();
      res.status(200).json(lstSummaries);
    } catch (error) {
      next(error);
    }
  }

  public createSummary = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: CreateSummaryDto = req.body;
      const summary = await this.summaryService.createSummary(model);
      res.status(200).json(summary);
    } catch (error) {
      next(error);
    }
  };

  public updateSummary = async(req: Request, res: Response, next: NextFunction) =>{
    try {
      const model: CreateSummaryDto = req.body;
      const summary = await this.summaryService.updateSummary(model);
      res.status(200).json(summary);
    } catch (error) {
      next(error);
    }
  }
}