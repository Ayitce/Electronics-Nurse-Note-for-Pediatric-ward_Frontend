import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Control, Controller, FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { IRegisterForm } from './RegisterComp';
import { AppBar, CardContent, Container, Paper, Toolbar } from '@mui/material';
import nursePNG from '../public/assets/nurse.png'
import Image from 'next/image'

export interface IPatientCard {
    name: string;
    surname: string;
    gender: any;
    IDcard: string;
    height: string;
    weight: string;
    bloodType: any;
    dateOfBirth: any;
    AN: string;
    age: string;
    admitDateTime: any;
    symptom: string;
    allergies: string;
    doctor: any;
    address: string;
    parentName: string;
    phoneNumber: string;
    image: any;
}
export default function PatientCard() {

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Container component="main" maxWidth="md" sx={{ mb: 4 }}>

                    <Paper sx={{ my: { xs: 3, md: 6 } }}>
                        <AppBar position="static">
                            <Toolbar variant='dense'>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    ประวัติส่วนตัวผู้ป่วย
                                </Typography>
                                <Typography align="right" variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
                                    รหัสประจำตัวผู้ป่วย AN xxx
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Grid container spacing={3} sx={{ p: { xs: 3, md: 2 }, pt: { xs: 3, md: 3 } }}>
                            <Grid item container md={2}>
                                <Grid item md={3}>
                                    <CardContent >

                                        <Image src={nursePNG}
                                            width={100}
                                            height={100}
                                            sizes="100vw"
                                            alt="NurseIcon" />

                                    </CardContent>

                                </Grid>
                            </Grid>
                            <Grid item container md={5}>
                                <Grid item md={12}>
                                    <Typography variant="h5"  >
                                        ชื่อ
                                    </Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography variant="subtitle1"  >
                                        อายุ xx ปี xx เดือน
                                    </Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography variant="subtitle1"  >
                                        กรุ๊ปเลือด X
                                    </Typography>
                                </Grid>
                                <Grid item md={12}>
                                    <Typography variant="subtitle1"  >
                                        วัน เดือน ปีเกิด xxxxxxx
                                    </Typography>
                                </Grid>
                                <Grid item md={12}>
                                    <Typography variant="subtitle1"  >
                                        เลขประจำตัวประชาชน xxxxxxxxxx
                                    </Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography variant="subtitle1"  >
                                        ส่วนสูง xxx เซนติเมตร
                                    </Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography variant="subtitle1"  >
                                        น้ำหนัก xxx กิโลกรัม
                                    </Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography variant="subtitle1"  >
                                        ผู้ปกครอง xxxxxxxxxx
                                    </Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography variant="subtitle1"  >
                                        เบอร์ xxxxxxxxxx
                                    </Typography>
                                </Grid>
                                <Grid item md={12}>
                                    <Typography variant="subtitle1"  >
                                        ที่อยู่ปัจจุบัน xxxxxxxxxxxxxx
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item container md={5}>
                                <Grid item md={12}></Grid>

                                <Grid item md={12}>
                                    <Typography variant="subtitle1"  >
                                        ประวัติการแพ้ยา xxxxxxxxxxxxxx
                                    </Typography>
                                    <Typography variant="subtitle1"  >
                                        แพทย์ที่ดูแล xxxxxxxxxxxxxx
                                    </Typography>
                                    <Typography variant="subtitle1"  >
                                        อาการที่มาพบแพทย์ xxxxxxxxxxxxxx
                                    </Typography>
                                </Grid>
                                <Grid item md={12}></Grid>
                                <Grid item md={12}></Grid>

                            </Grid>
                            <Grid item container md={12}>
                                <Grid item md={2}></Grid>

                                <Grid item md={6}>
                                    <Typography variant="subtitle1"  >
                                        วันที่เข้ารับการรักษา xxxxxxxxxxxxxxxx
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