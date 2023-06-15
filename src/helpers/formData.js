import * as yup from 'yup'
export const validationSchema = yup.object({
    name:yup.string().required("Required").min(5,"minimum 5 letters").max(15,"maxsimum 15 letters"),
    surname:yup.string().min(4,"surname must contain at least 4 letters"),
    email:yup.string("sad").email("Invalid Email format"),
    position:yup.string().required("Required")
    
})
export const initial ={
    name:"",
    surname:"",
    position:"",
    email:""
    
}