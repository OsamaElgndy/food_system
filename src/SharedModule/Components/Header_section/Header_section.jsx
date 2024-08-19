import React from "react";
// import headerImg from "../../../assets/images/headerImg.png"
export default function Header({name , tag , img , dis}) {
  return (
 <>
  
  <div className="header-content text-white rounded">
          <div className="row align-items-center  m-2 p-3">
            <div className="col-md-10">
              <h3 className="px-4">
                <strong style={{textTransform:"capitalize"}}>{tag}
                   {"   " + name}
                  </strong>
              </h3>
              <p className="w-75 px-4">
         {dis}
             </p>
            </div>
            <div className="col-md-2">
              <div>
                <img src={img} className=" headerImg img-fluid" alt="header" />
              </div>
            </div>
          </div>
        </div>

 </>
  );
}
