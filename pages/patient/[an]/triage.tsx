import { useAuth } from "@/_auth";
import AdmitForm from "@/components/AdmitForm";
import IMedicalForm from "@/components/IMedicalForm";
import Navbar from "@/components/Navbar";
import RoomForm from "@/components/RoomForm";
import { setup } from "@/lib/csrf";
import firebase from "@/services/firebase";
import { addNewTriage, admitPatient } from "@/services/patientService";
import { getRoomList } from "@/services/roomService";
import { AppBar, Box, Button, Container, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Step, StepLabel, Stepper, TextField, ThemeProvider, Toolbar, Typography, createTheme } from "@mui/material";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { ref, uploadBytes } from "firebase/storage";
import router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PatientExisted from "@/components/PatientExisted";
import FactorGroup from "@/components/triage/IndicatorForm";
import IndicatorGroup from "@/components/triage/IndicatorForm";
import VitalSignForm from "@/components/triage/VitalSignForm";
import TotalSymptoms from "@/components/triage/TotalSymptoms";
import InitialIndicator from "@/components/triage/InitialImpression";
import PhysicalExam from "@/components/triage/PhysicalExam";
import RiskFactor from "@/components/triage/RiskFactor";

export interface ITriage {
    id: number,
    e: number,
    v: number,
    m: number,
    tube: boolean,
    date: string,
    indicator: {
        respiratory: boolean,
        sepsis: boolean,
        shock: boolean,
        seizure: boolean
    },
    vitalSign: {
        heartRate: number,
        respiratoryRate: number,
        temperature: number,
        oxygenSaturation: number,
        oxygenTherapy: number,
        systolic_blood_pressure: number,
        diastolic_blood_pressure: number
    },
    add: {
        poor_feeding: boolean,
        history_of_seizure: boolean,
        generalize_seizure: boolean,
        comoatose_stage_seizure: boolean,
        gcs: number
    },
    initialImpression: {
        scalene_muscle: boolean,
        irritable: boolean,
        stupor_drownsiness: boolean,
        dehedration: boolean,
        nasal_flaring: boolean,
        subcostral_retraction: boolean,
        supersternal_retraction: boolean,
        grunting: boolean,
        pale_cyanosis: boolean,
        motting_skin: boolean,
        petichea: boolean
    },
    riskFactor: {
        suspected_infection: boolean,
        organtranplantation: boolean,
        history_bone_marrow: boolean
        primary_immune_defencing: boolean,
        postSplenectomy_asplenia: boolean,
        malignancy: boolean,
        bedRidden_cerebralPulsy: boolean,
        center_iv_catheter: boolean
    },
    physicalExam: {
        weak_pulse: boolean,
        bounding_pulse: boolean,
        cap_refill: boolean,
        flash_cap: boolean,
        consciousness: string,
        airEntry: number,
        wheezing: number
    },
    triageResult: {
        mpew: number,
        result_respiratory: string,
        result_sepsis: string,
        result_shock: string,
        result_seizure: string
    }


}

export default function AdmitPatient() {

    const { isLoggedIn } = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        control,
        setValue,
        trigger
    } = useForm<ITriage>({
        mode: "onSubmit",
        defaultValues: {
            tube: false,
            e: 1,
            v: 1,
            m: 1,
            indicator: {
                respiratory: false,
                sepsis: false,
                shock: false,
                seizure: false
            },
            vitalSign: {
                oxygenTherapy: 0
            },
            physicalExam: {
                weak_pulse: false,
                bounding_pulse: false,
                cap_refill: false,
                flash_cap: false,
                consciousness: "A",
                airEntry: 0,
                wheezing: 0
            },
            initialImpression: {
                scalene_muscle: false,
                irritable: false,
                stupor_drownsiness: false,
                dehedration: false,
                nasal_flaring: false,
                subcostral_retraction: false,
                supersternal_retraction: false,
                grunting: false,
                pale_cyanosis: false,
                motting_skin: false,
                petichea: false
            },
            riskFactor: {
                suspected_infection: false,
                organtranplantation: false,
                history_bone_marrow: false,
                primary_immune_defencing: false,
                postSplenectomy_asplenia: false,
                malignancy: false,
                bedRidden_cerebralPulsy: false,
                center_iv_catheter: false
            },
            add: {
                poor_feeding: false,
                history_of_seizure: false,
                generalize_seizure: false,
                comoatose_stage_seizure: false,
                gcs: 0
            },
        }
    })

    const router = useRouter();
    const { an } = router.query;

    const handleAdmit = (data: ITriage) => new Promise(async (resolve) => {
        console.log(data)
        if (data.tube)
            data.add.gcs = data.e + data.m
        else
            data.add.gcs = data.e + data.v + data.m
        addNewTriage(`${an}`, {
            ...data,
        }).then(response =>
            router.push({
                pathname: '/patient/' + an + '/result',
                query: {
                    myData: JSON.stringify(response.data)
                }
            })
        )
        //console.log(response.data))
        resolve(null)
    })

    const handleCancel = () => {
        router.push('/patient/list')

    }
    const steps = ['อาการของผู้ป่วยที่น่าเป็นห่วง', 'Vital Sign monitor', 'Total symptoms', 'Initial impression', 'Risk factor', 'การตรวจร่างกาย'];

    const stepContent: any[] = [
        <IndicatorGroup register={register} errors={errors} control={control} setValue={setValue} />,
        <VitalSignForm register={register} errors={errors} control={control} setValue={setValue} />,
        <TotalSymptoms register={register} errors={errors} control={control} setValue={setValue} />,
        <InitialIndicator register={register} errors={errors} control={control} setValue={setValue} />,
        <RiskFactor register={register} errors={errors} control={control} setValue={setValue} />,
        <PhysicalExam register={register} errors={errors} control={control} setValue={setValue} />
        // <RoomForm register={register} errors={errors} control={control} setValue={setValue} />
        // , <PatientExisted register={register} errors={errors} control={control} setValue={setValue} existed={existed} setExisted={setExisted} />
        // , <AdmitForm register={register} errors={errors} control={control} setValue={setValue} existed={existed} setExisted={setExisted} />
        // , <IMedicalForm register={register} errors={errors} control={control} setValue={setValue} />
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
                            Triage
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
