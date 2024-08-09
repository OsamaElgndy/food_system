import React from 'react'
import bg_modal from "../../../imges/modal.png"

function Not_item() {
  return (
    <div className='text-center'>

    <img src={bg_modal} alt="" style={{borderBottom:"1px solid rgba(145, 131, 131, 0.795)",  padding:"0px 50px" }}/>
    <h3 className='pt-3'>not data ?</h3>
          <p className='text-secondary'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
      </div>
  )
}

export default Not_item
