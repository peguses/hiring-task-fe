import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import { LandingPage } from './pages/LandingPage';
import { Box } from '@chakra-ui/react';

function App() {

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
