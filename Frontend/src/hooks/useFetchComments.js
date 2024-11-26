import { useState, useEffect } from "react";
import axios from "axios";

const useFetchComments = (videoId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!videoId) return;

    const fetchComments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:4000/api/comments/${videoId}`
        );
        setComments(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch comments.");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [videoId]);

  return { comments, loading, error };
};

export default useFetchComments;
