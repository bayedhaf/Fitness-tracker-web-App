import { Link } from "react-router-dom";


const Work = ({ posts }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8 py-12 bg-[linear-gradient(45deg,black_0%,white_600%)] h-full w-full text-white">
            {posts.map((post, index) => (
                <div 
                    key={post.id} 
                    className="text-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 bg-[linear-gradient(45deg,black_0%,white_600%)] h-full w-full transform hover:-translate-y-1 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                   
                    <div className="h-48  overflow-hidden bg-[linear-gradient(45deg,black_0%,white_600%)]  w-full">
                        <img 
                            src={post.image}
                            alt={post.title || "Work image"}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            loading="lazy"
                        />
                    </div>
                    
                 
                    <div className="p-6">
                        <h1 className="text-xl font-bold text-white text-center mb-2">{post.title}</h1>
                        <p className="text-white text-center">{post.description}</p>
                        <p className="mt-8 text-center tex-white hover:text-blue-100 underline"><Link to="/AllExercise">see more</Link> </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Work;