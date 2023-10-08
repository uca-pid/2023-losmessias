import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LogIn from './LogIn';
import SignUp from './SignUp';
import TransferList from './TransferList';
import ForgotPassword from './ForgotPassword';
import { useState } from 'react';

const defaultTheme = createTheme();

export default function Page({ transferList, setTransferList, logInForm, setLogInForm, signUpForm, setSignUpForm,  forgotPassword, setForgotPassword}) {
    
    const [request, setRequest] = useState({});

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component='main' justifyContent='center' direction='row' sx={{ height: '91vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            'url(https://buscatusclases.com/wp-content/uploads/2022/06/profesor-particular-verano-alumnos.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: t => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 6,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        {signUpForm && (
                            <SignUp setRequest={setRequest} setTransferList={setTransferList} setLogInForm={setLogInForm} setSignUpForm={setSignUpForm} setForgotPassword={setForgotPassword}></SignUp>
                        )}
                        {forgotPassword && <ForgotPassword setSignUpForm={setSignUpForm} setForgotPassword={setForgotPassword}></ForgotPassword>}
                        {logInForm && <LogIn setLogInForm={setLogInForm} setSignUpForm={setSignUpForm}></LogIn>}
                        {transferList && <TransferList request={request} ></TransferList>}
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}