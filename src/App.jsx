import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login"
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import { DoctorProvider } from "./contexts/DoctorContext";
import { PatientProvider } from "./contexts/PatientContext";
import { MainProvider } from "./contexts/MainContext";
import Dashboard from "./components/Dashboard/Dashboard";
import { ReservationProvider } from "./contexts/ReservationContext";


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
      element: <Dashboard />,
    }
  ]);



  return (
      <MainProvider>
        <DoctorProvider>
          <PatientProvider>
            <ReservationProvider>
              <RouterProvider router={router} />
            </ReservationProvider>
          </PatientProvider>
        </DoctorProvider>
      </MainProvider>
  )
}

export default App;
