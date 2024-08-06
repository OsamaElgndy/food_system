import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import AuthLayout from "./modules/Shared/components/AuthLayout/AuthLayout"
import NotFound from "./modules/Shared/components/NotFound/NotFound"
import MasterLayout from "./modules/Shared/components/MasterLayout/MasterLayout"
import Home from './modules/home/components/Home'
import CategoryList from "./modules/Categories/components/CategoriesList/CategoriesList"
import UsersList from './modules/Users/components/UsersList'
import Login from './modules/Authentication/components/Login/Login';
import ForgetPassword from "./modules/Authentication/components/Forgot_Password/ForgotPassword"
import Register from "./modules/Authentication/components/Register/Register"
import RecipesList from "./modules/Recipes/components/RecipesList/RecipesList"
import RecipesPass from "./modules/Authentication/components/ResetPass/ResetPass"
import './App.css'
import { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from './modules/ProtectedRoute/ProtectedRoute';

function App() {
  // toast.success("Successfuly")

  let [login, setlogen] = useState(null)
  let check_value = () => {
    let token = localStorage.getItem("token")
    const decoded = jwtDecode(token);
    setlogen(decoded)
  }
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [

        { index: true, element: <Login fun={check_value} /> },
        { path: "login", element: <Login fun={check_value} /> },
        { path: "forgetpass", element: <ForgetPassword /> },
        { path: "register", element: <Register /> },
        { path: "recipesPass", element: <RecipesPass /> },



      ]

    },

    {
      path: "dashboard",
      element:
        (
          <ProtectedRoute login={login}>


            <MasterLayout login={login}/>
          </ProtectedRoute>
        ),


      errorElement: <NotFound />,

      children: [

        { index: true, element: <Home login={login} /> },
        { path: "home", element: <Home login={login}/> },
        { path: "recipesList", element: <RecipesList /> },
        { path: "categories", element: <CategoryList /> },
        { path: "users", element: <UsersList /> },
      ]

    }

  ])
  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  )
}

export default App
