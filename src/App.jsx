import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login"
import NotFound from "./pages/NotFound";


function App() {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/",
      element: null,
    },
    {
      path: "/register",
      element: null,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: null,
    }
  ]);



  return (
    <RouterProvider router={router} />
  )
}

export default App;
