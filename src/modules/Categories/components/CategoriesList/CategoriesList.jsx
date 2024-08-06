import React from 'react'
import Header from '../../../Shared/components/Header/Header'
import  icons  from '../../../../imges/usesList.png'
function CategoriesList() {
  return (
    <div className='container'>
<Header
 tag="Categories"
 name="item"
 descridsion="You can now add your items that any user can order it from the Application and you can edit"
 img={icons}
/>
    </div>
  )
}

export default CategoriesList
