import React, { useContext, useEffect, useState } from "react";
// import Header from "../../../SharedModule/Components/Header/Header";
import headerImg from "../../src/assets/images/head1.png";
// import { AuthContext } from "../../../Context/AuthContext";
import Header from "../SharedModule/Components/Header_section/Header_section";
import noData from "../../src/assets/images/nodata.png";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { headers, URL_Favorite, BASE_IMG_URL } from "../container/END_POINTS";
// import recipeAlt from "../../../assets/images/recipe.png";
// import { ToastContext } from "../../../Context/ToastContext";
import PreLoader from "../../src/SharedModule/Components/PreLoader/PreLoader";
export default function FavoritesList() {
  // ***************context******************
  // const { getToastValue } = useContext(ToastContext);
  // const { baseUrl, requestHeaders } = useContext(AuthContext);
  // *************preloader*******************
  const [showLoading, setShowLoading] = useState(false);
  // ************usestate******************
  const [modalState, setModalState] = useState("close");
  const [favList, setFavList] = useState([]);
  let [itemId, setItemId] = useState(0);
  // ***************remove fav modal****************
  const showDeleteModal = (id) => {
    setItemId(id);
    setModalState("delete-modal");
  };

  // ********to close modal*******************
  const handleClose = () => setModalState("close");
  // ************get all fav***************
  const getAllFavorites = () => {

    setShowLoading(true);
    axios
      .get(URL_Favorite.getFavorite, {
        headers: headers,
      })
      .then((response) => {

        setFavList(response?.data?.data);
        console.log("favlist44444", favList);
        setShowLoading(false);
      })
      .catch((error) => {
        // console.log(error?.data?.data);
        getToastValue(
          "error",
          error?.response?.data?.message ||
          "An error occurred. Please try again."
        );
        setShowLoading(false);
      });
  };
  // ************to remove from fav*********
  const removeFavorite = (favId) => {

    setShowLoading(true)
    axios
      .delete(URL_Favorite.dleteFavorite(favId), {
        headers: headers,
      })
      .then((response) => {
        console.log("removefromfavlist success", response);
        setFavList(response.data.data);
        setItemId(itemId);
        handleClose();
        getToastValue(
          "success",
          response?.data?.message || "removed from favorites successfully"
        );
        setShowLoading(false)

      })
      .catch((error) => {
        setShowLoading(false)
        getToastValue(
          "error",
          error?.response?.data?.message ||
          "An error occurred. Please try again."
        );
      });
    getAllFavorites();
  };
  useEffect(() => {
    getAllFavorites();
  }, []);
  return (
    <div>
      <Header
        dis={"   This is a welcoming screen for the entry of the application ,            you can now see the option"}
        img={headerImg}
        tag={"Favorite "}
        name={"Item "}
      />

      <Modal show={modalState == "delete-modal"} onHide={handleClose}>
        <Modal.Header closeButton>
          <h3>delete from favorites?</h3>
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
              type="submit"
              onClick={() => {
                removeFavorite(itemId)

                getAllFavorites();
              }}
              className={
                "btn btn-outline-danger my-3" +
                (showLoading ? " disabled" : "")
              }
            >
              {showLoading == true ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <div className="row mx-4 p-3 text-center  gap-5 d-flex justify-content-center align-items-center">
        {favList?.length > 0? <>
       
       {!showLoading ? <>

          {favList?.map((fav) => (
            <div key={fav?.id} style={{ background: "    rgba(47, 140, 51, 0.7)" }} className="rounded-2 col-md-3  m-1">
              <section className="articles">
                <article className="mt-4">
                  <div className="article-wrapper">
                    <figure>
                      {fav?.recipe?.imagePath ? (
                        <div className="h-25">

                          <img
                            className="w-75 headerImg rounded-2 mb-2"
                            src={`${BASE_IMG_URL}/${fav?.recipe?.imagePath}`}
                          />
                        </div>
                      ) : (
                        <img className="w-75 headerImg  rounded-2 mb-2" src={headerImg} />
                      )}
                    </figure>
                    <div className="article-body">
                      <h2>{fav?.recipe?.name}</h2>
                      <p>Description : {fav?.recipe?.description}</p>
                      <p>price : {fav?.recipe?.price}</p>
                      <p className="my-2">
                        <i
                          onClick={() => showDeleteModal(fav.id)}
                          style={{ fontSize: "30px" }}
                          className="fa fa-trash text-danger"
                          ></i>
                      </p>
                    </div>
                    </div>
                    </article>
                    </section>
                    </div>
                  ))}
                  </>:<PreLoader/>}
                  </>
                  
                :
                <>
                <img  className="headerImg" style={{width:"200px"}}src={headerImg}/> 
              <h1>no data</h1>
                </>
                }
                  </div>
          
    </div>
  );
}
