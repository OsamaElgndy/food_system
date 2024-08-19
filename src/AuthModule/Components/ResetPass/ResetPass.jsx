import React, { useState } from "react";
import logo from "../../../assets/images/4.png";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import PreLoader from "../../../SharedModule/Components/PreLoader/PreLoader";
import { USER_URL } from "../../../container/END_POINTS";

export default function ResetPass() {

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

  const onSubmit = (data) => {
    console.log(data);
    setShowLoading(true);
    axios
      .post(USER_URL.reset, data)
      .then((response) => {
        console.log(data);
        setShowLoading(false);
        navigate("/login");

        toast.success(response?.message || "Password changed successfully", {
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

   return showLoading ? (
    <PreLoader/>
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
                <InputGroup.Text>
                  <i className="fa-solid fa-lock"></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="OTP"
                  type="text"
                  {...register("seed", {
                    required: true,
                  })}
                />
              </InputGroup>
              {errors.seed && errors.seed.type === "required" && (
                <span className="text-danger my-1">OTP is required</span>
              )}
           
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <i className="fa-solid fa-key"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
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
                <span className="text-danger my-1">
                  new password is required
                </span>
              )}
     
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <i className="fa-solid fa-key"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
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
              {errors.confirmPassword &&
                errors.confirmPassword.type === "required" && (
                  <span className="text-danger my-1">
                    confirm new password is required
                  </span>
                )}
         
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
                    "Reset password"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
