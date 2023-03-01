import { HttpException } from "@core/exceptions";
import { isEmptyObject } from "@core/utils";
import CreateSummaryDto from "./dtos/summary.dto";
import SummarySchema from "./summaries.model";
import { ISummary } from "./summaries.interface";

class SummaryService {
    public summarySchema = SummarySchema;

    public async getAllSummary(): Promise<ISummary> {
        const summary = await this.summarySchema.findOne();
        if (!summary) {
            throw new HttpException(400, 'Dữ liệu bị chưa được tạo');
        }
        else {
            return summary;
        }
    }

    public async createSummary(model: CreateSummaryDto): Promise<ISummary> {
        const checkExist = this.summarySchema.findOne();

        if (isEmptyObject(model)) {
            throw new HttpException(400, "Thông tin bị trống");
        }

        const createSummary: ISummary = await this.summarySchema.create({
            ...model
        });
        if (!checkExist) {
            return createSummary;
        }
        else {
            throw new HttpException(400, "Thông tin đã tồn tại");
        }
    }

    public async updateSummary(model: CreateSummaryDto): Promise<ISummary> {
        if (isEmptyObject(model)) {
            throw new HttpException(400, "Thông tin bị trống");
        }

        const summary = await this.summarySchema.findOne();
        if (!summary) {
            throw new HttpException(400, "Dữ liệu chưa được tạo");
        }
        else {
            const updateSummaryById = await this.summarySchema.findByIdAndUpdate(
                summary._id,
                {
                    ...model
                },
                { new: true }
            );
            if (!updateSummaryById) throw new HttpException(409, 'Cập nhật không thành công');
            return updateSummaryById;
        }
    }
}

export default SummaryService;