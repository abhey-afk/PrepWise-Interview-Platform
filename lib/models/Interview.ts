import mongoose, { Schema, Document } from 'mongoose';

export interface IInterview extends Document {
  role: string;
  type: string;
  level: string;
  techstack: string[];
  questions: string[];
  userId: string;
  finalized: boolean;
  coverImage: string;
  createdAt: Date;
}

const InterviewSchema: Schema = new Schema({
  role: { type: String, required: true },
  type: { type: String, required: true },
  level: { type: String, required: true },
  techstack: { type: [String], required: true },
  questions: { type: [String], required: true },
  userId: { type: String, required: true },
  finalized: { type: Boolean, default: true },
  coverImage: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Interview || mongoose.model<IInterview>('Interview', InterviewSchema);
