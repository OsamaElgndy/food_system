import React from 'react'
import icone_one from "../../../../imges/error_one.png" 
import icone_tow from "../../../../imges/error_tow.png" 
import icone_title from "../../../../imges/titile.png" 
function NotFound() {
  return (


<>
 
<div className='w-100 ' style={{height:"100vh" ,textTransform:"capitalize"}}>
 <div className='' style={{margin:"100px"}} >
  <img src={icone_title} alt="" />
 </div>
<div style={{margin:"100px 130px" , }}>
  <h1 style={{fontSize:"40px" ,fontWeight:"bolder"}}>oops</h1>
  <h1 style={{fontSize:"33px" , color:"#009247"}}> page not found</h1>
  <p style={{color:"#1F263E", margin:"10px 0px" }}>This Page doesn’t exist or was removed! We suggest you back to home.</p>

  <button style={{margin:"50px 0px " , background:"#009247" , fontSize:"30px" ,padding:"10px 100px", borderRadius:"10px"}}> 
     <i  style={{fontSize:"30px"}} class="fa-solid fa-arrow-left mx-4 bold ">
      </i> Back To Home</button>
</div>

  <div className=' 'style={{position:"absolute",right:"0",  top:"0",}} >
 <img style={{position:"absolute" ,left:"0" , bottom:"0"}} src={icone_one} alt="" />
 <img src={icone_tow} alt="" />
     
  </div>

</div>
</>


)
}

export default NotFound
// @Password321!