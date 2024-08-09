import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/components/Header/Header'
import icone from "../../../../imges/usesList.png"
import Not_item from '../../../Shared/not-item/Not_item'
import bg_modal from "../../../../imges/modal.png"
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import { BASE_IMG_URL, headers, RECIPES_URL } from '../../../../container/END_POINTS'
function RecipesList() {
  const [show, setShow] = useState(false);
  let [itemDelete, setitemDelete] = useState(0)
  let [recipesList, setrecipesList] = useState([])


  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setitemDelete(id)
  }



  const get_recipes_List = async () => {

    try {

      const res = await axios.get(RECIPES_URL, {

        Header: headers
      }
      )

      setrecipesList(res.data.data)
      console.log("recipes", res.data);


    } catch (error) {
      console.log(error);

    }
  }



  const delet_item = async (id) => {
    let res = await axios.delete(RECIPES_URL.delete_recipes, {

      headers: headers
    }
    )
    get_recipes_List()
  }

  useEffect(() => {

    get_recipes_List()

  }, [])

  return (
    <>

      <div className='container'>

        <Header
          tag="Recipe"
          name="Items"
          descridsion="You can now add your items that any user can order it from the Application and you can edit"

          img={icone}
        />



        <Modal show={show} onHide={handleClose}>
          <Modal.Header style={{ border: "none" }} closeButton >
          </Modal.Header>

          <Modal.Body >
            <div className='text-center'>

              <img src={bg_modal} alt="" style={{ borderBottom: "1px solid rgba(145, 131, 131, 0.795)", padding: "0px 50px" }} />
              <h3 className='pt-3'>Delete This Item ?</h3>
              <p className='text-secondary'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger px-4 " onClick={() => {
              delet_item(itemDelete)
              handleClose()


            }
            }>
              Delete this item
            </Button>
          </Modal.Footer>
        </Modal>





        <div style={{ textTransform: "capitalize" }} className='d-flex align-items-center justify-content-between container px-5 p-3'>
          <div>

            <h5>recipc Table Details</h5>
            <h6>You can check all details</h6>
          </div>
          <button style={{ background: "#009247", textTransform: "capitalize", padding: "10px", fontSize: "20px", borderRadius: "1rem", color: "white" }}> add new recipes</button>
        </div>
        <div className='container'>
          {recipesList ?
            <table class="table  ">
              <thead>
                <tr>
                  <th scope="col">name</th>
                  <th scope="col">image</th>
                  <th scope="col">price</th>
                  <th scope="col">description</th>
                  <th scope="col">tag</th>
                  <th scope="col">category</th>
                </tr>
              </thead>
              <tbody>
                {recipesList?.map((recipse) => {
                  let { id, name, imagePath, price, description, tag } = recipse
                  return (
                    <>
                      <tr key={id}>

                        <th scope="row">{name}</th>
                        <td><img style={{ width: "50px  " }} src={imagePath ? `${BASE_IMG_URL} / ${imagePath} ` : bg_modal} alt="" /></td>
                        <td>{price}</td>
                        <td>{description}</td>
                        <td>{tag.name}</td>

                        <td>


                          <i 
                          onClick={() =>{

                            handleShow(id);
                          }


                          }
                          
                          style={{ cursor: "pointer" }} class="fa-solid fa-trash text-danger mx-4"></i>


                          <i class="fa-solid fa-pen-to-square text-success"></i>
                        </td>
                      </tr>


                    </>
                  )
                })}


              </tbody>
            </table>
            : <Not_item />}
        </div>
      </div>





    </>

  )
}

export default RecipesList
