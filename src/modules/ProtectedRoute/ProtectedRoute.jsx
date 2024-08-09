import React from 'react'
import { Navigate } from 'react-router-dom';
export default function ProtectedRoute({login,children}) {
 
 if(localStorage.getItem("token") || login ){
    return children;
   }
   else{
      
      return <Navigate to={"/login"}/>
   }
   
}
