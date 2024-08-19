import React, { createContext, useEffect, useState } from 'react'


import { jwtDecode } from "jwt-decode";

export const Login_data = createContext(null)


export default function Context({ children }) {

  const [login, setLogin] = useState("")

  const dj_code = () => {
    let token = localStorage.getItem("adminToken")
    const decoded = jwtDecode(token);
    setLogin(decoded)
  }



  return (

    <Login_data.Provider value={{login , dj_code }}>
      {children}

    </Login_data.Provider>

  )
}
