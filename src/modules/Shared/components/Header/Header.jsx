import React from 'react'

function Header({ tag, name,descridsion ,img}) {
  return (
   <>
    <div className='d-flex mt-3  rounded-4 text-white justify-content-around align-items-center bg-success'>
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
