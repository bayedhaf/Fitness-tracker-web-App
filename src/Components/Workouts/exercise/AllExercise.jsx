import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

const AllExercise = () => {
  const [exercises, setExercises] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const imagesPerPage = 8;

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await fetch('https://dummyjson.com/c/c88f-ea45-4f41-9f71');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setExercises(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchExercise();
  }, []);

  const currentExerccise = useMemo(() => {
    const indexOfLastExercise = currentPage * imagesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - imagesPerPage;
    return exercises.slice(indexOfFirstExercise, indexOfLastExercise);
  }, [exercises, currentPage, imagesPerPage]);

  const paginate = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  const totalPages = Math.ceil(exercises.length / imagesPerPage);

  if (loading) return <div className="text-center py-10">Loading products...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  if (exercises.length === 0) return <div className="text-center py-10">No products available</div>;

  const handleImageError = (e) => {
    e.target.src = 'path-to-fallback-image.png'; 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-8">Fitness Track Gallery</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentExerccise.map((exercise) => (
          <Link to={`/Indetails/${exercise.id}`} key={exercise.id} className="block">
            <div
              className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
              role="link"
              tabIndex={0}
              aria-label={`View details for ${exercise.title}`}
              onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.click()}
            >
              <div className="relative pt-[100%] overflow-hidden">
                <img
                  src={exercise.images?.[0] || exercise.image || 'path-to-fallback-image.png'}
                  alt={exercise.title}
                  className="absolute top-0 left-0 w-full h-full object-contain p-4 bg-gradient-to-br from-black to-gray-900"
                  loading="lazy"
                  onError={handleImageError}
                />
              </div>
              <div className="p-4 flex flex-col flex-grow text-gray-300">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{exercise.title}</h3>
                <div className="mt-auto">
                  <p className="text-gray-300 mb-2 line-clamp-3">{exercise.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                      {exercise.rating?.rate ?? 'N/A'} ★
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {exercise.level ?? 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {exercises.length > imagesPerPage && (
        <div className="flex justify-center mt-10">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
              aria-disabled={currentPage === 1}
              className="px-4 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-4 py-2 border-t border-b border-gray-300 ${
                  currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
                aria-current={currentPage === number ? 'page' : undefined}
              >
                {number}
              </button>
            ))}
            
            <button
              onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
              disabled={currentPage === totalPages}
              aria-disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default AllExercise;