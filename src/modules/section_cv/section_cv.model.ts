import mongoose, { Document } from "mongoose";
import { ISectionCV } from './section_cv.interface';

const SectionCVSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    gender: {
        type: String
    },
    position: {
        type: String
    },
    status: {
        type: Boolean
    },
    role: [{
        roleNm: { type: String },
        level: { type: [String] },
        technicals: { type: [String] }
    }],
    educationList: [{
        schoolNm: { type: String },
        majorNm: { type: String },
        classYear: { type: String }
    }],
    technicalSummaryList:{
        type: [String]
    },
    certificateList: [{
        certificateNm: { type: String },
        certificateYear: { Type: String }
    }],
    skills: [{
        skillNm: { type: String },
        skillData: { type: String },
        isSelected: { type: Boolean }
    }],
    professionalList: [{
        companyNm: { type: String },
        locationNm: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        roleNm: { type: String },
        responsibilities: { type: [String] }
    }],
    highLightProjectList: [{
        projectNm: { type: String },
        projectDescription: { type: String },
        teamSize: { type: String },
        position: { type: String },
        responsibility: { type: [String] },
        technologies: { type: [String] }
    }],
    languages:[{
        languageNm: { type: String },
        level: { type: String },
        positionLanguage: { type: Number },
        positionLevel: { type: Number }
    }]
});

export default mongoose.model<ISectionCV & Document>("section_cv", SectionCVSchema);