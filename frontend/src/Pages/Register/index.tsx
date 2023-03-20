
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useAxios from "axios-hooks";
import { useEffect } from "react";
import { useHistory, useLocation,Link } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import useForm from "../../_hooks/useForm";


export const Register = () => {

  const history = useHistory();
  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const userInfo =
    JSON.parse(localStorage.getItem("userInfo"));

  const { control, errors, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',

    },
    validationSchema: {},
  });

  const [{ loading, error }, login] = useAxios({
    url: '/api/users/login',
    method: 'POST',

  }, { manual: true, })

  useEffect(() => {
    if(userInfo) {
        history.push(redirect)
    }
}, [history, userInfo, redirect])


  const onSubmit = async (data: any) => {

    const dataUser = await login({ data: { ...data } })

    if (dataUser && !error) {
      localStorage.setItem('userInfo', JSON.stringify(data))

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
          <Box>
            <Input id="email" name="email" label="email" control={control} errors={errors} />
          </Box>
          <Box>
            <Input id="password" name="password" label="password" control={control} errors={errors} />
          </Box>
          <Button text="Login" type="submit" variant='contained' loading={loading}/>
          <Grid container>
            <Grid item>
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>  Log-in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Register