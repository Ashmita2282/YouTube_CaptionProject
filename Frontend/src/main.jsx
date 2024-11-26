import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./redux/store.js";
import "./index.css"; // Import Tailwind CSS
import Home from "./pages/Home"; // Home page component
import SignIn from "./pages/Login.jsx"; // SignIn page component
import Register from "./pages/Register.jsx"; // Register page component
import VideoList from "./components/VideoList.jsx";

// Eagerly preload the frequently used components
import Channel from "./pages/Channel.jsx";
import VideoPlayer from "./components/VideoPlayer.jsx";
import NotFound from "./pages/NotFound.jsx";

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // Home is now the main component
    children: [
      { path: "/", element: <VideoList /> },
      { path: "signin", element: <SignIn /> },
      { path: "register", element: <Register /> },
      { path: "channel/:id", element: <Channel /> }, // Preloaded Channel component
      { path: "videoPlayer/:id", element: <VideoPlayer /> }, // Preloaded VideoPlayer component
      { path: "*", element: <NotFound /> }, // Preloaded NotFound component
    ],
  },
]);

// Preload effect for components
function Preloader() {
  useEffect(() => {
    // Add a small preload effect to optimize rendering later
    import("./pages/Channel.jsx");
    import("./components/VideoPlayer.jsx");
    import("./pages/NotFound.jsx");
  }, []);
  return null;
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Preloader /> {/* Preloader runs when the app starts */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
