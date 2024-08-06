import React from 'react'
import logo from "../../../../imges/logo.png"
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import { useNavigate } from 'react-router-dom'
function Register({ fun }) {

  let [view_passowrd, setView_password] = useState(false)

  let navigate = useNavigate()
  let url = 'https://upskilling-egypt.com:3006/api/v1/Users/Login'
  const { handleSubmit, register, formState: { errors } } = useForm();
  const onSubmit = async (values) => {
    try {
      let req = await axios.post(url, values)
      console.log(req.data.token);
      localStorage.setItem("token", req.data.token)
      fun()
      toast.success("login  Successfully")
      navigate("/dashboard")


    } catch (errors) {
      toast.error(errors.message)


    }
  }
  return (

    <>
      {/* <ToastContainer /> */}
      <div className='auth-container' >
        <div className='container-fliud  p-5  bg-overlay'>
          
          <div className='row vh-100    align-items-center  justify-content-center'>
            <div className='col-md-7   col-lg-6 px-lg-3  text-center bg-white rounded rounded-2 ' >
              <div>
                <img src={logo} alt="" className='pt-5' />
              </div>
              <div className='text-start'>

<h1> Register</h1>
<p>welcom back ! please enter your details</p>
              </div>
          
              <form onSubmit={handleSubmit(onSubmit)} >
                <div style={{ display: "flex ", justifyContent: "space-between" ,gap:"40px" }}>
                  <div>


                    <div class="input-group my-4">
                      <div class="input-group-prepend">
                        <span class="input-group-text p-3" id="basic-addon1">
                        <i class="fa-solid fa-mobile-screen-button"></i>
                        </span>
                      </div>
                      <input type="text" class="form-control"
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
                        {...register("country", {
                          validate: value => value.length > 8 || "password not valid!"

                        })} type={view_passowrd ? "password" : "text"} class="form-control p-1" placeholder="country" aria-label="password" aria-describedby="basic-addon1" />

                    </div>
                    <div className='text-danger text-alert text-start'>

                      {errors.password && errors.password.message}

                    </div>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text p-3" id="basic-addon1">
                          <i class="fa-solid fa-lock"></i>
                        </span>
                      </div>
                      <input
                        {...register("password", {
                          validate: value => value.length > 8 || "password not valid!"

                        })} type={view_passowrd ? "password" : "text"} class="form-control p-1" placeholder="password" aria-label="password" aria-describedby="basic-addon1" />
                      <span onClick={() => {
                        setView_password(!view_passowrd)
                      }} class="input-group-text p-3">
                        <i class="fa-solid fa-arrows-to-eye"></i>
                      </span>
                    </div>
                    <div className='text-danger text-alert text-start'>

                      {errors.password && errors.password.message}
                    </div>
                  </div>

                  <div>



                    < div class="input-group my-4">
                      <div class="input-group-prepend">
                        <span class="input-group-text p-3" id="basic-addon1">
                          <i class="fa-solid fa-mobile-screen-button"></i>
                        </span>
                      </div>
                      <input type="text" class="form-control"
                        {...register("email", {
                          required: "Required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                          }
                        })} placeholder="Username" aria-label="enter your-email" aria-describedby="basic-addon1" />

                    </div>
                    <div className='text-danger text-start  text-alert'>

                      {errors.email && errors.email.message}
                    </div>

                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text p-3" id="basic-addon1">
                          <i class="fa-solid fa-mobile-screen-button"></i>
                        </span>
                      </div>
                      <input
                        {...register("password", {
                          validate: value => value.length > 8 || "password not valid!"

                        })} type={view_passowrd ? "password" : "text"} class="form-control p-1" placeholder="phone" aria-label="password" aria-describedby="basic-addon1" />

                    </div>
                    <div className='text-danger text-alert text-start'>

                      {errors.password && errors.password.message}

                    </div>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text p-3" id="basic-addon1">
                          <i class="fa-solid fa-key"></i>
                        </span>
                      </div>
                      <input
                        {...register("password", {
                          validate: value => value.length > 8 || "password not valid!"

                        })} type={view_passowrd ? "password" : "text"} class="form-control p-1" placeholder="confirem password" aria-label="password" aria-describedby="basic-addon1" />
                      <span onClick={() => {
                        setView_password(!view_passowrd)
                      }} class="input-group-text p-3">

                        <i class="fa-solid fa-arrows-to-eye"></i>
                      </span>
                    </div>
                    <div className='text-danger text-alert text-start'>

                      {errors.password && errors.password.message}
                    </div>
                  </div>


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

export default Register
