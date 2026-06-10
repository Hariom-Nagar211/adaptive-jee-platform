# Adaptive JEE Platform - Architecture Document

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌──────────────┬──────────────┬──────────────┐            │
│  │   Dashboard  │     Quiz     │    Login     │            │
│  └──────────────┴──────────────┴──────────────┘            │
│              │                                               │
│              ▼ (REST API)                                    │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   Backend (Node.js/Express)                 │
│  ┌──────────────┬──────────────┬──────────────┐            │
│  │ Auth Service │ Quiz Service │Analytics Srv │            │
│  └──────────────┴──────────────┴──────────────┘            │
│              │                                               │
│              ▼ (Mongoose ODM)                               │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   MongoDB Database                           │
│  ┌──────────────┬──────────────┬──────────────┐            │
│  │  Students    │  Questions   │  Progress    │            │
│  └──────────────┴──────────────┴──────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

## Core Components

### 1. Frontend Architecture (React)

**Pages:**
- `Home` - Landing page with features & CTA
- `Signup` - Student registration
- `Login` - Authentication
- `Dashboard` - Performance overview, weak areas, recommendations
- `Quiz` - Adaptive question delivery

**Components:**
- `Navbar` - Navigation & user info
- `ProgressChart` - Bar/Line charts for analytics
- `QuestionCard` - Quiz question display
- `ScoreBoard` - Real-time quiz progress

**State Management:** Zustand for client-side state

**API Client:** Axios with interceptors for JWT tokens

### 2. Backend Architecture (Express)

**Routes:**
```
/api/auth
  POST   /signup          - Register student
  POST   /login           - Login & get JWT
  POST   /refresh         - Refresh token

/api/students
  GET    /profile         - Get student data
  PUT    /profile         - Update preferences
  GET    /progress        - Performance data

/api/quiz
  GET    /questions       - Get next adaptive question
  POST   /submit          - Submit answer
  GET    /topics          - Available topics

/api/analytics
  GET    /performance     - Accuracy by topic
  GET    /weak-areas      - Identify weak topics
  GET    /trend           - Performance trend
```

**Services:**
- `AuthService` - JWT generation, password hashing
- `QuizService` - Adaptive question selection
- `AnalyticsService` - Performance aggregation
- `StudentService` - Profile management
- `AdaptationService` - Difficulty scaling & recommendations

### 3. Database Schema

**Student Collection**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  passwordHash: String,
  targetScore: Number,          // 0-360
  enrollmentDate: Date,
  profileComplete: Boolean,
  preferences: {
    studyDurationDaily: Number, // minutes
    preferredTopics: [String],
    learningStyle: String       // visual/kinesthetic/auditory
  },
  performance: {
    overallAccuracy: Number,    // percentage
    totalQuestionsAttempted: Number,
    totalCorrect: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

**Question Collection**
```javascript
{
  _id: ObjectId,
  topic: String,              // physics/chemistry/mathematics
  subtopic: String,           // e.g., "Electrostatics", "Organic Chemistry"
  difficulty: Number,         // 1-5
  type: String,               // mcq/numerical/match_columns
  question: String,
  options: [String],
  correctOption: Number,      // index in options array
  explanation: String,
  timeLimit: Number,          // seconds
  tags: [String],
  createdAt: Date
}
```

**StudentProgress Collection**
```javascript
{
  _id: ObjectId,
  studentId: ObjectId (ref: Student),
  questionId: ObjectId (ref: Question),
  topic: String,
  subtopic: String,
  isCorrect: Boolean,
  timeSpent: Number,          // seconds
  difficulty: Number,         // 1-5 (difficulty of question attempted)
  attemptedAt: Date,
  confidenceLevel: Number,    // 1-10 (student's self-assessment)
  createdAt: Date,
  updatedAt: Date
}

Indexes:
- { studentId: 1, topic: 1 }
- { studentId: 1, attemptedAt: -1 }
```

## Adaptation Algorithm

### 1. Difficulty Scaling

**Input:** Student performance on recent questions
```
accuracy = (correct_answers / total_attempts) * 100
```

**Logic:**
```javascript
if (accuracy > 80 && difficulty < 5) {
  nextDifficulty = difficulty + 1;  // Increase challenge
} else if (accuracy < 50 && difficulty > 1) {
  nextDifficulty = difficulty - 1;  // Decrease challenge
} else {
  nextDifficulty = difficulty;      // Maintain difficulty
}
```

### 2. Weak Area Detection

**Calculate accuracy per topic:**
```javascript
topicAccuracy = {
  'Physics': 65%,
  'Chemistry': 72%,
  'Mathematics': 58%
}
```

**Identify weak areas:** Topics with accuracy < 65%

### 3. Personalized Study Plan

**Algorithm:**
1. Identify weak areas (accuracy < 65%)
2. Prioritize by importance (correlation with exam score)
3. Respect daily study time constraints
4. Distribute practice across topics

**Example Plan:**
```
Monday: Mathematics - Integration (15 min) + Physics - Energy (15 min)
Tuesday: Chemistry - Organic (20 min) + Mathematics revision
...
```

### 4. Spaced Repetition

**Review schedule:**
- First review: 1 day after learning
- Second review: 3 days later
- Third review: 1 week later
- Fourth review: 1 month later

## Authentication Flow

```
1. User submits email & password → Signup/Login
2. Backend validates & hashes password (bcryptjs)
3. Generate JWT token with 24h expiration
4. Return token to client
5. Client stores in localStorage
6. Subsequent requests include: Authorization: Bearer <token>
7. Backend middleware validates token on protected routes
```

## API Response Format

**Success Response:**
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation successful"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## Performance Optimization

### Frontend
- Lazy load routes with React.lazy()
- Memoize expensive components with React.memo()
- Debounce API calls during typing
- Cache quiz questions in client state

### Backend
- Index frequently queried fields (studentId, topic)
- Aggregate analytics asynchronously
- Cache student performance data (Redis - future)
- Batch database operations

## Security

1. **Password Security:** bcryptjs with salt rounds = 10
2. **JWT:** Signed with HS256, 24-hour expiration
3. **Rate Limiting:** Limit API calls per IP (future)
4. **Input Validation:** Sanitize all user inputs
5. **CORS:** Restrict to frontend domain
6. **HTTPS:** Use in production

## Monitoring & Logging

**What to track:**
- API response times
- Error rates per endpoint
- Student engagement metrics
- Quiz completion rates
- DB query performance

**Tools (Future):**
- Winston/Morgan for logging
- Sentry for error tracking
- Datadog/NewRelic for APM

## Deployment Architecture

```
Production:
┌─────────────────────────────────────────┐
│  Vercel / Netlify (Frontend)            │
│  → Automatic deployment from GitHub     │
└─────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────┐
│  Railway / Heroku (Backend)             │
│  → Node.js server + Env vars            │
└─────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────┐
│  MongoDB Atlas (Database)               │
│  → Managed cloud database               │
└─────────────────────────────────────────┘
```

## Scalability Roadmap

**Phase 1 (Current):** Single server, single database
**Phase 2:** Add Redis for caching
**Phase 3:** Horizontal scaling with load balancer
**Phase 4:** Microservices architecture
**Phase 5:** ML model training pipeline for better recommendations

## Testing Strategy

```
Frontend:
- Unit tests: React components
- Integration tests: API calls + component behavior
- E2E tests: Critical user flows (signup → quiz → dashboard)

Backend:
- Unit tests: Service functions
- Integration tests: Database + API endpoints
- Load tests: Performance under concurrent users

Coverage Target: 80%+
```

## Future Enhancements

1. **AI Chatbot:** Answer student questions in real-time
2. **Video Explanations:** Integration with YouTube/recorded lectures
3. **Peer Comparison:** Anonymous leaderboards
4. **Live Classes:** Scheduled instructor sessions
5. **Mobile App:** Native iOS/Android
6. **Advanced Analytics:** Predict JEE rank based on progress
7. **Payment Gateway:** Freemium model with premium features
8. **Dark Mode:** Better UX for night studying
9. **Offline Mode:** Download questions for offline practice
10. **Collaboration:** Study groups & shared resources

---

**Version:** 0.1.0
**Last Updated:** 2025-06-10
