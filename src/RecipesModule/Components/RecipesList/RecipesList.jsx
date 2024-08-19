import React, { useEffect, useState, useContext } from "react";
import Header from "../../../SharedModule/Components/Header_section/Header_section";
import headerImg from "../../../assets/images/head1.png";
import bg_img from "../../../assets/images/nodata.png";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import noData from "../../../assets/images/nodata.png";
import recipeAlt from "../../../assets/images/recipe.png";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Pagination from "react-bootstrap/Pagination";
import PreLoader from "../../../SharedModule/Components/PreLoader/PreLoader";
import Form from "react-bootstrap/Form";
import { Login_data } from "../../../AuthContext/Context";
import InputGroup from "react-bootstrap/InputGroup";
import { RECIPES_URL, BASE_TAG, CATEGORY_URL, BASE_IMG_URL, URL_Favorite, headers } from "../../../container/END_POINTS";
import Swal from 'sweetalert2'
export default function RecipesList() {
  const { login } = useContext(Login_data)
  const [showLoading, setShowLoading] = useState(false);
  const [pagesArray, setPagesArray] = useState([]);
  let [recipesList, setRecipesList] = useState([]);
  let [recipe, setRecipe] = useState({});
  let [itemId, setItemId] = useState(0);
  let [categoriesList, setCategoriesList] = useState([]);
  let [tagList, setTagList] = useState([]);
  let [searchString, setSearchString] = useState("");
  let [selectedTagId, setSelectedTagId] = useState(0);
  const [modalState, setModalState] = useState("close");

  let [selectedCategoryId, setSelectedCategoryId] = useState(0);
  let {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    const Call_page_date = () => {

       getAllTags()
       getCategoryList();
       getAllRecipes();
      const store_data = JSON.parse(localStorage.getItem("recipe_item"))
      reset(store_data)
    }
    Call_page_date()

  }, []);
  useEffect(() => {

    const befor_unload = (event) => {
      localStorage.setItem("recipe_item", JSON.stringify(getValues()))
    }
    window.addEventListener("beforeunload", befor_unload)

    return window.removeEventListener("beforeunload ", befor_unload)
  })




  const Form_data = (values) => {
    let data_convert = new FormData
    data_convert.append("name", values.name)
    data_convert.append("description", values.description)
    data_convert.append("price", values.price)
    data_convert.append("tagId", values.tagId)
    data_convert.append("recipeImage", values.recipeImage[0])
    data_convert.append("categoriesIds", values.categoriesIds)
    return data_convert;

  }

  const showAddModal = () => {

    if (!localStorage.getItem("recipe_item")) {


      setValue("categoriesIds", null);
      setValue("description", null);
      setValue("name", null)
      setValue("price", null);
      setValue("tagId", null);
    }

    setModalState("add-modal");
  };



  const showDeleteModal = (id) => {
    setItemId(id);
    setModalState("delete-modal");

  };
  const showUpdateModal = (item) => {

    setValue("name", item?.name);
    setValue("price", item?.price);
    setValue("description", item?.description);
    setValue("tagId", item?.tag?.id);
    setValue("categoriesIds", item?.category[0]?.id);
    setValue("imagePath", item?.imagePath);

    setItemId(item.id);
    setRecipe(item);
    setModalState("update-modal");
  };
  const handleClose = () => setModalState("close");




  const postfavorite = (recipeId) => {
 
    axios
      .post(URL_Favorite.PostFavorite,{ "recipeId":recipeId.id},
               {
                headers:headers
              }     
      )
      .then((respons) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        })

      }).catch((errors) => {
        toast.error("error ", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        })

      })

  }


  const getCategoryList = () => {
    axios
      .get(
        CATEGORY_URL.gitList,
        {
          headers: headers
         
        }
      )
      .then((response) => {
        setCategoriesList(response?.data?.data);
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
      });
  };
  const getAllTags = () => {
    axios
      .get(BASE_TAG, {
        headers: headers

      })
      .then((response) => {
        setTagList(response?.data);
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
      });
  };

  const deleteRecipe = () => {
    setShowLoading(true);
    axios
      .delete(RECIPES_URL.delete_recipes(itemId), {
        headers: headers
      })
      .then((response) => {
        console.log(response);
        handleClose();
        setShowLoading(false);
        getAllRecipes();
        toast.success(
          response?.data?.message || "Recipe deleted successfully",
          {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          }
        );
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
  const updateRecipe = (data) => {


    let post_data = Form_data(data)

    setShowLoading(true);
    axios
      .put(
        RECIPES_URL.put_recipes(itemId)
        ,
        post_data,
        {
           headers:headers
        }
      )
      .then((response) => {
        console.log(response);
        handleClose();
        setShowLoading(false);
        getAllRecipes();
        toast.success(
          response?.data?.message || "Recipe updated successfully",
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

  const getAllRecipes = (pageNo, name, tagId, categoryId) => {
    setShowLoading(true);
    axios
      .get(RECIPES_URL.gitList, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        params: {
          pageSize: 5,
          pageNumber: pageNo,
          name: name,
          tagId: tagId,
          categoryId: categoryId,
        },
      })
      .then((response) => {
        setRecipesList(response?.data?.data);
        localStorage.removeItem("recipe_item")
        setPagesArray(
          Array(response?.data?.totalNumberOfPages)
            .fill()
            .map((_, i) => i + 1)
        );
        setShowLoading(false);
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
  const addRecipe = (data) => {
    const create_recipe = Form_data(data)


    console.log("add recipe obj", data);
    setShowLoading(true);
    axios
      .post(
        RECIPES_URL.createPost,
        create_recipe,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,

          },
        }


      )
      .then((response) => {

        console.log(response);
        handleClose();
        setShowLoading(false);
        getAllRecipes();
        localStorage.removeItem("recipe_item")
        toast.success(response?.data?.message || "Recipe added successfully", {
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
  const getNameValue = (e) => {
    setSearchString(e.target.value);
    getAllRecipes(1, e.target.value, selectedTagId, selectedCategoryId);
  };
  const getTagValue = (e) => {
    setSelectedTagId(e.target.value);
    getAllRecipes(1, searchString, e.target.value, selectedCategoryId);
  };
  const getCategoryValue = (e) => {
    setSelectedCategoryId(e.target.value);
    getAllRecipes(1, searchString, selectedTagId, e.target.value);
  };



  return (
    <>
      <Header
        tag={"Recipes"}
        name={"Items"}
        dis={"  You can now add your items that any user can order it from the Application and you can edi"}
        img={headerImg}
      />


      <div className="row justify-content-between mx-4 p-3 ">
        <div className="col-md-6 px-4">
          <h4>
            <strong>Recipes Table Details</strong>
          </h4>
          <p>You can check all details</p>
        </div>
        <div className="col-md-6 text-end">
          <button onClick={() => {
            showAddModal()
            localStorage.setItem("recipe_item", JSON.stringify(getValues()))
          }} className="btn btn-success">
            Add new Recipe
          </button>
        </div>
        <div></div>
        <Modal show={modalState == "add-modal"} onHide={handleClose}>
          <Modal.Header closeButton>
            <h3>Add New Recipe</h3>
          </Modal.Header>
          <Modal.Body >
            <p>Welcome Back! Please enter your details</p>
            <form id="form7" onSubmit={handleSubmit(addRecipe)}>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Recipe name"
                  {...register("name", { required: true })}
                />
                {errors.name && errors.name.type === "required" && (
                  <span className="m-2 text-danger">field is required</span>
                )}
              </div>

              <select
                className="form-select my-1"
                aria-label="Default select example"
                {...register("tagId", { required: true, valueAsNumber: true })}
              >
                <option className="text-muted" value="">
                  Choose Tag
                </option>

                {tagList?.map((tag) => (
                  <option key={tag?.id} value={tag?.id}>
                    {tag?.name}
                  </option>
                ))}
              </select>

              {errors.tagId && errors.tagId.type === "required" && (
                <span className="m-2 text-danger">field is required</span>
              )}

              <select
                className="form-select my-1"
                aria-label="Default select example"
                {...register("categoriesIds", { valueAsNumber: true })}
              >
                <option className="text-muted" value="">
                  Choose Category
                </option>
                {categoriesList.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.id}
                  </option>
                ))}
              </select>

              <div className="form-group">
                <input
                  className="form-control my-2"
                  type="number"
                  placeholder="Price"
                  {...register("price", { required: true })}
                />
                {errors.price && errors.price.type === "required" && (
                  <span className="m-2 text-danger">field is required</span>
                )}
              </div>

              <div className="form-group">
                <textarea
                  className="form-control"
                  placeholder="description"
                  id="w3review"
                  name="w3review"
                  rows="4"
                  cols="50"
                  {...register("description", { required: true })}
                ></textarea>
                {errors.description &&
                  errors.description.type === "required" && (
                    <span className="m-2 text-danger">field is required</span>
                  )}
              </div>

              <div onChange={(eve) => {
                const path = URL.createObjectURL(eve.currentTarget.children[0].files[0])

                //  useState 
                eve.currentTarget.children[1].src = path;


              }} className="form-group my-2 ">
                <input
                  type="file"
                  accept="image/*" id="imgInp"
                  className="form-control my-1 bg-test "
                  {...register("recipeImage", { required: true })
                  }
                />
                <img id="blah" style={{ width: "100px", margin: "10px" }} src={bg_img} alt="your image" />
              </div>
              <div>
                {errors.recipeImage &&
                  errors.recipeImage.type === "required" && (
                    <span className="m-2 text-danger">field is required</span>
                  )}
              </div>


              <div className="text-end">
                <button
                  type="submit"
                  className={
                    "btn btn-success" + (showLoading ? " disabled" : " ")
                  }
                >
                  {showLoading == true ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "Add Recipe"
                  )}
                </button>

              </div>
            </form>
          </Modal.Body>
        </Modal>
        <Modal show={modalState == "delete-modal"} onHide={handleClose}>
          <Modal.Header closeButton>
            <h3>delete this Recipe?</h3>
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
                onClick={deleteRecipe}
                className={
                  "btn btn-outline-danger my-3" + (showLoading ? " disabled" : "")
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
        <Modal show={modalState == "update-modal"} onHide={handleClose}>
          <Modal.Header closeButton>
            <h3>Update Recipe</h3>
          </Modal.Header>
          <Modal.Body>
            <p>Welcome Back! Please enter your details</p>
            <form id="form8" onSubmit={handleSubmit(updateRecipe)}>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Recipe name"
                  {...register("name", { required: true })}
                />
                {errors.name && errors.name.type === "required" && (
                  <span className="m-2 text-danger">field is required</span>
                )}
              </div>
              <label>Tag</label>
              <select
                className="form-select"
                aria-label="Default select example"
                {...register("tagId", { required: true, valueAsNumber: true })}
              >
                {tagList?.map((tag) => (
                  <option key={tag?.id} value={tag?.id}>
                    {tag?.name}
                  </option>
                ))}
              </select>

              {errors.tagId && errors.tagId.type === "required" && (
                <span className="m-2 text-danger">field is required</span>
              )}

              <label>Category</label>
              <select
                className="form-select my-1"
                aria-label="Default select example"
                {...register("categoriesIds", { valueAsNumber: true })}
              >
                {categoriesList.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.id}
                  </option>
                ))}
              </select>

              <div className="form-group">
                <input
                  className="form-control my-2"
                  type="number"
                  placeholder="Price"
                  {...register("price", { required: true })}
                />
                {errors.price && errors.price.type === "required" && (
                  <span className="m-2 text-danger">field is required</span>
                )}
              </div>

              <div className="form-group">
                <textarea
                  className="form-control"
                  placeholder="description"
                  id="w3review"
                  name="w3review"
                  rows="4"
                  cols="50"
                  {...register("description", { required: true })}
                ></textarea>
                {errors.description &&
                  errors.description.type === "required" && (
                    <span className="m-2 text-danger">field is required</span>
                  )}
              </div>

              <div className="form-group ">
                <input
                  type="file"
                  className="form-control my-1 "
                  {...register("recipeImage", { required: false })}
                />
                {recipe?.imagePath ? (
                  <img
                    className="w-25"
                    src={
                      ` ${BASE_IMG_URL}/${recipe?.imagePath}`}
                  />
                ) : (
                  <img className="w-25" src={bg_img} />
                )}
              </div>

              <div className="text-end">
                <button
                  type="submit"
                  className={
                    "btn btn-success" + (showLoading ? " disabled" : " ")
                  }
                >
                  {showLoading == true ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "Update Recipe"
                  )}
                </button>

              </div>
            </form>
          </Modal.Body>
        </Modal>
        {login.userGroup === "SystemUser" ? null :
          <div className="filtration-group my-3">
            <div className="row">
              <div className="col-md-6">


                <InputGroup>
                  <InputGroup.Text>
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </InputGroup.Text>
                  <Form.Control
                    onChange={getNameValue}
                    placeholder="Search by name ..."
                    type="text"
                  />
                </InputGroup>


              </div>
              <div className="col-md-3">
                <select
                  onChange={getTagValue}
                  className="form-select "
                  aria-label="Default select example"
                >
                  <option className="text-muted" value="">
                    Tag Filter
                  </option>

                  {tagList?.map((tag) => (
                    <option key={tag?.id} value={tag?.id}>
                      {tag?.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <select
                  onChange={getCategoryValue}
                  className="form-select "
                  aria-label="Default select example"
                >
                  <option className="text-muted" value="">
                    Category Filter
                  </option>

                  {categoriesList?.map((category) => (
                    <option key={category?.id} value={category?.id}>
                      {category?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        }
        {!showLoading ? (
          <>
            {recipesList?.length > 0 ? (
              <div className="table-responsive">
                <table className="table">
                  <thead className="table-head table-success">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Recipe Name</th>
                      <th scope="col">image</th>
                      <th scope="col">price</th>
                      <th scope="col">description</th>
                      <th scope="col">Category</th>
                      <th scope="col">Tag</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recipesList.map((recipe, index) => (

                      <tr key={recipe?.id} className="table-light">
                        <th scope="row">{index + 1}</th>
                        <td>{recipe?.name}</td>
                        <td>
                          <div className="rec-image-container mx-5">
                            <img style={{ width: "80px" }} src={recipe.imagePath ? `${BASE_IMG_URL}/${recipe.imagePath}` : bg_img} alt="" />
                          </div>
                        </td>
                        <td>{recipe?.price}</td>
                        <td className="w-25">{recipe?.description}</td>
                        <td>{recipe?.category[0]?.name}</td>
                        <td>{recipe?.tag?.name}</td>
                        {login.userGroup === "SystemUser" ?

                          <td>
                            <div onClick={() => {

                              postfavorite(recipe)


                            }}
                            >

                              <i style={{ cursor: "pointer", fontSize: "30px" }} class="fa-solid text-danger fa-heart"></i>

                            </div>



                          </td>

                          :
                          <td>
                            <i
                              onClick={() => showUpdateModal(recipe)}
                              className="fa fa-edit  text-success px-2"
                            ></i>
                            <i
                              onClick={() => showDeleteModal(recipe.id)}
                              className="fa fa-trash  text-danger"
                            ></i>
                          </td>
                        }
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="d-flex justify-content-center align-items-center mt-5">
                  <Pagination>
                    <Pagination.First />
                    <Pagination.Prev />

                    {pagesArray?.map((pageNo) => (
                      <Pagination.Item
                        key={pageNo}
                        onClick={() => getAllRecipes(pageNo, searchString)}
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
            )}
          </>
        ) : (
          <PreLoader />
        )}
      </div>
    </>
  );
}
