import { useState, useEffect } from 'react';
import { FiTrendingUp, FiTarget, FiAward, FiCalendar, FiBarChart2 } from 'react-icons/fi';

const Progress= () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progressData, setProgressData] = useState({
    metrics: [],
    goalProgress: [],
    workoutHistory: [],
    bodyMeasurements: []
  });

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('http://localhost:8080/progress.php');
        
        if (!response.ok) {
          throw new Error('Failed to fetch progress data');
        }
        
        const data = await response.json();
        setProgressData({
          metrics: data.metrics || [],
          goalProgress: data.goalProgress || [],
          workoutHistory: data.workoutHistory || [],
          bodyMeasurements: data.bodyMeasurements || []
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading progress data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex mt-28 items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Error Loading Progress Data</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
 
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-800">Fitness Progress Tracker</h1>
          <p className="text-gray-600 mt-1">Track your fitness journey and achievements</p>
        </div>
      </header>

    
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Key Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {progressData.metrics.map((metric, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{metric.title}</p>
                    <div className="flex items-baseline mt-1">
                      <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                      {metric.unit && <span className="ml-1 text-sm font-medium text-gray-500">{metric.unit}</span>}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50">
                    {metric.trend === 'up' ? (
                      <FiTrendingUp className="text-green-500" />
                    ) : (
                      <FiTrendingUp className="text-red-500 transform rotate-180" />
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    metric.change.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {metric.change} vs last month
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

       
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
          <section className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Goal Progress</h2>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-500">View All Goals</button>
            </div>
            <div className="space-y-6">
              {progressData.goalProgress.map((goal, index) => (
                <div key={index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{goal.name}</h3>
                    <span className="text-sm text-gray-500">{goal.current}/{goal.target} {goal.unit}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className="bg-blue-600 h-3 rounded-full"
                      style={{ width: `${goal.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Start: {goal.startValue}{goal.unit}</span>
                    <span>Target: {goal.target}{goal.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        
          <section className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Body Measurements</h2>
            <div className="space-y-4">
              {progressData.bodyMeasurements.map((measurement, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-gray-50 mr-3">
                      {measurement.type === 'weight' ? (
                        <FiTarget className="text-purple-500" />
                      ) : measurement.type === 'muscle' ? (
                        <FiAward className="text-yellow-500" />
                      ) : (
                        <FiBarChart2 className="text-blue-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 capitalize">{measurement.type}</p>
                      <p className="text-xs text-gray-500">{measurement.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{measurement.value}{measurement.unit}</p>
                    <p className={`text-xs ${measurement.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {measurement.change} vs last
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

      
        <section className="mt-8 bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Workout History</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                30 Days
              </button>
              <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                90 Days
              </button>
              <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                All Time
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Workout
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Calories
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {progressData.workoutHistory.map((workout, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {workout.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{workout.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {workout.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {workout.calories}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        workout.progress === 'improved' ? 'bg-green-100 text-green-800' : 
                        workout.progress === 'same' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {workout.progress}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Progress;