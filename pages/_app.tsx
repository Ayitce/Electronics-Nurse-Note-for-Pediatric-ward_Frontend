import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { AuthProvider } from '../_auth';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

const theme = createTheme();

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
