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


export default function UserType() {
    const [selectedNurse, setSelectedNurse] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(false);

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
                            selected={selectedNurse}
                            onChange={() => {
                                setSelectedNurse(!selectedNurse)
                                if (selectedDoctor == true) {
                                    setSelectedDoctor(false)
                                }
                                if (!selectedNurse) {
                                    setUserType("nurse")
                                }else if (selectedNurse) {
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
                            selected={selectedDoctor}
                            onChange={() => {
                                setUserType("")
                                setSelectedDoctor(!selectedDoctor)
                                if (selectedNurse == true) {
                                    setSelectedNurse(false)
                                } 
                                if (!selectedDoctor) {
                                    setUserType("doctor")
                                }else if (selectedDoctor) {
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