import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '@/_auth';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from "react-hook-form";
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { setup } from '@/lib/csrf';
import Navbar from '@/components/Navbar';


export interface LoginForm {
  username: string;
  password: string;
}

export default function SignIn() {

  const { signIn } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<LoginForm>({
    mode: "onSubmit"
  });

  const handleLogin: SubmitHandler<LoginForm> = (data) => new Promise((resolve, reject) => {
    const username = data.username
    const password = data.password

    signIn(username, password).then(() => {
      router.push("/")
    }).catch(() => {
      setError("username", { message: "" })
      setError("password", { message: "อีเมลล์หรือรหัสผ่านไม่ถูกต้อง" })
    })
  })

  const { isLoggedIn, role } = useAuth()

  return (
    <>
      <Navbar item={
        <Button href="/" color="inherit"></Button>
      } isLoggedIn={isLoggedIn} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={(handleSubmit(handleLogin))} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              autoComplete="username"
              {...register("username", { required: "โปรดระบุอีเมลล์" })}
              helperText={errors.username?.message}
              error={!!errors.username}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", { required: "โปรดระบุรหัสผ่าน" })}
              helperText={errors.password?.message}
              error={!!errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                </Link>
              </Grid>
              <Grid item>
                {/*  <Link href="/user/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>);
}


export const getServerSideProps = setup(async (req: NextApiRequest, res: NextApiResponse) => {
  try {

    const session = await getServerSession(req, res, authOptions)

    if (session) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    return {
      props: {}
    }
  } catch (err) {
    return {
      redirect: {
        destination: '/error',
        permanent: false
      }
    }
  }
})