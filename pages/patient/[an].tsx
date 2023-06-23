import { useAuth } from '@/_auth';
import Navbar from '@/components/Navbar';
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, InputAdornment, ListItemIcon, ListItemText, Menu, MenuItem, Paper, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import PatientCard from '@/components/PatientCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import React, { useEffect, useState } from 'react';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import axios from 'axios';
import { useRouter } from 'next/router';
import { setup } from '@/lib/csrf';

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
export default function PatientInfo({ response }) {
    const { isLoggedIn } = useAuth()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const [openDischarge, setOpenDischarge] = React.useState(false);

    const handleClickOpenDischarge = () => {
        setOpenDischarge(true);
    };

    const handleCloseDischarge = () => {
        setOpenDischarge(false);
    };

    const [patientInfo, setPatientInfo] = useState<any>()

    const router = useRouter();

    useEffect(() => {
        loadPatientFromApiWithAN()
    }, [router])

    const loadPatientFromApiWithAN = async () => {
        //console.log(patient)
        // const response = await axios.get<IPatientCard>(`${window.origin}/api/patient/${router.query.AN}`)
        setPatientInfo(response)
    }

    return (
        <>
            <Navbar item={
                <Button href="/" color="inherit"></Button>
            } isLoggedIn={isLoggedIn} />

            <Grid container sx={{ my: { xs: 3, md: 0 }, p: { xs: 2, md: 6 } }}>
                <Grid item md={1}>
                    <Button
                        variant='contained'
                        onClick={() => router.push("/patient/list")}
                    >
                        <ArrowBackIcon />
                    </Button>
                </Grid>
                <Grid item md={10}>
                </Grid>
                <Grid item md={1}>
                    <Button
                        id="basic-button"
                        aria-controls={openMenu ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openMenu ? 'true' : undefined}
                        onClick={handleClickMenu}
                    >
                        <DensityMediumIcon />
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleCloseMenu}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClickOpenDischarge}>
                            <ListItemIcon>
                                <PersonOffIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Discharge ผู้ป่วยออกจากโรงพยาบาล</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <HistoryEduIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Triage history ประวัติการประเมินผู้ป่วย</ListItemText>
                        </MenuItem>
                    </Menu>
                    <Dialog
                        open={openDischarge}
                        onClose={handleCloseDischarge}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            <Typography variant="h6" align='center' >
                                {"ผู้ป่วยได้รับอนุญาตให้ออกจากโรงพยาบาล"}
                            </Typography>

                        </DialogTitle>
                        <DialogContent >
                            <Paper sx={{ p: { xs: 3, md: 3 } }}>
                                <Grid container alignItems="center" justifyContent="center">
                                    <Grid item sm={12} alignItems="center">
                                        <Typography variant="h6" align='center' >
                                            ชื่อ นามสกุล {patientInfo.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={12} alignItems="center">
                                        <Typography variant="h6" align='center' >
                                            รหัสประจำตัวผู้ป่วย AN xxxx
                                        </Typography>
                                    </Grid>
                                </Grid>
                                {/* <Grid container alignItems="center" justifyContent="center">
                                    <Grid item sm={12} alignSelf="center">
                                        <DialogContentText id="alert-dialog-description" >
                                            ชื่อ นามสกุล
                                        </DialogContentText>
                                    </Grid>
                                    <Grid item>
                                    </Grid>
                                    <Grid item>
                                        <DialogContentText id="alert-dialog-description" >
                                            รหัสประจำตัวผู้ป่วย AN xxxx
                                        </DialogContentText>
                                    </Grid>
                                    <Grid item>
                                        <DialogContentText id="alert-dialog-description" >
                                            คุณยืนยันที่จะให้ผู้ป่วยออกจากโรงพยาบาลใช่หรือไม่
                                        </DialogContentText>
                                    </Grid>
                                    <Grid item>
                                        <DialogContentText id="alert-dialog-description" >
                                            *เมื่อยืนยันจะไม่สามารถย้ายคนไข้ที่ออกจากโรงพยาบาลกลับสู่คนไข้ปัจจุบันได้!
                                        </DialogContentText>
                                    </Grid>
                                </Grid> */}
                            </Paper>
                            <Grid container alignItems="center" justifyContent="center" sx={{ mt: { xs: 3, md: 3 } }}>
                                <Grid item sm={12} alignItems="center">
                                    <Typography variant="subtitle1" align='center' >
                                        คุณยืนยันที่จะให้ผู้ป่วยออกจากโรงพยาบาลใช่หรือไม่
                                    </Typography>
                                </Grid>
                                <Grid item sm={12} alignItems="center">
                                    <Typography variant="subtitle1" align='center' >
                                        *เมื่อยืนยันจะไม่สามารถย้ายคนไข้ที่ออกจากโรงพยาบาลกลับสู่คนไข้ปัจจุบันได้!
                                    </Typography>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDischarge}>ยกเลิก</Button>
                            <Button variant='contained' onClick={handleCloseDischarge} autoFocus>
                                ยืนยัน
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
                <PatientCard />
            </Grid>
        </>
    );
}



export const getServerSideProps = setup(async (req, res) => {
    const an = //เอามายังไง TT_TT

    const response = await axios.get<IPatientCard>(`${window.origin}/api/patient/${an}`)

    return {
        props: { response }
    }
})
