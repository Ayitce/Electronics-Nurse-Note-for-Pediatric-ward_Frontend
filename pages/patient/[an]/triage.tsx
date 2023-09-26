import { useAuth } from "@/_auth";
import AdmitForm from "@/components/AdmitForm";
import IMedicalForm from "@/components/IMedicalForm";
import Navbar from "@/components/Navbar";
import RoomForm from "@/components/RoomForm";
import { setup } from "@/lib/csrf";
import firebase from "@/services/firebase";
import { addNewTriage, admitPatient, getPatientByAN } from "@/services/patientService";
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
import { getProfile } from "@/services/userService";

export interface ITriage {
    id: number,
    nurseName: string,
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
        gcs: number,
        e: number,
        v: number,
        m: number,
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
        severity: number;
        result_respiratory: string,
        result_sepsis: string,
        result_shock: string,
        result_seizure: string
    }


}


const stepStyle = {
    "& .Mui-active": {
        text:{
            fill: "white"
        },
        "&.MuiStepIcon-root": {
            color: "#008EFF",
        }
    }
}

export default function AdmitPatient() {

    const [profile, setProfile] = useState<any>();


    useEffect(() => {
        //loadPatientFromApi()
        const fetchData = async () => {
            // get the data from the api
            const data = await loadProfileFromAPI()
            console.log("profile", data)
            setProfile(data)
        }

        fetchData()
            // make sure to catch any error
            .catch(console.error);

    }, [])

    const loadProfileFromAPI = async () => {
        const response = await getProfile()
        // setPatientInfo(response.data)
        return response.data


    }
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
            indicator: {
                respiratory: true,
                sepsis: true,
                shock: true,
                seizure: true
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
                gcs: 0,
                e: 1,
                v: 1,
                m: 1,
            },
        }
    })

    const router = useRouter();
    const { an } = router.query;

    const handleAdmit = (data: ITriage) => new Promise(async (resolve) => {
        console.log(data)
        data.nurseName = profile.nurse.name + ' ' + profile.nurse.surname
        if (data.tube)
            data.add.gcs = data.add.e + data.add.m
        else
            data.add.gcs = data.add.e + data.add.v + data.add.m
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
    const steps = ['Vital Sign', 'Total symptoms', 'Initial impression', 'Risk factor', 'การตรวจร่างกาย'];

    const stepContent: any[] = [
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

    const day = dayjs().format('DD/MM/YYYY')
    console.log(day)
    const [patient, setPatient] = React.useState<any>()
    useEffect(() => {
        //loadPatientFromApi()
        const fetchData = async () => {
            if (!an) return
            // get the data from the api
            const patient = await loadPatientWithAN()
            setPatient(patient)
        }

        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, [an])

    const loadPatientWithAN = async () => {
        const response = await getPatientByAN(`${an}`)
        console.log(response)
        return response.data
    }


    return (
        <>
            <CssBaseline />
            <Navbar item={
                <Button href="/" color="inherit"></Button>
            } isLoggedIn={isLoggedIn} />
            <form onSubmit={handleSubmit(handleAdmit)}>
                <Container component="main" maxWidth="md" sx={{ mb: 4 }}>

                    <Grid container sx={{ mt: 3 }}>
                        <Grid item sm={1}>
                            <Button
                                variant='contained'
                                onClick={() => router.push("/patient/" + an)}
                            >
                                <ArrowBackIcon />
                            </Button>
                        </Grid>
                        <Grid item sm={8.5}> </Grid>

                        <Grid item sm={2.5}>
                            <Paper variant="outlined" sx={{ backgroundColor: "#DADADA" }}>
                                <Typography align="center" variant="subtitle2">
                                    {patient?.name} {patient?.surname}
                                </Typography>
                                <Typography align="center" variant="subtitle2">
                                    {an} {patient?.hn}
                                </Typography>
                                <Typography align="center" variant="subtitle2">
                                    today : {day}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Paper sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center">
                            Triage
                        </Typography>
                        <React.Fragment>
                            <Stepper activeStep={activeStep} sx={{ ...stepStyle, pt: 3, pb: 5 }}>
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
