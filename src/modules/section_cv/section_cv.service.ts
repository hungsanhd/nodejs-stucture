import { HttpException } from "@core/exceptions";
import { isEmptyObject } from "@core/utils";
import CreateSectionCVDto from "./dtos/section_cv.dto";
import SectionCVSchema from "./section_cv.model";
import { ISectionCV } from "./section_cv.interface";

class SectionCVService {
    public sectioncvSchema = SectionCVSchema;

    public async getAllSectionCV(): Promise<ISectionCV[]> {
        const lstSectionCV = await this.sectioncvSchema.find();
        return lstSectionCV;
    }

    public async createSectionCV(model: CreateSectionCVDto): Promise<ISectionCV> {
        if (isEmptyObject(model)) {
            throw new HttpException(400, "Thông tin bị trống");
        }

        const createSectionCV: ISectionCV = await this.sectioncvSchema.create({
            ...model
        });
        return createSectionCV;
    }

    public async updateSectionCV(secId: string, model: CreateSectionCVDto): Promise<ISectionCV> {
        if (isEmptyObject(model)) {
            throw new HttpException(400, "Thông tin bị trống");
        }

        const sectioncv = await this.sectioncvSchema.findById(secId);
        if (!sectioncv) {
            throw new HttpException(400, "CV Không tồn tại");
        }

        const updateSectionCV = await this.sectioncvSchema.findByIdAndUpdate(
            secId,
            {
                ...model
            },
            { new: true }
        )

        if (!updateSectionCV)
          throw new HttpException(409, "Cập nhật khách hàng không thành công");
        return updateSectionCV!;
    }

    public async deleteSectionCV(secId: string): Promise<ISectionCV>{

        const checkExist = await this.sectioncvSchema.findById(secId);
        if(!checkExist){
            throw new HttpException(409, "CV không tồn tại");
        }
        const deletedSectionCV = await this.sectioncvSchema.findByIdAndDelete(secId);
        if (!deletedSectionCV) throw new HttpException(409, 'CV không được xóa');
        return deletedSectionCV;
    }
}

export default SectionCVService; 