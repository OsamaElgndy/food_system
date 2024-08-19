import React from 'react'
import noData from "../../../assets/images/nodata.png";
export default function NoData() {
  return (
    <div className="text-center">
            <img src={noData} className="img-fluid"/>
           <p> No data Found</p>
           
            </div>
  )
}
