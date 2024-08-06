import React from 'react'
import { Navigate } from 'react-router-dom';
export default function ProtectedRoute({login,children}) {
 console.log(login , "this is login");
 console.log(localStorage.getItem("token"));
 
 if(localStorage.getItem("token") || login ){
 console.log("true");
 
    return children;
   }
   else{
      console.log("false");
      
      return <Navigate to={"/login"}/>
   }
   
}
