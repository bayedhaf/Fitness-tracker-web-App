import Work from "./Work";
import Posts from "./TypyData";

const Workouts = () => {
  return (
    <div className="pt-10">
   
      <div className="w-full h-96 bg-[url('/assets/image/jym.jpg')] bg-cover bg-center bg-no-repeat relative">
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">STRONGER THAN</h1>
            <hr className="my-2 border-orange-400 w-32 mx-auto" />
            <h2 className="mt-4 text-3xl text-orange-500 font-semibold drop-shadow-md">YESTERDAY</h2>
          </div>
        </div>
      </div>

 
      <Work posts={Posts} />
    </div>
  );
};

export default Workouts;
