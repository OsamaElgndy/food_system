import React from 'react'
import logo from "../../../../imges/logo.png"
import { useForm } from "react-hook-form";
import {  useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';
import axios from 'axios';
function RecipesPass() {
  let navigate = useNavigate()
  let url = "https://upskilling-egypt.com:3006/api/v1/Users/Reset"
  const { handleSubmit, register, formState: { errors } } = useForm();
  const onSubmit = async (values) => {
    try {
      let req = await axios.post(url, values)
      console.log(req.data);
      toast.success("Successfully Reset Password")

      navigate("/login")

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
                <div className='p-4 w-100 text-start'>
                  <h1>Reset Password </h1>
                  <p className='text-p'> pleace Enter your otp or check inbox </p>


                </div>

                <div class="input-group my-3">

                  <div class="input-group-prepend ">
                    <span class="  input-group-text p-3 box  " id="basic-addon1">
                      <i class="fa-regular fa-envelope"></i>
                    </span>
                  </div>
                  <input type="text" class="form-control bg-white "
                    {...register("email", {
                      required: "Required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "invalid email address"
                      }
                    })} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />

                </div>
                <div className='text-danger text-start  text-alert'>

                  {errors.email && errors.email.message}
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text p-3" id="basic-addon1">
                    <i class="fa-solid fa-lock"></i>
                    </span>
                  </div>
                  <input
                    {...register("seed", {

                    })} type="text" class="form-control p-1" placeholder="Otp" aria-label="password" aria-describedby="basic-addon1" />
                </div>
                <div className='text-danger text-alert text-start'>

                  {errors.password && errors.password.message}
                </div>  <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text p-3" id="basic-addon1">
                    <i class="fa-solid fa-lock"></i>
                    </span>
                  </div>
                  <input
                    {...register("password", {
                      validate: value => value.length > 8 || "password not valid!"

                    })} type="password" class="form-control p-1" placeholder="new password" aria-label="password" aria-describedby="basic-addon1" />
                </div>
                <div className='text-danger text-alert text-start'>

                  {errors.password && errors.password.message}
                </div>  <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text p-3" id="basic-addon1">
                    <i class="fa-solid fa-lock"></i>
                    </span>
                  </div>
                  <input
                    {...register("confirmPassword", {
                      validate: value => value.length > 8 || "password not valid!"

                    })} type="password" class="form-control p-1" placeholder="confirm password" aria-label="password" aria-describedby="basic-addon1" />
                </div>
                <div className='text-danger text-alert text-start'>

                  {errors.password && errors.password.message}
                </div>
                <div className='py-2'>

                <button type='sudmint' className='bg-success btn px-4  w-100 mb-3' >Rest Password</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>


    </>

  )
}

export default RecipesPass
