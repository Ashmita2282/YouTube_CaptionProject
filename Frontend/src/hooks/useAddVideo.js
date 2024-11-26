import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../redux/slices/authSlice"; // Import the thunk

// Custom hook to add a video
const useAddVideo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token, user } = useSelector((state) => state.auth); // Ensure `token` and `user` are in Redux
  const dispatch = useDispatch();

  const addVideo = async (videoData) => {
    setLoading(true);
    setError(null);

    try {
      // Check if token exists
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      const response = await fetch(
        "http://localhost:4000/api/video/add-video",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Use token from Redux
          },
          body: JSON.stringify(videoData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload video.");
      }

      const data = await response.json(); // Response contains new video ID

      // Dispatch getUserData to fetch updated user info 
      dispatch(getUserData());

      //update Redux state and localStorage directly
         return data; // Return the full video object


      return data;
    } catch (err) {
      setError(err.message);
      console.error("Error while uploading:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return { addVideo, loading, error };
};

export default useAddVideo;