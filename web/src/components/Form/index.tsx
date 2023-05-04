// import {useState} from "react"
// import {Button, TextField, useMediaQuery, Typography, useTheme} from "@mui/material"
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
// import {Formik, FormikHandlers} from "formik"
// import * as yup from "yup"
// import {useNavigate} from "react-router-dom"
// import {useDispatch} from "react-redux"
// import Dropzone from "react-dropzone"

// import {setLogin} from "../../pages/state"

// import {CustomThemeInterface} from "../../theme"

// const registerSchema = yup.object().shape({
//     firstName: yup.string().required("required"),
//     lastName: yup.string().required("required"),
//     email: yup.string().email("invalid email").required("required"),
//     password: yup.string().required("required"),
//     location: yup.string().required("required"),
//     occupation: yup.string().required("required"),
//     picture: yup.string().required("required")
// })

// const loginSchema = yup.object().shape({
//     email: yup.string().email("invalid email").required("required"),
//     password: yup.string().required("required")
// })

// const initialValuesRegister = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     location: "",
//     occupation: "",
//     picture: ""
// }

// const initialValuesLogin = {
//     email: "",
//     password: ""
// }

// function Form() {
//     const [pageType, setPageType] = useState("login")
//     const theme: CustomThemeInterface = useTheme()
    
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
    
//     const isNonMobileScreen = useMediaQuery("(min-width: 600px)")

//     const isLogin = pageType == "login"
//     const isRegister = pageType == "register"

//     async function handleFormSubmit(values: any, onSubmitProps: any) {

//     }

//     return (
//         <Formik onSubmit={handleFormSubmit} initialValues={isLogin ? initialValuesLogin : initialValuesRegister} validationSchema={isLogin ? loginSchema : registerSchema}>
//             {({
//                 values,
//                 errors,
//                 touched,
//                 handleBlur,
//                 handleChange,
//                 handleSubmit,
//                 setFieldValue,
//                 resetForm
//             }) => (
//                 <form onSubmit={handleSubmit}>
//                     <div className="grid gap-[3rem] grid-cols-4">
//                         {isRegister && (
//                             <>
//                                 <TextField label="First Name" onBlur={handleBlur} onChange={handleChange} value={values.firstName} name="firstName" error={"firstName" in touched && Boolean(errors.firstName)} helperText={"firstName" in touched && errors.firstName} sx={{gridColumn: "span 2"}}/>
//                             </>
//                         )}
//                     </div>
//                 </form>
//             )}
//         </Formik>
//     )
// }

// export default Form