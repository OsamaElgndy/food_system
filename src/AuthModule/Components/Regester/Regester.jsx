import React, { useState } from "react";
import logo from "../../../assets/images/4.png";
import axios from "axios";
import { useForm } from "react-hook-form";
import bg_img from "../../../assets/images/nodata.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import PreLoader from "../../../SharedModule/Components/PreLoader/PreLoader";
import { USER_URL } from "../../../container/END_POINTS";

export default function Regester() {

  const [showPass, setShowPass] = useState(false);
  const clickHandler = () => {
    setShowPass(!showPass);
  };


  const [showLoading, setShowLoading] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 
//   form data  
const  form_data = (values ) =>{
  console.log(values);
  
 let data = new FormData()
  
 data.append("userName" , values.userName )
 data.append("email", values.email  )
 data.append("country" , values.country  )
 data.append("phoneNumber" , values.phoneNumber  )
 data.append("profileImage" , values.profileImage[0] )
 data.append("password" , values.password  )
 data.append("confirmPassword" , values.confirmPassword)
return data
}

 
const onSubmit = (data) => {
  console.log(data);
  let post_data = form_data(data)
  setShowLoading(true);
  axios
    .post(USER_URL.register, post_data

    )
    .then((response) => {
      console.log(data);
      setShowLoading(false);
      navigate("/verify");

      toast.success(response?.message || "Password changed successfully", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    })
    .catch((error) => {
      console.log(error);
      
      toast.error(
        error?.response?.data?.message ||
   
        {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        }
      );
      setShowLoading(false);
      })
};

  

  return showLoading ? (
    <PreLoader />
  ) : (
    <div className="Auth-container container-fluid">
      <div className="row bg-overlay vh-100 justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="bg-white rounded p-3">
            <div className="logo-cont  text-center">
              <img src={logo} alt="logo" />
            </div>

            <form id="form3" className="w-75 m-auto" onSubmit={handleSubmit(onSubmit)}>
              <h2>Reset Password</h2>
              <p>Please Enter Your Otp or Check Your Inbox</p>

              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <i class="fa-solid fa-mobile-screen-button"></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="userName"
                  type="text"
                  {...register("userName", {
                    required: true,

                  })}
                />
              </InputGroup>

              {errors.userName && errors.userName.type === "required" && (
                <span className=" text-danger my-1">userName  is required</span>
              )}


              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <i class="fa-solid fa-mobile-screen-button"></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="email"
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  })}
                />
              </InputGroup>
              {errors.email && errors.email.type === "required" && (
                <span className=" text-danger my-1">email is required</span>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <span className=" text-danger my-1">invalid email</span>
              )}
              <InputGroup className="mb-3">

                <InputGroup.Text>
                  <i className="fa-solid fa-lock"></i>
                </InputGroup.Text>

                <Form.Control
                  type="text"

                  placeholder="country "
                  {...register("country", {
                    required: true,
                  })}
                />

              </InputGroup>

              {errors.country && errors.country.type === "required" && (
                <span className=" text-danger my-1">email is required</span>
              )}




              <InputGroup className="mb-3">
                <InputGroup.Text>
                <i class="fa-solid fa-mobile-screen-button"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="text"
                  placeholder="phoneNumber"
                  aria-label="password"
                  aria-describedby="password-input"
                  {...register("phoneNumber", {
                    required: true,
                  })}
                />
           
           </InputGroup>

                  {errors.phoneNumber && errors.phoneNumber.type === "required" && (
                    <span className="text-danger my-1">phoneNumber is required</span>
                  )}
           




              <InputGroup className="mb-3">

                <InputGroup.Text>
                  <i className="fa-solid fa-key"></i>
                </InputGroup.Text>

                <Form.Control
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  aria-label="password"
                  aria-describedby="password-input"
                  {...register("password", {
                    required: true,
                  })}
                />

                <InputGroup.Text onClick={clickHandler}>
        
                  {showPass ? (
                    <i className="fa-regular fa-eye-slash"></i>
                  ) : (
                    <i className="fa-regular fa-eye"></i>
                  )}
                
        </InputGroup.Text>
        </InputGroup>
        {errors.password && errors.password.type === "required" && (
                    <span className="text-danger my-1">password is required</span>
                  )}
        
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <i className="fa-solid fa-key"></i>
                </InputGroup.Text>
                <Form.Control
                  type={showPass ? "text" : "password"}
                  placeholder="confirm New Password"
                  aria-label="password"
                  aria-describedby="password-input"
                  {...register("confirmPassword", {
                    required: true,
                  })}
                />

                <InputGroup.Text onClick={clickHandler}>
                {showPass ? (
                    <i className="fa-regular fa-eye-slash"></i>
                  ) : (
                    <i className="fa-regular fa-eye"></i>
                  )}
                  
                </InputGroup.Text>
                </InputGroup>
                {errors.password && errors.password.type === "required" && (
                    <span className="text-danger my-1">password is required</span>
                  )}

              {errors.confirmPassword &&
                errors.confirmPassword.type === "required" && (
                  <span className="text-danger my-1">
                    confirm new password is required
                  </span>
                )}


                <div 
                     onChange={(eve) =>{
                      const  path = URL.createObjectURL(eve.currentTarget.firstChild.firstChild.files[0])
                      console.log(path);
                      
                     
                      let img =  document.getElementById("img-upload")  
                      img.src = path
                      
                    }}
                >

              <InputGroup className="mb-3">
                <Form.Control
             
                  type="file"
                  placeholder="select img "
                  aria-label="password"
                  aria-describedby="password-input"
                  {...register("profileImage", {
                    required: false ,
                  })}
                />
              

              </InputGroup>
                </div>
       
                  <img style={{width:"80px"}} id="img-upload"  src={bg_img} alt="" />

              <div className="form-group my-3">
                <button
                  type="submit"
                  className={
                    "btn btn-success w-100" + (showLoading ? " disabled" : " ")
                  }
                >
              {showLoading == true ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                 "Regester"
                  )}
                </button>
              </div>
              <div className="w-100 text-end" onClick={() =>{
                navigate("/login")
              }}>

        <h6 className="text-success"> Login Now?</h6>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
