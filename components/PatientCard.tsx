import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Control, Controller, FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { IRegisterForm } from './RegisterComp';
import { AppBar, CardContent, CircularProgress, Container, Paper, Toolbar } from '@mui/material';
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
                        <div>
                            <Toolbar variant='dense'>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    ประวัติส่วนตัวผู้ป่วย หมายเลขแอดมิท  {props.an}
                                </Typography>
                                <Typography align="right" variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
                                    รหัสประจำตัวผู้ป่วย  {props.patient.hn}
                                </Typography>
                            </Toolbar>
                        </div>
                        <Grid container spacing={3} sx={{ p: { xs: 3, md: 2 }, pt: { xs: 3, md: 3 } }}>
                            <Grid item container md={2}>
                                <Grid item md={3}>
                                    <CardContent >
                                        {uploadedImages ?
                                            <Image src={uploadedImages}
                                                width={100}
                                                height={100}
                                                sizes="100vw"
                                                alt="NurseIcon" />
                                            :
                                            <CircularProgress />
                                        }


                                    </CardContent>

                                </Grid>
                            </Grid>
                            <Grid item container md={5}>
                                <Grid item md={12}>
                                    <Typography variant="h5"  >
                                        {props.patient.name} {props.patient.surname}
                                    </Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography variant="subtitle1"  >
                                        อายุ {props.age}
                                    </Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography variant="subtitle1"  >
                                        กรุ๊ปเลือด  {props.patient.bloodType}
                                    </Typography>
                                </Grid>
                                <Grid item md={12}>
                                    <Typography variant="subtitle1"  >
                                        วัน เดือน ปีเกิด {props.patient.dateOfBirth}
                                    </Typography>
                                </Grid>
                                <Grid item md={12}>
                                    <Typography variant="subtitle1"  >
                                        เลขประจำตัวประชาชน {props.patient.idCard}
                                    </Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography variant="subtitle1"  >
                                        ส่วนสูง {props.patient.height}  เซนติเมตร
                                    </Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography variant="subtitle1"  >
                                        น้ำหนัก {props.patient.weight}  กิโลกรัม
                                    </Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography variant="subtitle1"  >
                                        ผู้ปกครอง {props.patient.parentName}
                                    </Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography variant="subtitle1"  >
                                        เบอร์ {props.patient.phoneNumber}
                                    </Typography>
                                </Grid>
                                <Grid item md={12}>
                                    <Typography variant="subtitle1"  >
                                        ที่อยู่ปัจจุบัน {props.patient.address}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item container md={5}>
                                <Grid item md={12}></Grid>

                                <Grid item md={12}>
                                    <Typography variant="subtitle1"  >
                                        ประวัติการแพ้ยา {props.patient.allergies}
                                    </Typography>
                                    <Typography variant="subtitle1"  >
                                        แพทย์ที่ดูแล {props.patient.doctor.name} {props.patient.doctor.surname}
                                    </Typography>
                                    <Typography variant="subtitle1"  >
                                        อาการที่มาพบแพทย์ {props.patient.symptom}
                                    </Typography>
                                </Grid>
                                <Grid item md={12}></Grid>
                                <Grid item md={12}></Grid>

                            </Grid>
                            <Grid item container md={12}>
                                <Grid item md={2}></Grid>

                                <Grid item md={6}>
                                    <Typography variant="subtitle1"  >
                                        วันที่เข้ารับการรักษา {props.admitDateTime}
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