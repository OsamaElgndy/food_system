import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import "./App.css";
import Login from "./AuthModule/Components/Login/Login";
import Home from "./HomeModule/Components/Home/Home";
import MasterLayout from "./SharedModule/Components/MasterLayout/MasterLayout";
import NotFound from "./SharedModule/Components/NotFound/NotFound";
import UsersList from "./UsersModule/Components/UsersList/UsersList";
import RecipesList from "./RecipesModule/Components/RecipesList/RecipesList";
import CategoriesList from "./CategoriesModule/Components/CategoriesList/CategoriesList";
import AuthLayout from "./SharedModule/Components/AuthLayout/AuthLayout";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import PotectedRoute from "./SharedModule/Components/ProtectedRoute/PotectedRoute";
import ResetPass from "./AuthModule/Components/ResetPass/ResetPass";
import ResetPassRequest from "./AuthModule/Components/ResetPassRequest/ResetPassRequest";
import { ToastContainer } from "react-toastify";
import ChangePass from "./AuthModule/Components/ChangePass/ChangePass";
import Regester from  "../src/AuthModule/Components/Regester/Regester"
import Verify from "./AuthModule/Components/Verify/Verify";
import Favorites  from "./Favorites/Favorites"
function App() {
  const [adminData, setAdminData] = useState(null);

  let saveAdminData = () => {
    let encodedToken = localStorage.getItem("adminToken");
    let decodedToken = jwtDecode(encodedToken);
    setAdminData(decodedToken);
  };
  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      saveAdminData(); //call
    }
  }, []);
  const routes = createHashRouter([
    {
      path: "dashboard",
      element: (
        <PotectedRoute  adminData={adminData}>
          <MasterLayout adminData={adminData} />
        </PotectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "users", element: <UsersList /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "categories", element: <CategoriesList /> },
        { path: "favorites", element: <Favorites /> },
      ],
    },
    {
      path: "/",
      element:<AuthLayout /> ,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveAdminData={saveAdminData} /> },
        { path: "login", element: <Login saveAdminData={saveAdminData} /> },
        { path: "change-password", element: <ChangePass /> },
        { path: "reset-password", element: <ResetPass /> },
        { path: "reset-password-request", element: <ResetPassRequest /> },
        { path: "Regester", element: < Regester/> },
        { path: "verify", element: < Verify/> },
        
      ],
    },
  ]);

  return (
    <>  <ToastContainer />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
