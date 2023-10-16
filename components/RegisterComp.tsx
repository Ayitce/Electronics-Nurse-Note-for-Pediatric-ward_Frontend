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
import { useControlContext } from '@/components/ControlContext';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { registerNurse, registerDoctor } from '@/services/userService'
import dayjs from 'dayjs';
import router from 'next/router';


const steps = ['เลือกประเภทผู้ใช้', 'ใส่ข้อมูลทั่วไป'];

/* function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <UserType />;
        case 1:
            return <SignUpForm />;
        default:
            throw new Error('Unknown step');
    }
} */

export interface IRegisterForm {
    name: string;
    surname: string;
    gender: any;
    email: string;
    password: string;
    confirmPassword: string;
    medicalID: string;
    phoneNumber: string;
    type: string;
    speciality: string;
}


export default function RegisterComp() {


    const [selectedNurse, setSelectedNurse] = React.useState(false);
    const [selectedDoctor, setSelectedDoctor] = React.useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        control,
        setValue
    } = useForm<IRegisterForm>({
        mode: "onSubmit"
    })
    const stepContent: any[] = [<UserType selectedDoctor={selectedDoctor} selectedNurse={selectedNurse} setSelectedDoctor={setSelectedDoctor} setSelectedNurse={setSelectedNurse} />, <SignUpForm register={register} errors={errors} control={control} setValue={setValue} selectedDoctor={selectedDoctor} />]

    const handleRegister = (data: IRegisterForm) => new Promise((resolve) => {

        // validate data before request API 
        if (data.password !== data.confirmPassword) {
            setError("password", { message: "รหัสผ่านไม่ตรงกัน" })
            setError("confirmPassword", { message: "รหัสผ่านไม่ตรงกัน" })
            resolve(null)
            return;
        }

        if (selectedNurse == true) {
            registerNurse({
                ...data,
            })
        } else if (selectedDoctor == true) {
            registerDoctor({
                ...data,
            })
        }


        resolve(null)

        handleNext().then(async () => {
            const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));
            await delay(2000)
            router.push('/user')
        })
    })

    const { userType } = useControlContext()

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = async () => {
        console.log("nurse: ", selectedNurse)
        console.log("doctor: ", selectedDoctor)
        if (selectedNurse == false && selectedDoctor == false) {
            return
        }
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <>
            <CssBaseline />
            <form onSubmit={handleSubmit(handleRegister)}>
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center" >
                            ลงทะเบียนผู้ใช้ใหม่
                        </Typography>
                        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom align="center">
                                    ลงทะเบียนผู้ใช้ใหม่สำเร็จ
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {stepContent[activeStep]}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                            ย้อนกลับ
                                        </Button>
                                    )}
                                    {selectedNurse == false && selectedDoctor == false && (
                                        <Typography component="h1" variant="subtitle1" align="center" color='error' >
                                            กรุณาระบุประเภทของผู้ใช้
                                        </Typography>
                                    )}
                                    {activeStep !== steps.length - 1 && (
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 3, ml: 1 }}
                                        >
                                            ต่อไป
                                        </Button>
                                    )}
                                    {activeStep === steps.length - 1 && (
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            sx={{ mt: 3, ml: 1 }}
                                        >
                                            สมัคร
                                        </Button>
                                    )}
                                </Box>
                            </React.Fragment>
                        )}
                    </Paper>
                </Container>
            </form>
        </>
    );
}