export  const  BASE_URL ="https://upskilling-egypt.com:3006/api/v1"
export  const BASE_IMG_URL ="https://upskilling-egypt.com:3006"

const BASE_USER = `${BASE_URL}/Users`


export const   headers =     {

   Authorization: `Bearer ${localStorage.getItem("token")}`
}
 


export const USER_URL = {
   login : `${BASE_USER}/login`,
   register : `${BASE_USER}Rregister`,
   delete  : (id) => `${BASE_USER}/${id}`,
   resetRequest:  `${BASE_USER}/Reset/Request`,
   reset :`${BASE_USER}/Reset`,

   }

   // Category  

const BASE_CATEGORY = `${BASE_URL}/Category`
  



export const CATEGORY_URL ={
      gitList: `${BASE_CATEGORY}`,
      delete_category : (id) => `${BASE_CATEGORY}/${id}`


   }

   // recipce 
const BASE_RECIPES = `${BASE_URL}/Recipe`

  export const RECIPES_URL ={
      gitList: `${BASE_RECIPES}`,
      delete_recipes : (id) => `${BASE_RECIPES}/${id}`


   }