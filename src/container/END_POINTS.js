export  const  BASE_URL ="https://upskilling-egypt.com:3006/api/v1"
export  const BASE_IMG_URL ="https://upskilling-egypt.com:3006"

const BASE_USER = `${BASE_URL}/Users`


export const   headers =     {

   Authorization: `Bearer ${localStorage.getItem("adminToken")}`
}
 


export const USER_URL = {
   login : `${BASE_USER}/login`,
   register : `${BASE_USER}/Register`,
   delete  : (id) => `${BASE_USER}/${id}`,
   resetRequest:  `${BASE_USER}/Reset/Request`,
   reset :`${BASE_USER}/Reset`,
   UserList :`${BASE_USER}`,
  ChangePaswword :`${BASE_USER}/ChangePassword`,
  verify :`${BASE_USER}/verify`,
   // Put_recipes:(id) => `${BASE_USER}/${id}`,

   }

   // Category  

const BASE_CATEGORY = `${BASE_URL}/Category`
  



export const CATEGORY_URL ={
      gitList: `${BASE_CATEGORY}`,
      delete_category : (id) => `${BASE_CATEGORY}/${id}`,
      put_category : (id) => `${BASE_CATEGORY}/${id}`,
      create:`${BASE_CATEGORY}`


   }

   // recipce 
const BASE_RECIPES = `${BASE_URL}/Recipe`

  export const RECIPES_URL ={
      gitList: `${BASE_RECIPES}`,
      createPost: `${BASE_RECIPES}`,
      delete_recipes : (id) => `${BASE_RECIPES}/${id}`,
      put_recipes : (id) => `${BASE_RECIPES}/${id}`


   }


   export const BASE_TAG = `${BASE_URL}/tag`

   const Favorite  = `${BASE_URL}/userRecipe`

   export const   URL_Favorite = {

      getFavorite : `${Favorite}`,
      PostFavorite : `${Favorite}`,
      dleteFavorite :(id) => `${Favorite}/${id}`
   }

