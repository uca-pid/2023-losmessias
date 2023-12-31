import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useApi } from '../../hooks/useApi.js';
import { CircularProgress, CssBaseline } from '@mui/material';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PasswordComponent from '@/components/PasswordComponent.jsx';

const defaultTheme = createTheme();

const REG_PASSWORD = /.{8,}/;

export default function RecoverPassword() {

	const router = useRouter()
	var token = router.query.token;
	var email = router.query.email;

	const [errorPassword, setErrorPassword] = useState("");

	const { changePassword, confirmTokenForgotPassword } = useApi();
	const [isProcessing, setIsProcessing] = useState(false);

	useEffect(() => {
		confirmTokenForgotPassword(token);
	}, [token, confirmTokenForgotPassword]);

	const handleSubmit = (event) => {
		event.preventDefault();
		const datos = new FormData(event.currentTarget);

		const request = {
			email: email,
			password: datos.get('password')
		};
		changePassword(request, setIsProcessing);
	};

	return (

		<ThemeProvider theme={defaultTheme}>
			<Grid container component='main' justifyContent='center' direction='row' sx={{ height: '100vh' }}>
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
						<Typography component="h1" variant="h5">
							Recover Password
						</Typography>
						<Typography component="h7" variant="h7">
							Write the new password
						</Typography>
						<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
							<Grid container spacing={2} >
								<PasswordComponent />
								<Button
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
									disabled={isProcessing}
								>
									{!isProcessing && <CircularProgress size={20} style={{ marginRight: 10 }} />}
									Confirm New Password
								</Button>
							</Grid>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}