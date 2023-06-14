import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignUpForm from '../components/SignUpForm'
import UserType from '../components/UserType'
import { ControlContextProvider, useControlContext } from '@/components/ControlContext';
import RegisterComp from '@/components/RegisterComp';

//const { userType } = useControlContext();

// TODO remove, this demo shouldn't need to reset the theme.

export default function Register() {

  return (
    <ControlContextProvider>
      <RegisterComp />
    </ControlContextProvider>
  );
}