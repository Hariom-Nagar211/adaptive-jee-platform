import mongoose, { Schema, Document } from 'mongoose';

export interface IStudentProgress extends Document {
  studentId: mongoose.Types.ObjectId;
  questionId: mongoose.Types.ObjectId;
  topic: string;
  subtopic: string;
  isCorrect: boolean;
  timeSpent: number; // seconds
  difficulty: number;
  attemptedAt: Date;
  confidenceLevel: number; // 1-10 (student's confidence)
}

const StudentProgressSchema = new Schema<IStudentProgress>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    topic: { type: String, required: true },
    subtopic: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
    timeSpent: { type: Number, required: true },
    difficulty: { type: Number, min: 1, max: 5 },
    attemptedAt: { type: Date, default: Date.now },
    confidenceLevel: { type: Number, min: 1, max: 10, default: 5 }
  },
  { timestamps: true }
);

// Index for fast queries
StudentProgressSchema.index({ studentId: 1, topic: 1 });
StudentProgressSchema.index({ studentId: 1, attemptedAt: -1 });

export default mongoose.model<IStudentProgress>('StudentProgress', StudentProgressSchema);
