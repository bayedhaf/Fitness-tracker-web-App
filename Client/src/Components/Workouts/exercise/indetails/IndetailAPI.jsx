import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const IndetailAPI = ({ post }) => {
  return (
    <div key={post.id} className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
     
      <div 
        className="text-white pt-20 mt-10 gap-8 justify-between grid grid-cols-3 w-full h-96 bg-[url('/assets/image/jym.jpg')] bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: post.images?.[0] ? `url(${post.images[0]})` : "url('/assets/image/jym.jpg')" }} 
      >
        <div className="pl-9 text-white">
          <h1 className="text-2xl font-bold">{post.title}</h1> 
        </div>
        <div className="text-center self-center">{post.level?.name || post.level}</div> 
        <div className="flex justify-center items-center pr-9">
          <Link
            to="/AllExercise"
            className="inline-block px-6 py-2 rounded-full bg-orange-400 text-white font-medium hover:bg-orange-500 transition-colors border border-blue-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            <span className="flex flex-row gap-4 items-center">
              <FaArrowLeft className="font-bold text-xl" /> Back to
            </span>
          </Link>
        </div>
      </div>

     
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 px-4 sm:px-8 lg:px-12 xl:px-20 mt-7 text-white">
     
        <div className="flex-1 min-w-0 bg-gray-800/20 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Steps to Follow</h3> 
          <p className="whitespace-pre-line">{post.description || "No description provided."}</p> 
        </div>

    
        <div className="flex-1 min-w-0 rounded-lg overflow-hidden bg-gray-800/20 p-4">
          <img
            src={post.images?.[0] || post.image || '/assets/image/fallback.jpg'}
            alt={post.title}
            className="w-full h-auto max-h-96 object-cover rounded-lg"
            onError={(e) => e.target.src = '/assets/image/fallback.jpg'} 
          />
        </div>
      </div>

   
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 px-4 sm:px-8 lg:px-12 xl:px-20 mt-7 text-white">
     
        <div className="flex-1 min-w-0 rounded-lg overflow-hidden bg-gray-800/20 p-4">
          <img
            src={post.images?.[1] || post.image || '/assets/image/fallback.jpg'} 
            alt={post.title}
            className="w-full h-auto max-h-96 object-cover rounded-lg"
            onError={(e) => e.target.src = '/assets/image/fallback.jpg'}
          />
        </div>

       
        <div className="flex-1 min-w-0 bg-gray-800/20 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Pro Tips</h3> 
          <p className="whitespace-pre-line">{post.tips || "No tips available."}</p>
        </div>
      </div>
    </div>
  );
};

export default IndetailAPI;