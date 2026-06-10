import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  email: string;
  passwordHash: string;
  targetScore: number;
  enrollmentDate: Date;
  profileComplete: boolean;
  preferences: {
    studyDurationDaily: number; // minutes
    preferredTopics: string[];
    learningStyle: 'visual' | 'kinesthetic' | 'auditory';
  };
  performance: {
    overallAccuracy: number;
    totalQuestionsAttempted: number;
    totalCorrect: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    targetScore: { type: Number, default: 300 },
    enrollmentDate: { type: Date, default: Date.now },
    profileComplete: { type: Boolean, default: false },
    preferences: {
      studyDurationDaily: { type: Number, default: 120 },
      preferredTopics: [String],
      learningStyle: { type: String, enum: ['visual', 'kinesthetic', 'auditory'], default: 'visual' }
    },
    performance: {
      overallAccuracy: { type: Number, default: 0 },
      totalQuestionsAttempted: { type: Number, default: 0 },
      totalCorrect: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
);

export default mongoose.model<IStudent>('Student', StudentSchema);
