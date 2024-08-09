import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/components/Header/Header'
import icons from '../../../../imges/usesList.png'
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import bg_modal from "../../../../imges/modal.png"
import { CATEGORY_URL , headers } from "../../.../../../../container/END_POINTS"
import Not_item from '../../../Shared/not-item/Not_item';
function CategoriesList() {

  const [show, setShow] = useState(false);
  let [itemDelete , setitemDelete] = useState(0)
  let [CategoryList, setCategoryList] = useState([])
  const handleClose = () => setShow(false);
  const handleShow = (id) =>{
    setShow(true);
     setitemDelete(id)
  } 

  const getCategoryList = async () => {
    try {

      let res = await axios.get(CATEGORY_URL.gitList, {
    headers:headers

      })
      setCategoryList(res?.data?.data)
      console.log(res.data.data);
      // toast.success("Categories is existing")

    } catch (error) {
      toast.error(error.message)

      console.log(error);

    }
  }

  const delet_item = async (id) =>{
    let res = await axios.delete(CATEGORY_URL.delete_category(id),{

      headers:headers
    }
  )
  getCategoryList()
  }

  useEffect(() => {
    getCategoryList()


  }, [])






  return (


    <>
      <div className='container '>

        <Header
          tag="Categories"
          name="item"
          descridsion="You can now add your items that any user can order it from the Application and you can edit"
          img={icons}
        />
          <Modal show={show}   onHide={handleClose}>
        <Modal.Header  style={{border:"none" }} closeButton >
        </Modal.Header>
               
        <Modal.Body >
          <div className='text-center'>

        <img src={bg_modal} alt="" style={{borderBottom:"1px solid rgba(145, 131, 131, 0.795)",  padding:"0px 50px" }}/>
        <h3 className='pt-3'>Delete This Item ?</h3>
              <p className='text-secondary'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
          </div>
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger px-4 "  onClick={() =>{
            delet_item(itemDelete)
            handleClose()
            

          }
          }>
          Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
   
      </div>

      <div style={{ textTransform: "capitalize" }} className='d-flex align-items-center justify-content-between container px-5 p-3'>
        <div>

          <h5>Categories Table Details</h5>
          <h6>You can check all details</h6>
        </div>
        <button style={{ background: "#009247", textTransform: "capitalize", padding: "10px", fontSize: "20px", borderRadius: "1rem", color: "white" }}> add new category</button>
      </div>


      <div>
        
      <div className='container'>
            {CategoriesList ?
          <table class="table  ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {CategoryList?.map((item) => {
                let { id, name, creationDate, modificationDate } = item
                return (
                  <>
                    <tr key={id}>

                      <th scope="row">{id}</th>
                      <td>{name }</td>
                      <td>{creationDate}</td>
                      <td>{modificationDate}</td>
                      <td>
             

                        <i onClick={ () =>{

                          handleShow(id);

                        }
                          } style={{cursor:"pointer"}} class="fa-solid fa-trash text-danger mx-4"></i>
                         
   
                        <i class="fa-solid fa-pen-to-square text-success"></i>
                      </td>

                    </tr>


                  </>
                )
              })}


            </tbody>
          </table>
            :<Not_item/>}
        </div>
      </div>
    </>
  )
}

export default CategoriesList
