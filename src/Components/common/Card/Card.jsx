import { useState, useEffect } from 'react';

const Card = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const imagesPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products?limit=20');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Calculate current products to display
  const indexOfLastProduct = currentPage * imagesPerPage;
  const indexOfFirstProduct = indexOfLastProduct - imagesPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(products.length / imagesPerPage);

  if (loading) return <div className="text-center py-10">Loading products...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Product Gallery</h1>
      
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div key={product.id} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
            <div className="relative pt-[100%] overflow-hidden">
              <img 
                src={product.image} 
                alt={product.title} 
                className="absolute top-0 left-0 w-full h-full object-contain p-4 bg-white"
                loading="lazy"
              />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
              <div className="mt-auto">
                <p className="text-gray-600 mb-2 line-clamp-3">{product.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-lg">${product.price}</span>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                    {product.rating.rate} ★
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {products.length > imagesPerPage && (
        <div className="flex justify-center mt-10">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-4 py-2 border-t border-b border-gray-300 ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
              >
                {number}
              </button>
            ))}
            
            <button
              onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
              disabled={currentPage === totalPages}
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

export default Card;