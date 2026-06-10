import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion extends Document {
  topic: 'physics' | 'chemistry' | 'mathematics';
  subtopic: string;
  difficulty: 1 | 2 | 3 | 4 | 5; // 1=very easy, 5=very hard
  type: 'mcq' | 'numerical' | 'match_the_columns';
  question: string;
  options: string[];
  correctOption: number;
  explanation: string;
  timeLimit: number; // seconds
  tags: string[];
  createdAt: Date;
}

const QuestionSchema = new Schema<IQuestion>(
  {
    topic: { type: String, enum: ['physics', 'chemistry', 'mathematics'], required: true },
    subtopic: { type: String, required: true },
    difficulty: { type: Number, min: 1, max: 5, required: true },
    type: { type: String, enum: ['mcq', 'numerical', 'match_the_columns'], default: 'mcq' },
    question: { type: String, required: true },
    options: [String],
    correctOption: { type: Number, required: true },
    explanation: { type: String },
    timeLimit: { type: Number, default: 120 },
    tags: [String]
  },
  { timestamps: true }
);

export default mongoose.model<IQuestion>('Question', QuestionSchema);
