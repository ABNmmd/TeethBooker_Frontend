import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login"
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import PatientDashboard from "./components/Dashboard/Patient Dashboard/PatientDashboard";
import { DoctorProvider } from "./contexts/DoctorContext";
import { PatientProvider } from "./contexts/PatientContext";
import { MainProvider } from "./contexts/MainContext";


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
      element: <PatientDashboard />,
    }
  ]);



  return (
    <MainProvider>
      <DoctorProvider>
        <PatientProvider>
          <RouterProvider router={router} />
        </PatientProvider>
      </DoctorProvider>
    </MainProvider>
  )
}

export default App;
