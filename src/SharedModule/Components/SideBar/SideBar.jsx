import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../../assets/images/3.png";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import Modal from "react-bootstrap/Modal";
import { Login_data } from "../../../AuthContext/Context";
import ChangePass from "../../../AuthModule/Components/ChangePass/ChangePass";
export default function SideBar() {
  const { login } = useContext(Login_data)



  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let [isCollapsed, setIsCollapsed] = useState(false);
  let handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };
  let navigate = useNavigate();
  let logOut = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("recipe_item");
    navigate("/login");
  };

  return (
    <div className="sidebar-container">
      <Sidebar className="vh-100" collapsed={isCollapsed}>
        <div>
          <img onClick={handleToggle} className="w-75" src={logo} alt="" />
        </div>
        <Menu>
          <MenuItem
            icon={<i className="fa fa-home"></i>}
            component={<Link to="/dashboard" />}
          >
            Home
          </MenuItem>
          {login.userGroup === "SystemUser" ? null :

            <MenuItem
              icon={<i className="fa fa-users"></i>}
              component={<Link to="/dashboard/users" />}
            >
              Users
            </MenuItem>
          }
          <MenuItem
            icon={<i className="fa-solid fa-utensils"></i>}
            component={<Link to="/dashboard/recipes" />}
          >
            Recipes
          </MenuItem>
          {login.userGroup === "SystemUser" ? null :


            <MenuItem

              icon={<i className="fa-regular fa-calendar-days"></i>}
              component={<Link to="/dashboard/categories" />}
            >
              Categories
            </MenuItem>
          }
          {login.userGroup === "SystemUser" ?
            <MenuItem
              icon={<i className="fa fa-heart"></i>}
              component={<Link to="/dashboard/favorites" />}
            >
              Favorites
            </MenuItem>
            : null}

          {login.userGroup === "SystemUser" ? null :
            <MenuItem
              icon={<i className="fa-solid fa-unlock"></i>}
              onClick={handleShow}
            >
              Change Password
            </MenuItem>
          }
          <Modal show={show} onHide={handleClose}>
            <Modal.Body>
              <ChangePass handleClose={handleClose} />
            </Modal.Body>
          </Modal>
          <MenuItem
            icon={<i className="fa-solid fa-right-from-bracket"></i>}
            onClick={logOut}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
