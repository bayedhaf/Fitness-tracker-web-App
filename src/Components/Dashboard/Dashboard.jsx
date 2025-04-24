

const Dashboard = () => {
  
        return (
            <div className="min-h-screen pt-16 bg-gray-100"> 
           
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">workout</h2>
                    <p>Your recent workout statistics...</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Nutrition Overview</h2>
                    <p>Your daily nutrition intake...</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Progress Tracking</h2>
                    <p>Your fitness progress...</p>
                  </div>
                </div>
              </div>
            </div>
          );
        
};

export default Dashboard;