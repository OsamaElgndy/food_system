import React from 'react'
import NavBar from "../NavBar/NavBar"
import Home from '../../../home/components/Home'
import { Outlet, useNavigate } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'
function MasterLayout({login}) {
  


  return (
    <>




     <div style={{textTransform:"capitalize"}} >
  <div class="d-flex ">
    <div class=" ">
     <div style={{overflow:"hidden", borderRadius:"0px 70px 0px 0px" } }>
      <SideBar/>
      
     </div>
    </div>
    <div className='w-100'>
      <div class=" ">
        <div className='container '>


        <NavBar login={login}/>
        </div>
         <Outlet login={login}/>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default MasterLayout
