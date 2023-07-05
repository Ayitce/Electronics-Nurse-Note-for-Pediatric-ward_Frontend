import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Card, CardContent, ToggleButton } from '@mui/material';
import { useState } from 'react';
import nursePNG from '../public/assets/nurse.png'
import doctorPNG from '../public/assets/doctor.png'
import Image from 'next/image'
import { useControlContext } from './ControlContext';


interface RegisterFormProps {
    selectedNurse: boolean;
    setSelectedNurse: React.Dispatch<React.SetStateAction<boolean>>;
    selectedDoctor: boolean;
    setSelectedDoctor: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserType(props: RegisterFormProps) {

    const { userType, setUserType } = useControlContext()

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Type
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Card onClick={() => { }} >
                        <ToggleButton
                            value="check"
                            fullWidth
                            selected={props.selectedNurse}
                            onChange={() => {
                                props.setSelectedNurse(!props.selectedNurse)
                                if (props.selectedDoctor == true) {
                                    props.setSelectedDoctor(false)
                                }
                                if (!props.selectedNurse) {
                                    setUserType("nurse")
                                } else if (props.selectedNurse) {
                                    setUserType("")
                                }
                            }}
                        ><CardContent>

                                <Image src={nursePNG}
                                    width={150}
                                    height={150}
                                    sizes="100vw"
                                    alt="NurseIcon" />
                                <Typography variant="h6" gutterBottom align='center'>
                                    Nurse
                                </Typography>

                            </CardContent>
                        </ToggleButton>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card onClick={() => { }} >
                        <ToggleButton
                            value="check"
                            fullWidth
                            selected={props.selectedDoctor}
                            onChange={() => {
                                setUserType("")
                                props.setSelectedDoctor(!props.selectedDoctor)
                                if (props.selectedNurse == true) {
                                    props.setSelectedNurse(false)
                                }
                                if (!props.selectedDoctor) {
                                    setUserType("doctor")
                                } else if (props.selectedDoctor) {
                                    setUserType("")
                                }
                            }}
                        ><CardContent>

                                <Image src={doctorPNG}
                                    width={150}
                                    height={150}
                                    sizes="100vw"
                                    alt="DoctorIcon" />
                                <Typography variant="h6" gutterBottom align='center'>
                                    Doctor
                                </Typography>

                            </CardContent>
                        </ToggleButton>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}