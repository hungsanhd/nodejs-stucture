import mongoose, { Document } from "mongoose";
import { ISummary } from './summaries.interface';

const SummarySchema = new mongoose.Schema({
    technical_used: {
        type: [String]
    },
    skills: {
        type: [String]
    },
    summary: [{
        role: {
            type: String,
        },
        levels: [{
            level_name: {
                type: String
            },
            technicals: [{
                technical_name: {
                    type: String
                },
                summary_list: {
                    type: [String]
                }
            }
            ]
        }]
    }],
});

export default mongoose.model<ISummary & Document>("summaries", SummarySchema);