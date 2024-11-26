import React from "react";
import { useFetchVideos } from "../hooks/useFetchVideos";
import VideoCard from "./VideoCard";
import { Link, useOutletContext } from "react-router-dom"; // To access context passed from Home.jsx
import Loading from "./Loading";

const VideoList = ({ isVerticalLayout }) => {
  const { searchTerm, selectedCategory } = useOutletContext(); // Access the search and category state

  const { videos, loading, error } = useFetchVideos();

  if (loading) return <Loading />; // Show loading spinner while fetching videos

  if (error) {
    // Handle errors gracefully
    return (
      <div className="mt-10 flex justify-center items-center text-red-500 text-lg">
        <p>Something went wrong! Please try again later.</p>
      </div>
    );
  }

  const filteredVideos = videos
    .filter(
      (video) =>
        selectedCategory === "All" || video.category === selectedCategory
    )
    .filter((video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (filteredVideos.length === 0) {
    // Handle no videos found
    return (
      <div className="mt-10 flex justify-center items-center text-gray-500 text-lg">
        <p>No videos found. Try a different search or category.</p>
      </div>
    );
  }

  return (
    <div
      className={`${
        isVerticalLayout
          ? "mt-6 flex flex-col gap-4" // Stacked layout for vertical
          : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-36" // Grid layout for default
      }`}
    >
      {filteredVideos.map((video) => (
        <Link to={`/videoPlayer/${video._id}`} key={video._id}>
          <VideoCard video={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoList;
