# Project Summary & Quick Reference

## What You're Building

**Adaptive JEE Learning Platform** - An AI-powered learning system that personalizes study strategies for JEE aspirants. Unlike traditional coaching platforms (Allen, PW) that teach in large batches, this platform learns from each student's performance and automatically adjusts:

- ✅ Question difficulty levels
- ✅ Topic recommendations
- ✅ Daily study plans
- ✅ Learning pace

## Current Status

✅ **Completed:**
- GitHub repository created
- Project structure (client + server + docs)
- React frontend skeleton (5 pages)
- Express backend skeleton
- Database models (Student, Question, StudentProgress)
- Architecture documentation
- Development guide
- Implementation roadmap

⏳ **Next (This Session):**
1. Build authentication system (JWT)
2. Implement quiz engine with difficulty scaling
3. Create analytics service
4. Connect frontend to backend APIs
5. Create working prototype for user testing

## How to Run

```bash
# Clone and install
git clone https://github.com/Hariom-Nagar211/adaptive-jee-platform.git
cd adaptive-jee-platform
npm install

# Setup MongoDB (use Atlas or local)
# Create server/.env with connection string

# Start dev servers
npm run dev

# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

## Key Files to Know

### Frontend
- `client/src/App.tsx` - Main routing
- `client/src/pages/Dashboard.tsx` - Student performance overview
- `client/src/pages/Quiz.tsx` - Quiz interface
- `client/src/services/` - API client code

### Backend
- `server/src/index.ts` - Express server setup
- `server/src/models/` - Database schemas
- `server/src/routes/` - API endpoints (to be created)
- `server/src/services/` - Business logic (to be created)

### Documentation
- `docs/ARCHITECTURE.md` - System design
- `docs/DEVELOPMENT.md` - Dev workflow
- `docs/ROADMAP.md` - Implementation plan

## Core Features to Implement (Priority Order)

### 1. Authentication (High Priority)
- Signup: Accept email, password, name, target score
- Login: Return JWT token
- Middleware: Protect routes with JWT validation

**Endpoints:**
```
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/refresh
```

### 2. Quiz Engine (High Priority)
- Return next question based on topic + difficulty
- Accept answer submission
- Calculate if correct/incorrect
- Auto-calculate next difficulty level

**Endpoints:**
```
GET /api/quiz/questions?topic=physics&difficulty=3
POST /api/quiz/submit {questionId, selectedOption}
GET /api/quiz/topics
```

**Difficulty Algorithm:**
```
if accuracy > 80% → next difficulty = current + 1
if accuracy < 50% → next difficulty = current - 1
else → maintain difficulty
```

### 3. Analytics (High Priority)
- Calculate accuracy per topic
- Identify weak areas (< 65%)
- Generate study recommendations
- Show weekly performance trend

**Endpoints:**
```
GET /api/analytics/performance
GET /api/analytics/weak-areas
GET /api/analytics/trend
```

### 4. Study Planner (Medium Priority)
- Recommend topics to focus on today
- Create personalized daily plan
- Schedule reviews (spaced repetition)

**Endpoint:**
```
GET /api/planner/today
```

## Data Flow (Example: User Takes a Quiz)

```
1. User opens quiz page
   ↓
2. Frontend calls: GET /api/quiz/questions?topic=physics&difficulty=2
   ↓
3. Backend returns: { id, question, options, timeLimit }
   ↓
4. User selects answer
   ↓
5. Frontend calls: POST /api/quiz/submit { questionId, selectedOption, timeSpent }
   ↓
6. Backend:
   - Check if answer is correct
   - Save to StudentProgress collection
   - Calculate accuracy for topic
   - Determine next difficulty
   - Return: { isCorrect, explanation, nextDifficulty, newAccuracy }
   ↓
7. Frontend:
   - Show feedback (correct/incorrect)
   - Update score on UI
   - Fetch next question with new difficulty
```

## API Response Format (Standard)

All responses should follow this format:

**Success (200):**
```json
{
  "success": true,
  "data": { /* actual response data */ },
  "message": "Operation successful"
}
```

**Error (4xx/5xx):**
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## Database Collections Summary

### students
- Stores: name, email, password hash, target score, preferences
- Indexes: email (unique)

### questions
- Stores: topic, difficulty, question text, options, correct answer
- Indexes: topic, difficulty
- Sample: 500+ questions across Physics, Chemistry, Maths

### student_progress
- Stores: student attempts, correct/incorrect, time spent, difficulty
- Indexes: studentId, attemptedAt
- Purpose: Calculate analytics & drive adaptation

## Authentication Flow

```
Signup:
1. POST /api/auth/signup {email, password, name, targetScore}
2. Backend: Hash password, create student, return JWT token
3. Frontend: Store token in localStorage
4. All future requests: Authorization: Bearer <token>

Login:
1. POST /api/auth/login {email, password}
2. Backend: Verify password, return JWT token
3. Frontend: Store token, redirect to dashboard

Protected Route:
1. Frontend: Include token in Authorization header
2. Backend middleware: Verify token, attach studentId to request
3. Backend: Process request with studentId
```

## Testing Checklist

### Basic Flow Test
- [ ] Can signup with email/password
- [ ] Can login with correct credentials
- [ ] Cannot login with wrong password
- [ ] Can see dashboard after login
- [ ] Can attempt a quiz question
- [ ] Can submit answer
- [ ] Score updates correctly
- [ ] Difficulty adjusts based on performance
- [ ] Analytics show accurate stats
- [ ] Study plan recommends weak topics

### Edge Cases to Test
- [ ] Multiple rapid quiz submissions
- [ ] Very long/short response times
- [ ] Network errors (API unreachable)
- [ ] Expired JWT token
- [ ] Invalid question IDs
- [ ] Concurrent requests

## Performance Targets

- Page load time: < 2 seconds
- API response time: < 200ms (95th percentile)
- Quiz question display: < 500ms
- DB query: < 100ms
- Bundle size: < 500KB (gzipped)

## What Makes This Different from Existing Platforms

| Feature | Traditional Coaching | AdaptiveJEE |
|---------|----------------------|-------------|
| Content Delivery | Pre-recorded lectures from single teacher | Personalized questions tailored to you |
| Difficulty | Same for all students | Adapts to your level (1-5 scale) |
| Topic Focus | Rigid curriculum | Focuses on your weak areas |
| Feedback | Generic explanations | Personalized insights & recommendations |
| Study Plan | Student creates their own | AI generates optimal daily plan |
| Cost | ₹50k-200k/year | Freemium model |
| Scale | Limited by instructor | Can serve millions simultaneously |

## Success Criteria for MVP

1. **Functional:** Core features work without bugs
2. **Usable:** Students can signup → attempt quiz → see progress in 5 minutes
3. **Insightful:** Dashboard shows meaningful insights (weak topics, accuracy, recommendations)
4. **Adaptive:** Difficulty visibly changes based on performance
5. **Engaging:** UI is clean and doesn't feel like a boring online exam platform

## Production Deployment Plan (Future)

```
Frontend: Push to GitHub → Auto-deploy to Vercel
Backend: Push to GitHub → Auto-deploy to Railway/Heroku
Database: MongoDB Atlas (cloud)

Domain: adaptive-jee.com
```

## Getting Help

1. **Architecture questions:** Check `docs/ARCHITECTURE.md`
2. **How to setup:** Check `docs/DEVELOPMENT.md`
3. **What to build next:** Check `docs/ROADMAP.md`
4. **Error messages:** Check server logs and browser console

## Quick Command Reference

```bash
# Development
npm run dev                    # Start both frontend & backend
npm run dev --workspace=client # Just frontend
npm run dev --workspace=server # Just backend

# Building
npm run build                  # Build both
npm run build --workspace=client

# Testing
npm test                       # All tests
npm test -- quiz.test.ts       # Specific file

# Database
npx ts-node server/src/scripts/seed.ts  # Seed sample data

# Deployment
git push                       # Triggers auto-deploy to Vercel/Railway
```

## Notes for Future Sessions

- Question bank needs ~500 questions across 3 subjects, 5 difficulty levels
- Consider integrating YouTube videos for explanations later
- Think about recommendation algorithm optimization after MVP
- Mobile app can be React Native using same backend APIs

---

**Repository:** https://github.com/Hariom-Nagar211/adaptive-jee-platform
**Status:** 🟢 Ready for Phase 1 Implementation
**Estimated Time to MVP:** 2 weeks with focused development
