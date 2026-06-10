import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI-Powered Learning for JEE Aspirants
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Personalized study strategies that adapt to your learning style. No more one-size-fits-all coaching.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600"
            >
              Get Started Free
            </Link>
            <button className="border-2 border-primary text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose AdaptiveJEE?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border rounded-lg shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-4">Personalized Learning</h3>
              <p className="text-gray-600">
                AI learns from your performance and adapts content to your learning pace and style.
              </p>
            </div>
            <div className="p-8 border rounded-lg shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-4">Real-time Analytics</h3>
              <p className="text-gray-600">
                Track your progress with detailed insights into weak topics and improvement areas.
              </p>
            </div>
            <div className="p-8 border rounded-lg shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-4">AI Study Planner</h3>
              <p className="text-gray-600">
                Get daily study recommendations optimized for your target score and time constraints.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
