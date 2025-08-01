import mongoose, { Schema, Document } from 'mongoose';

export interface IFeedback extends Document {
  interviewId: string;
  userId: string;
  totalScore: number;
  categoryScores: Map<string, number>;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: Date;
}

const FeedbackSchema: Schema = new Schema({
  interviewId: { type: String, required: true },
  userId: { type: String, required: true },
  totalScore: { type: Number, required: true },
  categoryScores: { type: Map, of: Number, required: true },
  strengths: { type: [String], required: true },
  areasForImprovement: { type: [String], required: true },
  finalAssessment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', FeedbackSchema);
