import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch('/api/students/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setStudent(data);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  const mockProgressData = [
    { topic: 'Physics', accuracy: 65 },
    { topic: 'Chemistry', accuracy: 72 },
    { topic: 'Maths', accuracy: 58 }
  ];

  const mockTrendData = [
    { day: 'Mon', score: 65 },
    { day: 'Tue', score: 68 },
    { day: 'Wed', score: 70 },
    { day: 'Thu', score: 68 },
    { day: 'Fri', score: 75 },
    { day: 'Sat', score: 78 }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome, {student?.name || 'Student'}!</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Overall Accuracy</p>
          <p className="text-3xl font-bold text-primary">{student?.performance?.overallAccuracy || 0}%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Questions Attempted</p>
          <p className="text-3xl font-bold text-secondary">{student?.performance?.totalQuestionsAttempted || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Target Score</p>
          <p className="text-3xl font-bold text-accent">{student?.targetScore || 300}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Weak Topic</p>
          <p className="text-lg font-bold">Mathematics</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Topic-wise Accuracy</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="topic" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="accuracy" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Weekly Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-blue-50 border-l-4 border-primary p-6 rounded mt-8">
        <h2 className="text-xl font-bold mb-4">📚 Recommended Study Plan</h2>
        <ul className="space-y-2">
          <li>✓ Focus on Mathematics: Complete 15 questions on Integration</li>
          <li>✓ Revise Physics: Circular Motion (70% accuracy)</li>
          <li>✓ Practice Chemistry: Organic Compounds (weak area)</li>
        </ul>
      </div>

      <button
        onClick={() => navigate('/quiz')}
        className="mt-8 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600"
      >
        Start Practice Quiz
      </button>
    </div>
  );
}
