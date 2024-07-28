import React from 'react'
import SliderBar from "../SideBar/SideBar"
import NavBar from "../NavBar/NavBar"
import Home from '../../../home/components/Home'
import { Outlet } from 'react-router-dom'
function MasterLayout() {
  return (
    <>

       <div className='container-fliud'>

        <div className='row'>
          <div className='col-md-3 bg-danger'>
            <SliderBar/>
          </div>
          <div className='col-md-9 bg-warning' >
            <NavBar/>
            <Outlet/>
          </div>

        </div>


       </div>

    </>
  )
}

export default MasterLayout
