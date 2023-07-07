import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Control, Controller, FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { IRegisterForm } from './RegisterComp';
import { AppBar, Box, CardContent, CircularProgress, Container, Paper, Toolbar } from '@mui/material';
import nursePNG from '../public/assets/nurse.png'
import Image from 'next/image'
import { StorageReference, getDownloadURL, ref } from 'firebase/storage';
import { useEffect } from 'react';
import firebase from '@/services/firebase';

export interface IPatientCard {
    id: number;
    bed: { id: number };
    room: { id: number };
    patient: {
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
        image: any;
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
}

interface ImageStorageRef {
    ref: StorageReference
    url: string
}

export default function PatientCard(props: IPatientCard) {

    const [uploadedImages, setUploadImages] = React.useState<string>()

    useEffect(() => {
        if (!props.patient.image) return
        const storageRef = ref(
            firebase.storage,
            `${props.patient.image}`
        )
        getDownloadURL(storageRef).then((url) => {
            console.log(url)
            setUploadImages(url)
        })
    }, [props.patient.image])

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Container component="main" maxWidth="md" sx={{ mb: 4 }}>

                    <Paper sx={{ my: { xs: 3, md: 6 } }}>
                        <Toolbar variant='dense' sx={{ backgroundColor: '#FDD7F0' }}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                ประวัติส่วนตัวผู้ป่วย หมายเลขแอดมิท  {props.an}
                            </Typography>
                            <Typography align="right" variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
                                รหัสประจำตัวผู้ป่วย  {props.patient.hn}
                            </Typography>
                        </Toolbar>
                        <Grid container spacing={3} sx={{ p: { xs: 3, md: 2 }, pt: { xs: 3, md: 3 } }}>
                            <Grid item container md={3}>
                                <Grid item md={3}>
                                    <CardContent >
                                        {uploadedImages ?
                                            <Image src={uploadedImages}
                                                width={150}
                                                height={150}
                                                sizes="100vw"
                                                alt="NurseIcon" />
                                            :
                                            <CircularProgress />
                                        }


                                    </CardContent>

                                </Grid>
                            </Grid>
                            <Grid item container md={4.5}>
                                <Grid item md={12}>
                                    <Typography variant="h5" fontWeight='bold' >
                                        {props.patient.name} {props.patient.surname}
                                    </Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography variant="subtitle1" component='div' >
                                        <Box fontWeight='bold' display='inline'>  อายุ :  </Box>
                                        {props.age}
                                    </Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography variant="subtitle1"  >
                                        <Box fontWeight='bold' display='inline'>
                                            กรุ๊ปเลือด :
                                        </Box>
                                        {props.patient.bloodType}
                                    </Typography>
                                </Grid>
                                <Grid item md={12}>
                                    <Typography variant="subtitle1"  >
                                        <Box fontWeight='bold' display='inline'>
                                            วัน เดือน ปีเกิด :
                                        </Box>
                                        {props.patient.dateOfBirth}
                                    </Typography>
                                </Grid>
                                <Grid item md={12}>
                                    <Typography variant="subtitle1"  >
                                        <Box fontWeight='bold' display='inline'>
                                            เลขประจำตัวประชาชน :
                                        </Box>
                                        {props.patient.idCard}
                                    </Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography variant="subtitle1"  >
                                        <Box fontWeight='bold' display='inline'>
                                            ส่วนสูง :
                                        </Box>
                                        {props.patient.height}  ซม.
                                    </Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography variant="subtitle1"  >
                                        <Box fontWeight='bold' display='inline'>
                                            น้ำหนัก :
                                        </Box>
                                        {props.patient.weight}  กก.
                                    </Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography variant="subtitle1"  >
                                        <Box fontWeight='bold' display='inline'>
                                            ผู้ปกครอง :
                                        </Box>
                                        {props.patient.parentName}
                                    </Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography variant="subtitle1"  >
                                        <Box fontWeight='bold' display='inline'>
                                            เบอร์ :
                                        </Box>
                                        {props.patient.phoneNumber}
                                    </Typography>
                                </Grid>
                                <Grid item md={12}>
                                    <Typography variant="subtitle1"  >
                                        <Box fontWeight='bold' display='inline'>
                                            ที่อยู่ปัจจุบัน :
                                        </Box>
                                        {props.patient.address}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item container md={4.5}>
                                <Grid item md={12}></Grid>

                                <Grid item md={12}>
                                    <Typography variant="subtitle1"  >
                                        <Box fontWeight='bold' display='inline'>
                                            ประวัติการแพ้ยา :
                                        </Box>
                                        {props.patient.allergies}
                                    </Typography>
                                    <Typography variant="subtitle1"  >
                                        <Box fontWeight='bold' display='inline'>
                                            แพทย์ที่ดูแล :
                                        </Box>
                                        {props.patient.doctor.name} {props.patient.doctor.surname}
                                    </Typography>
                                    <Typography variant="subtitle1"  >
                                        <Box fontWeight='bold' display='inline'>
                                            อาการที่มาพบแพทย์ :
                                        </Box> {props.patient.symptom}
                                    </Typography>
                                </Grid>
                                <Grid item md={12}></Grid>
                                <Grid item md={12}></Grid>

                            </Grid>
                            <Grid item container md={12}>
                                <Grid item md={2}></Grid>

                                <Grid item md={6}>
                                    <Typography variant="subtitle1"  >
                                        <Box fontWeight='bold' display='inline'>
                                            วันที่เข้ารับการรักษา :
                                        </Box>
                                        {props.admitDateTime}
                                    </Typography>

                                </Grid>
                                <Grid item md={4}></Grid>
                                <Grid item md={2}>
                                    <Typography variant="subtitle1" sx={{ backgroundColor: '#80A9E5' }} align='center'>
                                        ห้อง {props.room.id}  เตียง {props.bed.id}
                                    </Typography>

                                </Grid>
                            </Grid>
                        </Grid>

                    </Paper>
                </Container>
            </Grid>
        </React.Fragment>
    );
}