import React from 'react'
import svg  from "../../../../imges/bg-container.svg"

function Header({ tag, name,descridsion ,img}) {
  return (
   <>
      
    <div style={{position:"relative" ,overflow:"hidden"}} className='d-flex mt-3  rounded-4 text-white text-center p-3 justify-content-between align-items-center bg-success  flex-column  flex-sm-row'>
  <img src={svg}  style={{position:"absolute"  }} alt="" />
   <div style={{width:"480px"}}>

      <h1>{tag} {"    " +name}</h1>
      <p>{descridsion}</p>
    </div>
    <div>
      <img src={img} alt="" />
    </div>
   
   </div>
   </>
  )
}

export default Header
