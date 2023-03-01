export interface ISummary {
    _id: string;
    technical_used: [string];
    skills: [string]
    summary: ISummaries[];
}

export interface ISummaries{
    role: string;
    levels: ILevel[]
}

export interface ILevel{
    technical_name: string;
    summary_list: [string];
}