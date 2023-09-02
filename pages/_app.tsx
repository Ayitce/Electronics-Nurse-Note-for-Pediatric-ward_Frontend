import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { AuthProvider } from '../_auth';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
  },
  typography: {
    fontFamily: 'Sarabun',
    fontSize: 16
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#80A9E5',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      // light: '#0066ff',
      main: '#FDD7F0',
      // dark: will be calculated from palette.secondary.main,
      //  contrastText: '#ffcc00',
    },
  },
  
});
export default function App({ Component, pageProps }: AppProps) {
  return <SessionProvider>
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </LocalizationProvider>
    </AuthProvider>
  </SessionProvider>
}
