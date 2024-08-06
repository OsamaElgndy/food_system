import React from 'react'
import Header from '../../../Shared/components/Header/Header'
import icone from "../../../../imges/usesList.png"
function RecipesList() {
  return (
    <div className='container'>

      <Header
        tag="Recipe"
        name="Items"
        descridsion="You can now add your items that any user can order it from the Application and you can edit"

        img={icone}
      />
    </div>
  )
}

export default RecipesList
