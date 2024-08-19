import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import Pagination from "react-bootstrap/Pagination";
import { toast } from "react-toastify";
import headerImg from "../../../assets/images/head1.png";
import { default as nodata, default as noData } from "../../../assets/images/nodata.png";
import { BASE_IMG_URL, USER_URL } from "../../../container/END_POINTS";
import Header from "../../../SharedModule/Components/Header_section/Header_section";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import PreLoader from "../../../SharedModule/Components/PreLoader/PreLoader";

export default function UsersList() {

  let [usersList, setUsersList] = useState([]);
  let [itemId, setItemId] = useState(0);
  const [searchByName, setSearchByName] = useState("")
  const [searchByEmail, setSearchByEmail] = useState("");
  const [showLoading, setShowLoading] = useState(false);      
  const [pagesArray, setPagesArray] = useState([]);
  const [modalState, setModalState] = useState("close");
  const showDeleteModal = (id) => {
    setItemId(id);
    setModalState("delete-modal");
  };
  const range = (start, end, step = 1) => {


    let output = [];
    if (typeof end === 'undefined') {
      end = start;
      start = 0;
    }
    for (let i = start; i < end; i += step) {
      output.push(i);
    }
    return output;
  };



  const rangPage = (currentPage, totalNumberofPagev) => {

    // returen  to  the previous
    if (currentPage == pagesArray[0]) {
      if (currentPage - 10 <= 0) {
        if (currentPage + 11 >= 11) {

          return range(1, 11)
        } else {
          return range(1, pagesArray?.length)

        }

      }

      return range(currentPage - 10, currentPage - 1)
    }
    //  the page end  
    if (currentPage - 10 > totalNumberofPagev) {
      return range(totalNumberofPagev - 1, totalNumberofPagev - 10)
    }
    // next page 
    return range(currentPage, currentPage + 10)

  }


  const handleClose = () => setModalState("close");


  const deleteUser = () => {
    setShowLoading(true);
    axios
      .delete(USER_URL.delete(itemId), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((response) => {
        handleClose();
        setShowLoading(false);
        getAllUsers();
        toast.success(response?.data?.message || "user deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      })
      .catch((error) => {
        console.log(error);
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

  const getAllUsers = (pageNo, userName, email) => {

    setShowLoading(true);
    axios
      .get(USER_URL.UserList, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        params: {
          pageSize: 5,
          pageNumber: pageNo,
          userName: userName,
          email: email,
        },
      })
      .then((response) => {

        setPagesArray(
          (rangPage(response?.data.pageNumber, response?.data?.totalNumberOfPages))

        );
        setShowLoading(false);
        setUsersList(response?.data?.data);
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
  const getUserNameValue = (e) => {
    setSearchByName(e.target.value);
    getAllUsers(1, e.target.value, searchByEmail);
  };
  const getEmailValue = (e) => {
    setSearchByEmail(e.target.value);
    getAllUsers(1, searchByName, e.target.value);
  };
  useEffect(() => {
    const timerId = setTimeout(() => {
      getAllUsers();
    }, 500)
    return () => clearTimeout(timerId)

  }, []);
  return (<>
    <Header
      dis={"You can now add your items that any user can order it from the Application and you can edit"}
      name={"List"}
      img={headerImg}
      tag={"User"}
    />
    <div className="row justify-content-between mx-4 p-3 ">
      <div className="col-md-6 px-4">
        <h4>
          <strong>Users Table Details</strong>
        </h4>
        <p>You can check all details</p>
      </div>

      <Modal show={modalState == "delete-modal"} onHide={handleClose}>
        <Modal.Header closeButton>
          <h3>delete this user?</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <img src={noData} />
            <p>
              are you sure you want to delete this item ? if you are sure just
              click on delete it
            </p>
          </div>
          <div className="text-end">
            <button
              onClick={deleteUser}
              className={
                "btn btn-outline-danger my-3" +
                (showLoading ? " disabled" : "")
              }
            >
              {showLoading == true ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Delete this item"
              )}
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <div>
        <div className="filtration-group my-3">
          <div className="row">
            <div className="col-md-6">
              <InputGroup>
                <InputGroup.Text>
                  <i className="fa-regular fa-user"></i>
                </InputGroup.Text>
                <Form.Control
                  onChange={getUserNameValue}
                  placeholder="Search by name ..."
                  type="text"
                />
              </InputGroup>
            </div>
            <div className="col-md-6">
              <InputGroup>
                <InputGroup.Text>
                  <i className="fa-solid fa-envelope-open-text"></i>
                </InputGroup.Text>
                <Form.Control
                  onChange={getEmailValue}
                  placeholder="Search by email ..."
                  type="text"
                />
              </InputGroup>
            </div>
          </div>
        </div>

        {!showLoading ?
          <>

            {usersList.length > 0 ? (

              <div style={{ overflow: "hidden" }}>
                <table className="table">
                  <thead className="table-head table-success">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">User Name</th>
                      <th scope="col">Image</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Email</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.map((user, index) => (


                      <tr key={user?.id} className="table-light">
                        <th scope="row">{index + 1}</th>
                        <td>{user?.userName}</td>

                        <td>
                          <div className="image-container">
                            <img style={{ width: "70px", margin: "0px -10px" }} src={user?.imagePath ? `${BASE_IMG_URL}/` + user.imagePath : nodata} alt="" />
                          </div>
                        </td>

                        <td>{user?.phoneNumber}</td>
                        <td>{user?.email}</td>
                        <td>
                          <i
                            onClick={() => showDeleteModal(user.id)}
                            className="fa fa-trash  text-danger"
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>




                <div className="d-flex w-100   justify-content-center align-items-center mt-5">
                  <Pagination>
                    <Pagination.First />
                    <Pagination.Prev />


                    {pagesArray?.map((pageNo) => (
                      <Pagination.Item
                        key={pageNo}
                        onClick={() =>

                          getAllUsers(pageNo, searchByName, searchByEmail)
                        }
                      >
                        {pageNo}
                      </Pagination.Item>
                    ))}

                    <Pagination.Next />
                    <Pagination.Last />
                  </Pagination>
                </div>
              </div>

            ) : (
              <NoData />
            )
            }
          </>
          : <PreLoader />
        }



      </div>
    </div>
  </>
  );
}
