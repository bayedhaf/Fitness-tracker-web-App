import Work from "./Work";
import Posts from "./TypyData"

const Workouts = () => {
    return (
        <div className="pt-10">
           
            <div className="w-full h-96 bg-[url('/assets/image/jym.jpg')] bg-cover bg-center bg-no-repeat relative">
           
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                   
                    <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                       STRONGER THAN<hr/>
                     <h1 className="mt-7 text-orange-500">YESTERDAY</h1>
                    </h1>
                </div>
            </div>
            <Work posts={Posts}/>

        </div>
    );
};

export default Workouts;