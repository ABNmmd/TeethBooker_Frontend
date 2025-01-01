import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login"
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import PatientDashboard from "./components/PatientDashboard";


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
      element: <Register />,
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
