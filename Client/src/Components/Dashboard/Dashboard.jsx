"use client"

import { useState, useEffect } from "react"
import { FiActivity, FiHeart, FiAward } from "react-icons/fi"

const Dashboard = () => {
  const [currentDate] = useState(new Date())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [dashboardData, setDashboardData] = useState({
    stats: [],
    recentWorkouts: [],
    goals: [],
  })

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem("token")

        if (!token) {
          throw new Error("Authentication required. Please log in.")
        }

        // Get user ID from token (if you store it in localStorage)
        // If not stored, you can decode the JWT to get the user ID
        const userId = localStorage.getItem("userId")

        const response = await fetch("http://localhost:8080/dashboard.php", {
          method: "POST", // Changed from GET to POST as backend expects
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }), // Send userId in request body
        })

        if (!response.ok) {
          let errorMessage = "Failed to fetch dashboard data"
          try {
            const errorData = await response.json()
            errorMessage = errorData?.message || errorMessage
          } catch (err) {
            console.error("Dashboard fetch error:", err)
          }
          throw new Error(errorMessage)
        }

        const data = await response.json()

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch dashboard data")
        }

        // Transform backend data to match frontend expectations
        setDashboardData({
          stats: transformStats(data.data),
          recentWorkouts: data.data?.workoutHistory || [],
          goals: generateGoals(data.data), // You might need to generate goals from the data
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  // Transform backend stats to frontend format
  const transformStats = (data) => {
    if (!data || !data.stats) return []

    const stats = []

    // Add workout stats
    if (data.stats.workoutsCompleted !== undefined) {
      stats.push({
        title: "Workouts Completed",
        value: data.stats.workoutsCompleted,
        change: "+3", // You might calculate this from historical data
      })
    }

    // Add calorie stats
    if (data.stats.totalCalories !== undefined) {
      stats.push({
        title: "Calories Burned",
        value: data.stats.totalCalories,
        unit: "kcal",
        change: "+120", // You might calculate this from historical data
      })
    }

    // Add streak stats
    if (data.stats.currentStreak !== undefined) {
      stats.push({
        title: "Current Streak",
        value: data.stats.currentStreak,
        unit: "days",
        change: "+1", // You might calculate this from historical data
      })
    }

    // Add total workouts
    if (data.stats.totalWorkouts !== undefined) {
      stats.push({
        title: "Total Workouts",
        value: data.stats.totalWorkouts,
        change: "+3", // You might calculate this from historical data
      })
    }

    return stats
  }

  // Generate goals based on user data
  const generateGoals = (data) => {
    // This is a placeholder - you would generate real goals based on user data
    return [
      {
        name: "Weekly Workouts",
        target: "5 workouts",
        progress: 60,
      },
      {
        name: "Monthly Calories",
        target: "5000 kcal",
        progress: 45,
      },
      {
        name: "Streak Goal",
        target: "14 days",
        progress: 30,
      },
    ]
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">
            Fitness Dashboard -{" "}
            {currentDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardData.stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <div className="flex items-baseline mt-1">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    {stat.unit && <span className="ml-1 text-sm font-medium text-gray-500">{stat.unit}</span>}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  {stat.title.includes("Calories") ? (
                    <FiHeart className="text-red-500" />
                  ) : stat.title.includes("Heart Rate") ? (
                    <FiHeart className="text-purple-500" />
                  ) : stat.title.includes("Streak") ? (
                    <FiAward className="text-yellow-500" />
                  ) : (
                    <FiActivity className="text-blue-500" />
                  )}
                </div>
              </div>
              <div className="mt-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    stat.change?.startsWith("+") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {stat.change || "0"}
                </span>
                <span className="ml-1 text-xs text-gray-500">vs last week</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Recent Workouts</h3>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-500">View All</button>
            </div>
            <div className="space-y-4">
              {dashboardData.recentWorkouts.length > 0 ? (
                dashboardData.recentWorkouts.map((workout, index) => (
                  <div key={index} className="flex items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FiActivity className="text-blue-600" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{workout.name}</h4>
                      <div className="flex mt-1 text-xs text-gray-500">
                        <span className="flex items-center">
                          <svg
                            className="mr-1 w-3 h-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {workout.duration}
                        </span>
                        <span className="flex items-center ml-4">
                          <svg
                            className="mr-1 w-3 h-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            />
                          </svg>
                          {workout.calories} cal
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">{workout.date}</div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No workout history available yet. Start your fitness journey today!
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Your Goals</h3>
            <div className="space-y-5">
              {dashboardData.goals.map((goal, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{goal.name}</span>
                    <span className="text-xs text-gray-500">{goal.target}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${goal.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Activity</h3>
              <div className="bg-gray-50 rounded-lg h-64 flex items-center justify-center text-gray-400">
                Activity Chart Visualization
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
