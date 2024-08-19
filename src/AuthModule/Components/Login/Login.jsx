import React, { useEffect, useState , useContext} from "react";
import logo from "../../../assets/images/4.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import PreLoader from "../../../SharedModule/Components/PreLoader/PreLoader";
import {USER_URL} from "../../../container/END_POINTS"
export default function Login({ saveAdminData }) {
  const [showPass, setShowPass] = useState(false);
  const clickHandler = () => {
    
    setShowPass(!showPass);
  };
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register, //btsheel el values ui inputs
    handleSubmit, //integration
    formState: { errors }, //errors
  } = useForm();
  const onSubmit = (data) => {
    setShowLoading(true);
    axios
      .post( USER_URL.login, data)
      .then((response) => {
        localStorage.setItem("adminToken", response.data.token);
        saveAdminData();
        
        setShowLoading(false);
        navigate("/dashboard"); //to home screen
   
        toast.success("Login successfully", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message ||
            "An error occurred. Please try again.",
          {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          }
        );
        setShowLoading(false);
      });
  };
 useEffect(() =>{
 if(localStorage.getItem("adminToken")){
  navigate("/dashboard"); //to home screen
 }
 } ,[])
  return showLoading ? (
   <div className="prePosition"> <PreLoader/></div>
  ) : (
    <div className="Auth-container container-fluid">
      <div className="row bg-overlay vh-100 justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="bg-white rounded p-3">
            <div className="logo-cont  text-center">
              <img src={logo} alt="logo" />
            </div>
            <form id="form2" className="w-75 m-auto" onSubmit={handleSubmit(onSubmit)}>
              <h2>Log In</h2>
              <p>Welcome Back! Please enter your details</p>

              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <i className="fa-regular fa-envelope"></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="enter your email"
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
                <InputGroup.Text id="password-input">
                  <i className="fa-solid fa-key"></i>
                </InputGroup.Text>
                <Form.Control
                  type={showPass?"text":"password"}
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

              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                <Link
                  to="/Regester"
                  className="text-success text-decoration-none"
                >
                  Regester now?
                </Link>
                </div>
                <Link
                  to="/reset-password-request"
                  className="text-success text-decoration-none"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="form-group my-3">
                <button
               className="btn btn-success w-100">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
