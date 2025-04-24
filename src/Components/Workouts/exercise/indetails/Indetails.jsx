import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IndetailAPI from './IndetailAPI';

const Indetails = () => {
  const { id } = useParams(); // Get product ID from URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setPost(data); // Only one product
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Re-run if id changes

  if (loading) return <div className="text-white text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;
  if (!post) return <div className="text-white text-center">No product found</div>;

  return (
    <div className="">
      <IndetailAPI post={post} />
    </div>
  );
};

export default Indetails;
