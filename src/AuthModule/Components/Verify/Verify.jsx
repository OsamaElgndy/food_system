import React,{useState} from "react";
import logo from "../../../assets/images/4.png";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import PreLoader from "../../../SharedModule/Components/PreLoader/PreLoader";
import { USER_URL } from "../../../container/END_POINTS";
import { Link } from "react-router-dom";
export default function Verify() {

  
 const [showLoading, setShowLoading] = useState(false);

  const navigate = useNavigate();
  const {
    register, 
    handleSubmit, 
    formState: { errors }, 
  } = useForm();



  const onSubmit = (data) => {

 
    axios
      .put(USER_URL.verify, data)
      .then((response) => {
        setShowLoading(false);
        //  to rest pass 
        navigate("/login");
        toast.success(
          response?.data?.message || "Code sent to your mail please check",
          {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          }
        );
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
          <form
            id="form2"
            className="w-75 m-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2>Verify Your Acount</h2>
            <p>Welcome Back! Please check your inbox and fill code</p>

            {/* email input */}
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
            {/* //email input */}
            {/* code input */}
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <i className="fa-solid fa-key"></i>
              </InputGroup.Text>
              <Form.Control
                type="text"
                name="code"
                placeholder="code"
                aria-label="code"
                aria-describedby="code-input"
                {...register("code", {
                  required: true,
                })}
              />

            </InputGroup>
            {errors.code && errors.code.type === "required" && (
              <span className="text-danger my-1">code is required</span>
            )}
            {/*//code input*/}

            <div className="d-flex justify-content-between align-items-center">
            
              <Link
                to="/registration"
                className="text-success text-decoration-none"
              >
                Register now?
              </Link>
              <Link
                to="/reset-password-request"
                className="text-success text-decoration-none"
              >
                Forgot password?
              </Link>
            </div>
            <div className="form-group my-3">
              <button className="btn btn-success w-100">Verify Account</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
}
