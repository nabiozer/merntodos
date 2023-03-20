
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import useAxios from "axios-hooks";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import toastMessage from "../../components/Notification/toastMessage";
import useForm from "../../_hooks/useForm";


export const Login = () => {

  const history = useHistory();
  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const { control, errors, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',

    },
    validationSchema: {},
  });

  const [{  loading ,error}, login] = useAxios({
    url: '/api/users/login',
    method: 'POST',

  }, { manual: true, })


  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  useEffect(() => {
    error?.response?.data?.message && toastMessage({message: error?.response?.data?.message,messageType:'error'})
  }, [error?.response?.data?.message])


  const onSubmit = async (data: any) => {
    
    const dataUser = await login({ data: { ...data } })
 
    if (dataUser?.data && !loading) {
      localStorage.setItem('userInfo', JSON.stringify(dataUser?.data))
      toastMessage({message: `Welcome ${dataUser?.data?.name}`,messageType:'success'})
    } 

  }


  
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <Box sx={{ mt: 1 }}>
            <Input id="email" name="email" label="email" control={control} errors={errors} />
          </Box>
          <Box sx={{ mt: 1 }}>
            <Input id="password" name="password" label="password" control={control} errors={errors} />
          </Box>
          <Box sx={{ mt: 1 }}>
            <Button text="Login" type="submit" variant='contained' />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Login