# Development Guide

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn
- MongoDB 4.4+ (local or Atlas account)
- Git

### Initial Setup

```bash
# 1. Clone the repository
git clone https://github.com/Hariom-Nagar211/adaptive-jee-platform.git
cd adaptive-jee-platform

# 2. Install dependencies (root, client, server)
npm install

# 3. Create environment files

# Create .env in server/ directory
cat > server/.env << 'EOF'
PORT=5000
MONGODB_URI=mongodb://localhost:27017/adaptive-jee
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRATION=24h
NODE_ENV=development
LOG_LEVEL=debug
EOF

# 4. Start development servers
npm run dev
```

## Project Commands

### Root Commands
```bash
npm install          # Install all dependencies (client + server)
npm run dev          # Start both frontend & backend in dev mode
npm run build        # Build both client and server
npm start            # Start production server
npm test             # Run all tests
```

### Frontend Commands (client/)
```bash
cd client

npm run dev          # Start Vite dev server (http://localhost:3000)
npm run build        # Build for production
npm run preview      # Preview production build
npm run type-check   # Check TypeScript errors
```

### Backend Commands (server/)
```bash
cd server

npm run dev          # Start with ts-node (auto-reload on changes)
npm run build        # Compile TypeScript to JavaScript
npm start            # Run compiled JavaScript
npm test             # Run tests
```

## Development Workflow

### 1. Starting Fresh
```bash
# Terminal 1: Backend
cd server
npm run dev
# Server runs on http://localhost:5000

# Terminal 2: Frontend
cd client
npm run dev
# Frontend runs on http://localhost:3000

# Open browser at http://localhost:3000
```

### 2. Making API Changes
```typescript
// server/src/routes/quiz.ts
router.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json({ success: true, data: questions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

```typescript
// client/src/services/quizService.ts
export async function getQuestions() {
  const response = await axios.get('/api/quiz/questions');
  return response.data.data;
}
```

### 3. Adding a New Page
```bash
# Create component
touch client/src/pages/YourNewPage.tsx

# Add to App.tsx routes
<Route path="/your-route" element={<YourNewPage />} />
```

### 4. Adding a Database Model
```typescript
// server/src/models/YourModel.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IYourModel extends Document {
  field1: string;
  field2: number;
}

const YourModelSchema = new Schema<IYourModel>({
  field1: String,
  field2: Number,
}, { timestamps: true });

export default mongoose.model<IYourModel>('YourModel', YourModelSchema);
```

## Code Structure

### Frontend Structure
```
client/src/
├── components/         # Reusable components
│   └── Navbar.tsx
├── pages/             # Page components (route-based)
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   └── Quiz.tsx
├── services/          # API client functions
│   ├── authService.ts
│   ├── quizService.ts
│   └── analyticsService.ts
├── types/             # TypeScript interfaces
│   └── index.ts
├── styles/            # Global styles
│   └── App.css
├── App.tsx            # Main app component with routing
└── main.tsx           # Entry point
```

### Backend Structure
```
server/src/
├── models/            # Database schemas
│   ├── Student.ts
│   ├── Question.ts
│   └── StudentProgress.ts
├── routes/            # API route handlers
│   ├── auth.ts
│   ├── quiz.ts
│   ├── students.ts
│   └── analytics.ts
├── services/          # Business logic
│   ├── authService.ts
│   ├── quizService.ts
│   ├── analyticsService.ts
│   └── adaptationService.ts
├── middleware/        # Express middleware
│   ├── auth.ts
│   └── errorHandler.ts
├── utils/             # Helper functions
│   ├── jwt.ts
│   └── validators.ts
└── index.ts           # Server entry point
```

## Common Development Tasks

### Adding Authentication Middleware
```typescript
// server/src/middleware/auth.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).studentId = decoded.studentId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Usage in route
router.get('/profile', authMiddleware, async (req, res) => {
  // Protected route
});
```

### Fetching Data from API
```typescript
// client/src/services/quizService.ts
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function fetchQuestions(topic: string) {
  try {
    const response = await api.get(`/quiz/questions?topic=${topic}`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch questions');
  }
}
```

### Using TypeScript Interfaces
```typescript
// client/src/types/index.ts
export interface Student {
  _id: string;
  name: string;
  email: string;
  targetScore: number;
  performance: {
    overallAccuracy: number;
    totalQuestionsAttempted: number;
    totalCorrect: number;
  };
}

export interface Question {
  _id: string;
  topic: 'physics' | 'chemistry' | 'mathematics';
  subtopic: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  question: string;
  options: string[];
  correctOption: number;
  explanation: string;
}

// Usage in component
function QuizComponent({ question }: { question: Question }) {
  return <div>{question.question}</div>;
}
```

## Database Management

### Connecting to MongoDB
```bash
# Local MongoDB
mongod --dbpath /path/to/data

# Or use MongoDB Atlas (Cloud)
# Connection string: mongodb+srv://user:password@cluster.mongodb.net/dbname
```

### Viewing Data with MongoDB Compass
```bash
# Download from https://www.mongodb.com/products/compass
# Connect with: mongodb://localhost:27017
# Browse collections in adaptive-jee database
```

### Seeding Sample Data
```bash
# Create seed script in server/src/scripts/seed.ts
ts-node server/src/scripts/seed.ts

# This will populate sample questions and students
```

## Testing

### Running Tests
```bash
# All tests
npm test

# Specific file
npm test -- student.test.ts

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

### Writing a Test
```typescript
// server/src/services/__tests__/quizService.test.ts
import QuizService from '../quizService';

describe('QuizService', () => {
  it('should return questions for a topic', async () => {
    const questions = await QuizService.getQuestionsByTopic('physics');
    expect(questions).toHaveLength(10);
    expect(questions[0].topic).toBe('physics');
  });

  it('should scale difficulty based on accuracy', () => {
    const newDifficulty = QuizService.calculateDifficulty(80, 3);
    expect(newDifficulty).toBe(4); // Increased from 3
  });
});
```

## Debugging

### Frontend Debugging
```typescript
// Use browser DevTools
// Network tab: Check API calls
// Console tab: Check errors
// React DevTools: Inspect component state

// Or add console logs
console.log('Student data:', student);
console.log('Quiz response:', response.data);
```

### Backend Debugging
```typescript
// Add logging
import { log } from 'console';

app.get('/api/quiz/questions', (req, res) => {
  console.log('Query:', req.query);
  console.log('Params:', req.params);
  // ...
});

// VS Code debugging
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/server/node_modules/.bin/ts-node",
      "args": ["src/index.ts"],
      "cwd": "${workspaceFolder}/server"
    }
  ]
}
```

## Deployment Checklist

### Before Deploying
- [ ] Run tests: `npm test`
- [ ] Check TypeScript: `npm run type-check`
- [ ] Build production: `npm run build`
- [ ] Test production build: `npm preview` (frontend)
- [ ] Security: No hardcoded secrets in code
- [ ] Environment variables set correctly
- [ ] Database backups in place

### Frontend Deployment (Vercel)
```bash
# Push to main branch triggers auto-deployment
# Or manually:
npm run build
vercel deploy --prod
```

### Backend Deployment (Railway/Heroku)
```bash
# Ensure Procfile exists
echo "web: npm start" > Procfile

# Push to Git
git push heroku main
```

## Performance Tips

1. **Database Queries:** Add proper indexes
2. **Caching:** Use Redis for frequently accessed data
3. **Pagination:** Limit results returned from API
4. **Lazy Loading:** Load features on-demand
5. **Compression:** Enable gzip in Express

## Resources

- React Docs: https://react.dev
- TypeScript: https://www.typescriptlang.org
- Express: https://expressjs.com
- MongoDB: https://www.mongodb.com/docs
- Mongoose: https://mongoosejs.com
- Tailwind CSS: https://tailwindcss.com

## Troubleshooting

### "Cannot find module" errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port already in use
```bash
# Kill process on port
lsof -i :5000
kill -9 <PID>
```

### MongoDB connection failed
```bash
# Ensure MongoDB is running
mongod --dbpath /path/to/data

# Or check connection string in .env
MONGODB_URI=mongodb://localhost:27017/adaptive-jee
```

### TypeScript compilation errors
```bash
# Restart TypeScript server in VS Code
# Or run tsc --noEmit to check all errors
cd server
npx tsc --noEmit
```

---

For more help, open an issue or check the main README.md
