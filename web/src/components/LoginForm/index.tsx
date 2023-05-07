import {Button, TextField, Typography, useTheme} from "@mui/material"
import {Formik} from "formik"
import * as yup from "yup"
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"

import {setLogin} from "../../pages/state"
import {CustomThemeInterface} from "../../theme"

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required")
})

const loginInitialValues = {
    email: "",
    password: ""
}

function LoginForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const theme: CustomThemeInterface = useTheme()

    async function handleFormSubmit(values: any) {
        const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        })

        const data = await response.json()
        
        if (response.status == 200 && data) {
            dispatch(
                setLogin({
                    user: data.user,
                    token: data.token
                })
            )

            navigate("/home")
        }
    }

    return (
        <Formik onSubmit={handleFormSubmit} initialValues={loginInitialValues} validationSchema={loginSchema}>
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
                return (
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-[3rem] grid-cols-4 mb-[3.2rem]">
                            <TextField label="Email" onBlur={handleBlur} onChange={handleChange} value={values.email} name="email" error={Boolean(touched.email) && Boolean(errors.email)} helperText={touched.email && errors.email} sx={{gridColumn: "span 4"}}/>
                            <TextField label="Password" type="password" onBlur={handleBlur} onChange={handleChange} value={values.password} name="password" error={Boolean(touched.password) && Boolean(errors.password)} helperText={touched.password && errors.password} sx={{gridColumn: "span 4"}}/>
                        </div>

                        <div>
                            <Button fullWidth type="submit" sx={{color: theme.pallete.background.alternative, p: "1.6rem", marginBottom: "3.2rem", backgroundColor: theme.pallete.primary.main, "&:hover": {color: theme.pallete.primary.main}}}>Login</Button>
                            <Typography onClick={() => {navigate("/signup")}} className="underline cursor-pointer" sx={{color: theme.pallete.primary.main, "&:hover": {color: theme.pallete.primary.light}}}>
                                Don't have an account? Sign up here.
                            </Typography>
                        </div>
                    </form>
                )
            }}
        </Formik>
    )
}

export default LoginForm