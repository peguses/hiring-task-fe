import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import { LandingPage } from './pages/LandingPage';
import { Box } from '@chakra-ui/react';
import httpApiKit from "./helpers/axios-http-kit";
import { useUser } from "./hooks/useUser";

function App() {

  const { user, logout } = useUser()

  httpApiKit.interceptors.request.use(
    (config) => {
      const token = user?.token;
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

 
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
  ]);


  return (
    <Box>
      <RouterProvider router={router} />
    </Box>
  )
}

export default App
