import React from 'react'
import logo from "../../../../imges/logo.png"
import { useForm } from "react-hook-form";
import {  useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';
import axios from 'axios';
import { email_validation } from '../../../../container/VALDATIONS';
import { USER_URL } from '../../../../container/END_POINTS';
function Forgetpass() {
  let navigate = useNavigate()
  
  const { handleSubmit, register, formState: { errors } } = useForm();
  const onSubmit = async (values) => {
    try {
      let req = await axios.post(USER_URL.resetRequest, values)
      console.log(req.data);
      toast.success(" email is vaild ")
     navigate("/recipesPass")
    } catch (errors) {
      console.log(3);
   toast.error(errors.message)
      
  

}

  }

return (

  <>
  
    <div className='auth-container'>
      <div className='container-fliud  p-5  bg-overlay'>
        <div className='row vh-100    align-items-center  justify-content-center'>
          <div className='col-md-7   col-lg-6 px-lg-3  text-center bg-white rounded rounded-2 ' >
            <div>
              <img src={logo} alt="" className='pt-5' />

            </div>
            <form onSubmit={handleSubmit(onSubmit)}>


              <div class="input-group my-5 ">
                <div className='w-100 pb-5'>

                <h4 className='mb-4'>Forgot Your Password?</h4>
              <p className='text-p mt-2'>No worries! Please enter your email and we will send a password reset link </p>
                </div>

              <div class="input group-prepend  flex ">
                  <span class="input-group-text p-3" id="basic-addon1">
                  <i class="fa-solid fa-mobile-screen-button"></i>
                  </span>
                </div>
                <input type="email" class="form-control "
                  {...register("email", email_validation
                   
                  )} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />

              </div>
              <div className='text-danger text-start  text-alert'>
                {errors.email && errors.email.message}
       
              </div>
              <button type='sudmint' className='bg-success btn px-4  w-100 mb-3' >login</button>
            </form>
         
          </div>
        </div>
      </div>
    </div>


  </>

)
}

export default Forgetpass
