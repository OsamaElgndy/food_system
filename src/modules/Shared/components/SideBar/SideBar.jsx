import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import icon from "../../../../imges/icon.png"
function SideBar({login}) {
  let [fit_side,setFit_side] = useState(false)
  return (

    <>
      <Sidebar
      
       collapsed={fit_side}
        backgroundColor='#1F263E'
        width='100%'
          
        rootStyles={{
        alignItems:"center",
          border:"none",
          height: "100vh",
          color: "white",

          // transparent 
        }}


        
        >
                  <img className='icon' src={icon} alt="" width={100}  style={{marginLeft:fit_side?"-10px":"50px" , scale:fit_side?"1.4":"2.3" }}  onClick={() =>{          setFit_side(!fit_side)
        }}/>
        <Menu
         style={{padding:"80px 0px"}}

          menuItemStyles={{
         
            button: {
         
              ":hover": {
              backgroundColor:"#00924e1f"
              },
              gap: "0px",
              margin: "10px 0px",
              // the active class will be added automatically by react router
              // so we can use it to style the active menu item

            }
            
          }
          }
          >

        
          <MenuItem icon={<i class="fa-solid fa-house"></i>} component={<Link to="/dashboard/home" />}> home</MenuItem>
          <MenuItem icon={<i class="fa-solid fa-users"></i>} component={<Link to="/dashboard/users" />}> users</MenuItem>
          <MenuItem icon={<i class="fa-regular fa-rectangle-list"></i>} component={<Link to="/dashboard/recipesList" />}> recipes</MenuItem>
          <MenuItem icon={<i class="fa-solid fa-table-list"></i>} component={<Link to="/dashboard/categories" />}> categories</MenuItem>
          <MenuItem icon={<i class="fa-solid fa-unlock"></i>} component={<Link to="/register" />}> change password</MenuItem>
          <MenuItem icon={<i class="fa-solid fa-arrow-right-from-bracket"></i>} component={<Link to="/e-commerce" />}> logout </MenuItem>
        </Menu>
      </Sidebar>
    </>
  )
}

export default SideBar
