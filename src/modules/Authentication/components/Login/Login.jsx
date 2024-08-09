import React, { useState   ,useEffect} from 'react'
import logo from "../../../../imges/logo.png"
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';
import axios from 'axios';
import {email_validation , password_validation} from "../../../../container/VALDATIONS"
import { USER_URL } from '../../../../container/END_POINTS';

function login({fun}) {
  
  let navigate = useNavigate()
  let [view_passowrd , setView_password] = useState(false)
  useEffect(() =>{
    if(localStorage.getItem("token")){
      
  navigate("/dashboard")
  }
  fun()
  
  } ,[])



  

  const { handleSubmit, register, formState: { errors } } = useForm();
  const onSubmit = async (values) => {
    try {
      let req = await axios.post(USER_URL.login, values)
      console.log(req.data.token);
      localStorage.setItem("token" , req.data.token)
      toast.success("login  Successfully")
      navigate("/dashboard")
      fun()
      

    } catch (errors) {
   toast.error(errors.message)
      

}
  }

return (

  <>
    {/* <ToastContainer /> */}
    <div className='auth-container'>
      <div className='container-fliud  p-5  bg-overlay'>
        <div className='row vh-100    align-items-center  justify-content-center'>
          <div className='col-md-7   col-lg-6 px-lg-3  text-center bg-white rounded rounded-2 ' >
            <div>
              <img src={logo} alt="" className='pt-5' />

            </div>
            <form onSubmit={handleSubmit(onSubmit)}>


              <div class="input-group my-4">
                <div class="input-group-prepend">
                  <span class="input-group-text p-3" id="basic-addon1">
                    <i class="fa-regular fa-envelope"></i>
                  </span>
                </div>
                <input type="text" class="form-control"
                  {...register("email", email_validation 
                  )} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />

              </div>
              <div className='text-danger text-start  text-alert'>

                {errors.email && errors.email.message}
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text p-3" id="basic-addon1">
                    <i class="fa-solid fa-key"></i>
                  </span>
                </div>
                <input
                  {...register("password",  password_validation )} type={view_passowrd?"password" : "text"} class="form-control p-1" placeholder="password" aria-label="password" aria-describedby="basic-addon1" />
                 <span onClick={() =>{
                   setView_password(!view_passowrd)
                 }} class="input-group-text p-3">

                  <i class="fa-solid fa-arrows-to-eye"></i>
                 </span>
              </div>
              <div className='text-danger text-alert text-start'>

                {errors.password && errors.password.message}
              </div>
              <button type='sudmint' className='bg-success btn px-4  w-100 mb-3' >login</button>
            </form>
            <div className='text-info'>

              <Link > Register naw? </Link>
              <Link to={"/forgetpass"}> forgot ForgetPassword
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>


  </>

)
}

export default login
