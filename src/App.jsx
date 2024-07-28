import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthLayout from "./modules/Shared/components/AuthLayout/AuthLayout"
import NotFound from "./modules/Shared/components/NotFound/NotFound"
import MasterLayout from "./modules/Shared/components/MasterLayout/MasterLayout"
import Home from './modules/home/components/Home'
import Categories from "./modules/Categories/components/CategoriesList/CategoriesList"
import UsersList from './modules/Users/components/UsersList'
import Login from "./modules/Authentication/components/Login/Login"
import ForgetPassword from "./modules/Authentication/components/Forgot_Password/ForgotPassword"
import Register from "./modules/Authentication/components/Register/Register"
import RecipesList from "./modules/Authentication/components/ResetPass/ResetPass"
function App() {

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement:<NotFound/>,
      children: [

           {index:true ,element:<Login/>},
           {path:"login" , element:<Login/>},
           {path:"forgetpass" , element:<ForgetPassword/>},
           {path:"register" , element:<Register/>},
           {path:"recipesPass" , element:<RecipesList/>}, 



      ]

    },

    {
      path: "DashBord",
      element: <MasterLayout />,
      errorElement:<NotFound/>,
  
      children: [

        {index:true ,element:<Home/>},
        {path:"home" , element:<Home/>},
        {path:"categories " , element:<Categories/>},
        {path:"Register" , element:<Register/>},
        {path:"RecipesList" , element:<RecipesList/>}, 
        {path:"users" , element:<UsersList/>}, 
      ]

    }
  ])
  return ( 
    <>

<RouterProvider router={routes}/>
    </>
  )
}

export default App
