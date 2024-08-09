export const  email_validation =  

{
required: "Required",
pattern: {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  message: "invalid email address"
}
}

  const StrongPasswordRegx = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/; 

  export  const  password_validation ={
    required: "Required",
    pattern: {
      value: StrongPasswordRegx,
      message: "need password strong"
    }

  }

