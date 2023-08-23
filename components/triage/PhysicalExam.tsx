import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
//import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Control, Controller, FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { Box, Button, FormGroup, Select, ToggleButton, ToggleButtonGroup, styled } from '@mui/material';
import { DateField, DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import { ITriage } from '@/pages/patient/[an]/triage';


interface RegisterFormProps {
    register: UseFormRegister<ITriage>;
    errors: FieldErrors<ITriage>
    control: Control<ITriage>
    setValue: UseFormSetValue<ITriage>

}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
        margin: theme.spacing(0.5),
        borderRadius: 50,
        border: "1px solid lightgrey !important",
        '&.Mui-disabled': {
            border: 50,
        },
        '&:not(:first-of-type)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-of-type': {
            borderRadius: theme.shape.borderRadius,
        },
        "&.Mui-selected, &.Mui-selected:hover": {
            color: "black",
            backgroundColor: '#FDD7F0'
        }
    },

}));


export default function PhysicalExam(props: RegisterFormProps) {

    const {
        register,
        errors,
        control,
        setValue
    } = props;
    const [pulse, setPulse] = React.useState('N');
    const [formats, setFormats] = React.useState(() => ['italic']);

    const handleFormat = (event, newFormats) => {
        setFormats(newFormats);
    };

    const handlePulse = (event, newPulse) => {
        if (newPulse !== null)
            setPulse(newPulse);
        if (newPulse.includes("W"))
            setValue("physicalExam.weak_pulse", true)
        else
            setValue("physicalExam.weak_pulse", false)

        if (newPulse.includes("B"))
            setValue("physicalExam.bounding_pulse", true)
        else
            setValue("physicalExam.bounding_pulse", false)

    };

    const [capillary, setCapilary] = React.useState('N');
    const handleCapillary = (event, newCapillary) => {
        if (newCapillary !== null)
            setCapilary(newCapillary);
        if (newCapillary.includes("W"))
            setValue("physicalExam.cap_refill", true)
        else
            setValue("physicalExam.cap_refill", false)

        if (newCapillary.includes("<1"))
            setValue("physicalExam.flash_cap", true)
        else
            setValue("physicalExam.flash_cap", false)

    };

    const [airEntry, setAirEntry] = React.useState('N');
    const handleAirEntry = (event, newAirEntry) => {
        if (newAirEntry !== null)
            setAirEntry(newAirEntry);
        if (newAirEntry.includes("DLL"))
            setValue("physicalExam.airEntry", 1)
        if (newAirEntry.includes("DAA"))
            setValue("physicalExam.airEntry", 2)
        if (newAirEntry.includes("AP"))
            setValue("physicalExam.airEntry", 3)
    };


    const [wheezing, setWheezing] = React.useState('N');
    const handlesetWheezing = (event, newsetWheezing) => {
        if (newsetWheezing !== null)
            setWheezing(newsetWheezing);
        if (newsetWheezing.includes("FE"))
            setValue("physicalExam.wheezing", 1)
        if (newsetWheezing.includes("OE"))
            setValue("physicalExam.wheezing", 2)
        if (newsetWheezing.includes("IE"))
            setValue("physicalExam.wheezing", 3)
        if (newsetWheezing.includes("AP"))
            setValue("physicalExam.wheezing", 4)
    };

    return (
        <React.Fragment>

            <Grid container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center" >
                <Typography variant="h6" gutterBottom>
                    การตรวจร่างกาย
                </Typography>
                <Grid container spacing={3} maxWidth={700}>
                    <Grid item sm={6}>
                        <Typography variant="h6" gutterBottom>
                            Pulse
                        </Typography>
                        {/* <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: 28 }}>2</Button> */}
                        <StyledToggleButtonGroup
                            size="medium"
                            value={pulse}
                            exclusive
                            onChange={handlePulse}
                        >
                            <ToggleButton value="N" aria-label="N" sx={{ width: 50 }}>
                                N
                            </ToggleButton>
                            <ToggleButton value="W" aria-label="W" sx={{ width: 50 }}>
                                W
                            </ToggleButton>
                            <ToggleButton value="B" aria-label="B" sx={{ width: 50 }}>
                                B
                            </ToggleButton>
                        </StyledToggleButtonGroup>
                    </Grid>
                    <Grid item sm={6}>
                        <Typography variant="h6" gutterBottom>
                            Capillary
                        </Typography>
                        {/* <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: 28 }}>2</Button> */}
                        <StyledToggleButtonGroup
                            size="medium"
                            value={capillary}
                            exclusive
                            onChange={handleCapillary}
                        >
                            <ToggleButton value="N" aria-label="N" sx={{ width: 50 }}>
                                N
                            </ToggleButton>
                            <ToggleButton value="W" aria-label="W" sx={{ width: 50 }}>
                                W
                            </ToggleButton>
                            <ToggleButton value="<1" aria-label="<1" sx={{ width: 50 }}>
                                {'<'}1
                            </ToggleButton>
                        </StyledToggleButtonGroup>
                    </Grid>
                    <Grid item sm={6}>
                        <Typography variant="h6" gutterBottom>
                            Air Entry
                        </Typography>
                        {/* <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: 28 }}>2</Button> */}
                        <StyledToggleButtonGroup
                            size="medium"
                            value={airEntry}
                            exclusive
                            onChange={handleAirEntry}
                        >
                            <ToggleButton value="N" aria-label="N" sx={{ width: 50 }}>
                                N
                            </ToggleButton>
                            <ToggleButton value="DLL" aria-label="DLL" sx={{ width: 50 }}>
                                DLL
                            </ToggleButton>
                            <ToggleButton value="DAA" aria-label="DAA" sx={{ width: 50 }}>
                                DAA
                            </ToggleButton>
                            <ToggleButton value="AP" aria-label="AP" sx={{ width: 50 }}>
                                AP
                            </ToggleButton>
                        </StyledToggleButtonGroup>
                    </Grid>
                    <Grid item sm={6}>
                        <Typography variant="h6" gutterBottom>
                            Wheezing
                        </Typography>
                        {/* <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: 28 }}>2</Button> */}
                        <StyledToggleButtonGroup
                            size="medium"
                            value={wheezing}
                            exclusive
                            onChange={handlesetWheezing}
                        >
                            <ToggleButton value="N" aria-label="N" sx={{ width: 50 }}>
                                N
                            </ToggleButton>
                            <ToggleButton value="FE" aria-label="FE" sx={{ width: 50 }}>
                                FE
                            </ToggleButton>
                            <ToggleButton value="OE" aria-label="OE" sx={{ width: 50 }}>
                                OE
                            </ToggleButton>
                            <ToggleButton value="IE" aria-label="IE" sx={{ width: 50 }}>
                                IE
                            </ToggleButton>
                            <ToggleButton value="AP" aria-label="AP" sx={{ width: 50 }}>
                                AP
                            </ToggleButton>
                        </StyledToggleButtonGroup>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}