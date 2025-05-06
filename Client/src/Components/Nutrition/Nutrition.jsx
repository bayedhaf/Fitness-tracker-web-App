import StaticData from "./StaticJSON";
import NutritionMap from "./NutritionMap";

const Nutrition = () => {
    return (
       <div className="min-h-screen bg-gradient-to-br from-black to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
          <div className="min-h-screen bg-gradient-to-br from-black to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
             <div className="pt-28">
                <h1 className="text-2xl text-orange-400 sm:text-3xl md:text-4xl font-bold mt-6 mb-7 text-center px-4 sm:px-8 md:px-12 leading-normal sm:leading-relaxed animate-fade-in-up">
                    Each nutrient performs different functions in our body, 
                    they all work together and contribute to our good health by having a balanced diet.
                </h1>
             </div>
             <div className="animate-fade-in-up delay-100">
                <NutritionMap posts={StaticData}/>
             </div>
        </div>
       </div>
    );
};

export default Nutrition;