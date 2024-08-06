import React from 'react'
import Header from '../../Shared/components/Header/Header'
import icone from "../../../imges/usesList.png"
function UsersList() {
  return (

<>
<div className='container'>

<Header
        tag="Users"
        name="List"
        descridsion="You can now add your items that any user can order it from the Application and you can edit"
        img={icone}
        />
        </div>
</>
  )
}

export default UsersList
