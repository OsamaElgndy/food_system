import React from 'react'
import icone from "../../../../imges/Ellipse.png"
function NavBar({login}) {
 console.log(login.userEmail );
  return (
    <>
    <nav class="navbar  navbar-light bg-light">
  <form class="form-inline d-flex justify-content-around align-items-center "   style={{width:"100%"}}>
    <div class="input-group w-100  "  >
      <div class="input-group-prepend " >
        <span class="input-group-text bg-white  " style={{padding:"10px " , borderRadius:"20px 0px 0px 20px" ,border:"none" ,height:"30px"}} id="basic-addon1"> <i class="fa-solid fa-magnifying-glass"></i></span>
      </div>
      <input type="text" class=" bg-white w-50 "style={{border:"none" ,borderRadius:" 0px 20px 20px 0px"  ,outline:"none"}}  placeholder="Search.." aria-label="Username" aria-describedby="basic-addon1"/>
    </div>
    <div className='d-flex gap-3 align-items-center  ' style={{margin:" 0px 100px"}}>
     
    <div className='d-flex align-items-center gap-2' >
      <img src={icone} alt="" />
      <h5>{login.userName}</h5>
    </div>




    <div class="dropdown " style={{margin:"0px 20px"}}>
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
   
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
  </div>
</div>
 
 <div>
  <h2>

 <i class="fa-solid fa-bell"></i>
  </h2>
 </div>
    </div>

  </form>

</nav>
    
    </>

  )
}

export default NavBar
