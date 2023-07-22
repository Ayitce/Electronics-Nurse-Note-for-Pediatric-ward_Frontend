import { useAuth } from "@/_auth";
import AdmitForm from "@/components/AdmitForm";
import IMedicalForm from "@/components/IMedicalForm";
import Navbar from "@/components/Navbar";
import RoomForm from "@/components/RoomForm";
import { setup } from "@/lib/csrf";
import firebase from "@/services/firebase";
import { admitPatient } from "@/services/patientService";
import { getRoomList } from "@/services/roomService";
import { AppBar, Box, Button, Container, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Step, StepLabel, Stepper, TextField, ThemeProvider, Toolbar, Typography, createTheme } from "@mui/material";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { ref, uploadBytes } from "firebase/storage";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PatientExisted from "@/components/PatientExisted";

export interface IPatientCard {
    id: number;
    bed: { id: number };
    room: { id: number };
    patient: {
        id: any;
        name: string;
        surname: string;
        gender: any;
        idCard: string;
        height: string;
        weight: string;
        bloodType: any;
        dateOfBirth: any;
        hn: string;
        symptom: string;
        allergies: string;
        address: string;
        parentName: string;
        phoneNumber: string;
        imageFile: File;
        image: string;
        doctor: {
            id: number;
            name: string;
            surname: string;
            medicalID: string;
            phoneNumber: string;
        };
    };
    admitDateTime: any;
    dischargeDate: any;
    an: string;
    age: string;
    isExisted: boolean;
}

export default function AdmitPatient() {
    const [existed, setExisted] = useState<boolean>(true);

    const { isLoggedIn } = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        control,
        setValue,
        trigger
    } = useForm<IPatientCard>({
        mode: "onSubmit"
    })
    useEffect(() => {
        //loadPatientFromApi()
        const fetchData = async () => {
            // get the data from the api
            const room = await loadRoomFromAPI()
            console.log(room)
            //setPatientInfo(patient)
        }

        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, [])

    const loadRoomFromAPI = async () => {
        const response = await getRoomList()
        // setPatientInfo(response.data)
        return response.data
    }

    const handleAdmit = (data: IPatientCard) => new Promise(async (resolve) => {
        // call api

        // .......

        //alert("Success, Ready to request to API")
        //alert(JSON.stringify(data))

        const stamp = dayjs().format("YYYYMMDDHHmmss")
        const filename = `${stamp}-${data.patient.imageFile?.name}`
        const storageRef = ref(
            firebase.storage,
            `${filename}`
        )

        uploadBytes(storageRef, data.patient.imageFile).then((e) => {
            //  alert("upload success")
            //  alert(JSON.stringify(e.ref.fullPath))
            if (data.patient.imageFile != null) {
                data.patient.image = e.ref.fullPath
            }
            const day = dayjs()
            const age = day.diff(dayjs(data.patient.dateOfBirth), 'month')
            console.log("age : ", Math.floor(age / 12), " ปี", age % 12, "เดือน")
            data.age = Math.floor(age / 12) + " ปี " + age % 12 + " เดือน";
            admitPatient({
                ...data,
                admitDateTime: data.admitDateTime || dayjs().format("YYYY-MM-DD HH:mm"),
            })
            //router.push('/patient/list')
        }).catch(err => alert("ERROR + " + JSON.stringify(err)))

        /* const formData = new FormData();
        formData.append("file", data.patient.image)

        
        console.log("pt : ", formData)
        const response = await uploadImage(formData);
        console.log(response.data) */

        /* admitPatient({
            ...data,
            admitDateTime: data.admitDateTime || dayjs().format("YYYY-MM-DD hh:mm A"),
        }) */
        resolve(null)
        //router.push('/patient/list')
        handleNext().then(async () => {
            const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));
            await delay(2000)
            router.push('/patient/' + data.an)
        })

    })
    const handleCancel = () => {
        router.push('/patient/list')

    }
    const steps = ['เลือกห้องและเตียงที่ว่าง','ผู้ป่วยเก่า','ใส่ข้อมูลผู้ป่วย', 'ใส่ข้อมูลทางการแพทย์'];

    const stepContent: any[] = [
        <RoomForm register={register} errors={errors} control={control} setValue={setValue} />
        , <PatientExisted register={register} errors={errors} control={control} setValue={setValue} existed={existed} setExisted={setExisted} />
        , <AdmitForm register={register} errors={errors} control={control} setValue={setValue} existed={existed} setExisted={setExisted} />
        , <IMedicalForm register={register} errors={errors} control={control} setValue={setValue} />
    ]

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = async () => {
        const isStepValid = await trigger();
        if (isStepValid)
            setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };


    return (
        <>
            <CssBaseline />
            <Navbar item={
                <Button href="/" color="inherit"></Button>
            } isLoggedIn={isLoggedIn} />
            <form onSubmit={handleSubmit(handleAdmit)}>
                <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                    <Grid container sx={{ mt: 3 }}>
                        <Grid item md={1}>
                            <Button
                                variant='contained'
                                onClick={() => router.push("/patient/list")}
                            >
                                <ArrowBackIcon />
                            </Button>
                        </Grid>
                    </Grid>
                    <Paper sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center">
                            เพิ่มการ Admit ใหม่
                        </Typography>
                        <React.Fragment>
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
                                        ลงทะเบียน Admit ใหม่สำเร็จ
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
                                                //onClick={handleNext}
                                                sx={{ mt: 3, ml: 1 }}
                                            >
                                                บันทึก
                                            </Button>
                                        )}
                                    </Box>
                                </React.Fragment>
                            )}
                        </React.Fragment>

                    </Paper>
                </Container>
            </form>
        </>
    );
}


export const getServerSideProps = setup(async (req, res) => {
    return {
        props: {}
    }
})
