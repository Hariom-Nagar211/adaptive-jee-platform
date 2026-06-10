import { useState } from 'react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOption: number;
  topic: string;
  difficulty: number;
}

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const questions: QuizQuestion[] = [
    {
      id: '1',
      question: 'What is the derivative of x²?',
      options: ['x', '2x', '2x²', 'x/2'],
      correctOption: 1,
      topic: 'Calculus',
      difficulty: 2
    },
    {
      id: '2',
      question: 'Which noble gas has the lowest boiling point?',
      options: ['Helium', 'Neon', 'Argon', 'Xenon'],
      correctOption: 0,
      topic: 'Chemistry',
      difficulty: 2
    }
  ];

  const question = questions[currentQuestion];
  const isAnswerCorrect = selectedAnswer === question.correctOption;

  const handleAnswerSelect = (index: number) => {
    if (!showResult) {
      setSelectedAnswer(index);
      setShowResult(true);
      if (index === question.correctOption) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      alert(`Quiz Complete! You scored ${score}/${questions.length}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-primary font-semibold">Score: {score}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-2 flex justify-between items-center">
            <span className="text-sm text-gray-600">{question.topic}</span>
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
              Level {question.difficulty}
            </span>
          </div>

          <h2 className="text-2xl font-bold mb-8 text-gray-900">{question.question}</h2>

          {/* Options */}
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  showResult
                    ? index === question.correctOption
                      ? 'border-green-500 bg-green-50'
                      : index === selectedAnswer
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200'
                    : 'border-gray-200 hover:border-primary hover:bg-blue-50'
                } ${!showResult && 'cursor-pointer'}`}
              >
                <div className="flex items-center">
                  <span
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 ${
                      showResult
                        ? index === question.correctOption
                          ? 'bg-green-500 border-green-500'
                          : index === selectedAnswer
                          ? 'bg-red-500 border-red-500'
                          : 'border-gray-300'
                        : 'border-gray-300'
                    }`}
                  >
                    {showResult && index === question.correctOption && '✓'}
                    {showResult && index === selectedAnswer && index !== question.correctOption && '✗'}
                  </span>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Result Message */}
          {showResult && (
            <div className={`mt-8 p-4 rounded-lg ${isAnswerCorrect ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'}`}>
              <p className={isAnswerCorrect ? 'text-green-800 font-semibold' : 'text-red-800 font-semibold'}>
                {isAnswerCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </p>
            </div>
          )}

          {/* Next Button */}
          {showResult && (
            <button
              onClick={handleNext}
              className="w-full mt-8 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-600"
            >
              {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
