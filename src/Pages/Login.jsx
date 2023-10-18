import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Form, Formik } from "formik";
import * as yup from "yup";
import {login, verifyLoginState} from "../Services/Login.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';



const Login = ({setIsAuthenticated, preferredMode, theme}) => {
  const navigate = useNavigate();
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState("")
  const [showToast, setShowToast] = useState(false)

  const initialValues = {
    name: "",
    psw: "",
  };

  const checkoutSchema = yup.object().shape({
    name: yup.string().required("username is required"),
    psw: yup.string().required("password is required")
  });


  useEffect(() => {
    if (error && showToast) {
      toast.error(error, 
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
    }
  }, [error, showToast]);

const handleFormSubmit = async (values) => {
  try {
    setButtonDisabled(true);
    await login(values).then((statusCode) =>{
      if(statusCode === 200){
        verifyLoginState().then((statusCode) => {
          if(statusCode === 200){
            setIsAuthenticated(true)
            navigate('/dashboard');
          }
        }).catch(function (error){
          setIsAuthenticated(false);
        });
      }
  }) 
  }catch (error) {
    let errorMessage = "An error occurred";
    if (error.response.status == 404){
      errorMessage = "User does not exist"
    }else if(error.response.status == 401){
      errorMessage = "Wrong password";
    }
    setButtonDisabled(false);
    setError(errorMessage);
    setShowToast(true)
  }finally{
    setButtonDisabled(false)
  }
};
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Box p="10% 38%" width="100%" height="100%" sx={{ backgroundColor: preferredMode ? 'primary' : 'white' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: preferredMode ? '#6ff9ff' : '#1976d2' }}>
          <LockOutlinedIcon style={{ color: preferredMode ? 'black' : 'white' }} />
        </Avatar>
        <Typography component="h1" variant="h5" fontSize="2rem" color={preferredMode ? 'white' : 'black'}>
          Sign in
        </Typography>
        <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}>
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (<Form onSubmit={handleSubmit}>
        <TextField
        fullWidth
        variant="outlined"
        label="User name"
        type="text"
        color={preferredMode? "secondary":"primary"}
        autoComplete="off"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.name}
        name="name"
        error={!!touched.name && !!errors.name}
        helperText={touched.name && errors.name}
        sx={{margin: "1rem 0"}}
        />
        <TextField
        fullWidth
        variant="outlined"
        label="Password"
        type="password"
        color={preferredMode? "secondary":"primary"}
        autoComplete="off"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.psw}
        name="psw"
        error={!!touched.psw && !!errors.psw}
        helperText={touched.psw && errors.psw}
        />
        {/*<FormControlLabel
          sx={{
            color: preferredMode ? 'white' : 'black',
            '& .MuiCheckbox-root': { color: preferredMode ? 'white' : 'black' },
            '& .MuiCheckbox-colorPrimary.Mui-checked': { color: preferredMode ? '#00ffff' : '#1976d2' },
          }}
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />*/}
        <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          bgcolor: preferredMode ? '#6ff9ff' : '#1976d2',
          color: preferredMode ? 'black' : 'white',
          fontSize: '1.2rem',
          textTransform: 'none',
          '&:hover': {
            bgcolor: preferredMode ? '#6ff9ff' : '#0f4a8e',
          },
          }}
          disabled={isButtonDisabled}
        >
          Sign In
        </Button>
      </Form>
      )}
    </Formik>
  </Box>
  {showToast && <ToastContainer/>}
</Box>
</ThemeProvider>
  );
};
  

export default Login;