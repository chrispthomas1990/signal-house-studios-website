import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { AudioProduction } from "./pages/AudioProduction";
import { VideoProduction } from "./pages/VideoProduction";
import { LiveStreaming } from "./pages/LiveStreaming";
import { Contact } from "./pages/Contact";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "audio-production",
          element: <AudioProduction />,
        },
        {
          path: "video-production",
          element: <VideoProduction />,
        },
        {
          path: "live-streaming",
          element: <LiveStreaming />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
      ],
    },
  ],
  {
    basename: "/signal-house-studios-website",
  },
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;