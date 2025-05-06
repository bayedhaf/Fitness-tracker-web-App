const NutritionMap = ({ posts }) => {
   return (
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
           {posts.map((post, index) => (
               <div 
                   key={post.id} 
                   className="pb-10 bg-slate-900 flex flex-col items-center text-center gap-3 shadow-xl hover:shadow-2xl p-6 rounded-lg  transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-up  "
                   style={{ animationDelay: `${index * 100}ms` }}
               >
                   <h1 className="text-xl font-semibold text-white">{post.title}</h1>
                   <div className="w-32 h-32 flex items-center justify-center">
                       <img 
                           src={post.image} 
                           alt={post.title} 
                           className="max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-150" 
                       />
                   </div>
                   <p className="text-white h-[80px] overflow-hidden text-ellipsis whitespace-nowrapeft">{post.description}</p>
                   <a href="#" className="underline text-blue-100 hover:text-blue-500 transition-colors duration-300">
                       see more
                   </a>
               </div>
           ))}
       </div>
   );
};

export default NutritionMap;