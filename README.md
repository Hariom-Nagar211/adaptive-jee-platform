# Adaptive JEE Learning Platform

An AI-powered adaptive learning platform designed for JEE aspirants. This platform personalizes study strategies by learning from student data and continuously optimizing recommendations.

## 🎯 Vision

Traditional coaching platforms like Allen and PW teach students in mass batches from a single teacher. Our platform removes the friction of creating learning strategies for individual students by:

- **Learning**: Continuously learn from student performance data
- **Adapting**: Adjust difficulty, pacing, and content recommendations in real-time
- **Optimizing**: Provide personalized study paths that maximize learning efficiency
- **Predicting**: Use AI to predict weak areas and recommend targeted practice

## 📋 Project Structure

```
adaptive-jee-platform/
├── client/                 # React frontend (TypeScript + Tailwind CSS + Vite)
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API integration
│   │   ├── types/         # TypeScript types
│   │   └── styles/        # Global styles
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── index.html
│
├── server/                 # Node.js/Express backend (TypeScript)
│   ├── src/
│   │   ├── models/        # Database schemas (Mongoose)
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── middleware/    # Auth, error handling
│   │   └── utils/         # Utility functions
│   ├── package.json
│   ├── tsconfig.json
│   └── index.ts
│
├── docs/                   # Architecture & design docs
├── data/                   # Sample questions & data
└── package.json            # Root workspace config
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hariom-Nagar211/adaptive-jee-platform.git
   cd adaptive-jee-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env` in the `server` directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/adaptive-jee
   JWT_SECRET=your-secret-key-here
   NODE_ENV=development
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 📚 Features (MVP)

### ✅ Completed
- [x] Project structure & monorepo setup
- [x] React frontend with routing (Home, Login, Signup, Dashboard, Quiz)
- [x] Express backend scaffold
- [x] TypeScript configuration
- [x] Database models (Student, Question, StudentProgress)
- [x] UI components (Navbar, Dashboard with charts)

### 🔄 In Progress
- [ ] Authentication system (JWT)
- [ ] Quiz engine with adaptive difficulty
- [ ] Analytics & performance tracking
- [ ] AI study planner
- [ ] Real-time recommendations

### 📋 Todo
- [ ] Question database seeding
- [ ] Advanced analytics dashboard
- [ ] Spaced repetition algorithm
- [ ] Mobile responsiveness optimization
- [ ] Tests & CI/CD

## 🧠 Core Concepts

### Adaptive Difficulty Algorithm
```
1. Track performance on each question (correct/incorrect)
2. Calculate accuracy per topic & subtopic
3. Adjust difficulty:
   - Accuracy > 80% → Increase difficulty
   - Accuracy < 50% → Decrease difficulty
4. Recommend practice on weak topics
```

### Personalization Strategy
- **Performance-based**: Adapt to student's current ability
- **Time-based**: Respect daily study duration preferences
- **Topic-based**: Focus on weak areas based on analytics
- **Spaced Repetition**: Review concepts at optimal intervals

## 🔌 API Endpoints (Planned)

### Authentication
- `POST /api/auth/signup` - Register new student
- `POST /api/auth/login` - Login student
- `POST /api/auth/refresh` - Refresh JWT token

### Student
- `GET /api/students/profile` - Get student profile
- `PUT /api/students/profile` - Update profile
- `GET /api/students/progress` - Get performance data

### Quiz
- `GET /api/quiz/questions` - Get next adaptive question
- `POST /api/quiz/submit` - Submit answer & get feedback
- `GET /api/quiz/topics` - Get available topics

### Analytics
- `GET /api/analytics/performance` - Performance by topic
- `GET /api/analytics/weak-areas` - Identify weak topics
- `GET /api/analytics/trend` - Performance trend over time

### AI Planner
- `GET /api/planner/today` - Get today's recommended plan
- `POST /api/planner/custom` - Create custom study plan

## 🛠️ Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Recharts (data visualization)
- React Router (routing)
- Zustand (state management)
- Axios (HTTP client)

**Backend:**
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT (authentication)
- bcryptjs (password hashing)

**Deployment (Planned):**
- Frontend: Vercel / Netlify
- Backend: Railway / Heroku / AWS
- Database: MongoDB Atlas

## 📊 Data Models

### Student
```typescript
{
  name: string
  email: string (unique)
  passwordHash: string
  targetScore: number
  enrollmentDate: Date
  preferences: {
    studyDurationDaily: number
    preferredTopics: string[]
    learningStyle: 'visual' | 'kinesthetic' | 'auditory'
  }
  performance: {
    overallAccuracy: number
    totalQuestionsAttempted: number
    totalCorrect: number
  }
}
```

### Question
```typescript
{
  topic: 'physics' | 'chemistry' | 'mathematics'
  subtopic: string
  difficulty: 1-5
  question: string
  options: string[]
  correctOption: number
  explanation: string
  timeLimit: number (seconds)
  tags: string[]
}
```

### StudentProgress
```typescript
{
  studentId: ObjectId
  questionId: ObjectId
  isCorrect: boolean
  timeSpent: number (seconds)
  difficulty: number
  attemptedAt: Date
  confidenceLevel: 1-10
}
```

## 🎨 UI/UX Design

- Clean, modern interface with Tailwind CSS
- Responsive design (mobile-first)
- Dark mode support (planned)
- Accessibility (WCAG 2.1 AA target)

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 📈 Performance Metrics

Track these KPIs:
- Student accuracy improvement over time
- Average time to answer questions
- Topic mastery rate
- Daily active usage
- Engagement metrics

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add your feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

## 📝 License

MIT License - see LICENSE file for details

## 📧 Contact

For questions or feedback, reach out to **Hariom Nagar**
- GitHub: [@Hariom-Nagar211](https://github.com/Hariom-Nagar211)

---

**Last Updated:** 2025-06-10
**Version:** 0.1.0 (Alpha)
