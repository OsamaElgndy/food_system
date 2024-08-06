import React from 'react'
import Header from '../../Shared/components/Header/Header'
import icone from "../../../imges/home.png"
function Home({login}) {
   return (
      <>

     <div className='container'>

<Header
tag="welcome"
name={login.userName}
descridsion={"This is a welcoming screen for the entry of the application , you can now see the options"}

img={icone}
/>


<section  className='container' style={{padding:"10px 80px" ,marginTop:"20px", background:"#F0FFEF"}}>
           <div className=' d-flex  rounded-4  align-items-center  justify-content-between'>

           <div  style={{width:"490px" }}>
            <h1>Fill the Recipes !</h1>
            <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
           </div>
           
           <div>

               <button  className='  p-2  rounded-3 d-flex justify-content-evenly  align-items-center ' style={{width:"200px" , background:"#009247" , color:"white"}}> fill recipes <span><i class="fa-solid fa-arrow-right"></i></span> </button>
           </div>
           </div>
            </section>

</div>


      </>
   )
}

export default Home
