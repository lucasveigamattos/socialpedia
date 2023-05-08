import {Button, TextField, useMediaQuery, Typography, useTheme} from "@mui/material"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import {Formik} from "formik"
import * as yup from "yup"
import {json, useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import {useDropzone} from "react-dropzone"

import {CustomThemeInterface} from "../../theme"

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required")
})

const registerInitialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: {
        name: ""
    }
}

function RegisterForm() {
    const theme: CustomThemeInterface = useTheme()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isNonMobileScreen = useMediaQuery("(min-width: 600px)")

    async function handleFormSubmit(values: any) {
        const formData = new FormData()

        for (const value in values) {
            formData.append(value, values[value])
        }
        formData.append("picturePath", values.picture.name)

        const response = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            body: formData
        })

        const data = await response.json()

        if (response.status == 201 && data) navigate("/")
    }

    return (
        <Formik onSubmit={handleFormSubmit} initialValues={registerInitialValues} validationSchema={registerSchema}>
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm
            }) => {
                const {getRootProps, getInputProps} = useDropzone({
                    accept: {
                        "image/jpg": [],
                        "image/jpeg": [],
                        "image/png": []
                    },
                    onDrop(acceptedFiles) {
                        setFieldValue("picture", acceptedFiles[0])
                    }
                })

                return (
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-[3rem] grid-cols-4 mb-[3.2rem]">
                            <>
                                <TextField label="First Name" onBlur={handleBlur} onChange={handleChange} value={values.firstName} name="firstName" error={Boolean(touched.firstName) && Boolean(errors.firstName)} helperText={touched.firstName && errors.firstName} sx={{gridColumn: isNonMobileScreen ? "span 2" : "span 4"}}/>
                                <TextField label="Last Name" onBlur={handleBlur} onChange={handleChange} value={values.lastName} name="lastName" error={Boolean(touched.lastName) && Boolean(errors.lastName)} helperText={touched.lastName && errors.lastName} sx={{gridColumn: isNonMobileScreen ? "span 2" : "span 4"}}/>
                                <TextField label="Email" onBlur={handleBlur} onChange={handleChange} value={values.email} name="email" error={Boolean(touched.email) && Boolean(errors.email)} helperText={touched.email && errors.email} sx={{gridColumn: "span 4"}}/>
                                <TextField label="Password" type="password" onBlur={handleBlur} onChange={handleChange} value={values.password} name="password" error={Boolean(touched.password) && Boolean(errors.password)} helperText={touched.password && errors.password} sx={{gridColumn: "span 4"}}/>
                                <TextField label="Location" onBlur={handleBlur} onChange={handleChange} value={values.location} name="location" error={Boolean(touched.location) && Boolean(errors.location)} helperText={touched.location && errors.location} sx={{gridColumn: "span 4"}}/>
                                <TextField label="Occupation" onBlur={handleBlur} onChange={handleChange} value={values.occupation} name="occupation" error={Boolean(touched.occupation) && Boolean(errors.occupation)} helperText={touched.occupation && errors.occupation} sx={{gridColumn: "span 4"}}/>

                                <div className="col-span-4 rounded-[0.5rem] py-[1.6rem] px-[1.6rem]" style={{border: `0.1rem solid ${theme.pallete.neutral.medium}`}}>
                                    <div {...getRootProps()} className="py-[1.6rem] px-[1.6rem] cursor-pointer" style={{border: `0.2rem dashed ${theme.pallete.primary.main}`}}>
                                        <input {...getInputProps()}/>
                                        {!values.picture ? (
                                            <p>Add picture here</p>
                                        ) : (
                                            <div className="flex justify-between items-center">
                                                <Typography>{values.picture.name}</Typography>
                                                <EditOutlinedIcon/>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        </div>
                        <div>
                            <Button fullWidth type="submit" sx={{color: theme.pallete.background.alternative, p: "1.6rem", marginBottom: "3.2rem", backgroundColor: theme.pallete.primary.main, "&:hover": {color: theme.pallete.primary.main}}}>Register</Button>
                            <Typography onClick={() => {navigate("/")}} className="underline cursor-pointer" sx={{color: theme.pallete.primary.main, "&:hover": {color: theme.pallete.primary.light}}}>
                                Already have an account? Login here.
                            </Typography>
                        </div>
                    </form>
                )
            }}
        </Formik>
    )
}

export default RegisterForm