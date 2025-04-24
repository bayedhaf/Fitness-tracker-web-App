const IndetailAPI = ({ post }) => {
    return (
        <div key={post.id}  className=" min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-white pt-20 mt-10 gap-8 justify-between grid grid-cols-3 w-full h-96 bg-[url('/assets/image/jym.jpg')] bg-cover bg-center bg-no-repeat relative">
            <div className="pl-9 text-white"><h1>{post.title}</h1></div> 
            <div className="">post</div>       
            <div className="">post</div>         
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-1 justify-between gap-4 text-white">
            <div className="">{post.description}</div>        
            <div className=""><img src={post.image} alt={post.image} /></div>       
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-1 justify-between gap-4 text-white">
            <div className="">post p</div>        
            <div className="">post</div>        
        </div>
    </div>
    );
};
 export default IndetailAPI;