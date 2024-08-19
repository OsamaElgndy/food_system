import React, { useContext, useEffect } from "react";
import Header from "../../../SharedModule/Components/Header_section/Header_section";
import headerImg from "../../../assets/images/home.png";
import { Button } from "bootstrap";
import { Link } from "react-router-dom";
import { Login_data } from "../../../AuthContext/Context";
export default function Home() {
  const {login , dj_code } = useContext(Login_data)
  console.log(login , "this is qroup")

     useEffect(() =>{
     if (localStorage.getItem("adminToken")) {
      dj_code()
     }
     },[])
  
  return (

    <div>
      <Header
      tag={"welcom"}
      dis={"This is a welcoming screen for the entry of the application , you can now see the options"}
      name={login.userName}
      img={headerImg}
      />
    
      <div className="row home-sec  rounded-2 m-4 p-4 align-items-center">
        <div className="col-md-6">
          <div>
            <h4><strong>Fill the recipes !</strong> </h4>
            <p>
              you can now fill the meals easily using the table and form , click
              here and sill it with the table !
            </p>
          </div>
        </div>
        <div className="col-md-6 text-end">
          <div>
           
           <button className="btn btn-success px-3">
           <Link to={"/dashboard/recipes"} className="text-white text-decoration-none">
              Fill Recipes &nbsp;
              <i className=" fa fa-arrow-right"></i>
              </Link>
              </button>
           
          
          </div>
        </div>
      </div>
    </div>
  );
}
