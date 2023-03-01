export interface ISectionCV {
    _id: string;
    name: string;
    email: string
    gender: string;
    position: string;
    status: boolean;
    role: IRole[];
    educationList: IEducation[];
    technicalSummaryList: [string];
    certificateList: ICertificate[];
    skills: ISkill[];
    professionalList: IProfessional[];
    highLightProjectList: IHighLightProject[];
    languages: ILanguage[];
}

export interface IRole {
    roleNm: string;
    level: [string];
    technicals: [string];
}

export interface IEducation {
    schoolNm: string;
    majorNm: string;
    classYear: string;
}

export interface ICertificate {
    certificateNm: string;
    certificateYear: string;
}

export interface ISkill {
    skillNm: string;
    skillData: string;
    isSelected: boolean;
}

export interface IProfessional {
    companyNm: string;
    locationNm: string;
    startDate: string;
    endDate: string;
    roleNm: string;
    responsibilities: [string]
}

export interface IHighLightProject {
    projectNm: string;
    projectDescription: string;
    teamSize: string;
    position: string;
    responsibility: [string];
    technologies: [string];
}

export interface ILanguage{
    languageNm: string;
    level: string;
    positionLanguage: number;
    positionLevel: number;
}