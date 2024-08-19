import React from "react";
import SideBar from "./../SideBar/SideBar";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";
import styles from './MasterLayout.module.css';

export default function MasterLayout({adminData}) {
  return (
    <>
     
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <SideBar />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <Navbar adminData={adminData} />
        </div>
        <div className={styles.body}>
          <Outlet />
        </div>
      </div>
   
    </div>
    </>
  );
}
