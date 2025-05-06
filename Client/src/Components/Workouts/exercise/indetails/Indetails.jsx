import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IndetailAPI from './IndetailAPI';

const Indetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/c/c88f-ea45-4f41-9f71/${id}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch (Status: ${response.status})`);
        }
        
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="text-white text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">Error: {error}</div>;
  }

  if (!post) {
    return <div className="text-white text-center py-8">No product found.</div>;
  }

  return (
    <div className="">
      <IndetailAPI post={post} />
    </div>
  );
};

export default Indetails;