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
import { Box, FormGroup, FormHelperText, FormLabel, Select } from '@mui/material';
import { DateField, DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import { ITriage } from '../TriageBox';


interface RegisterFormProps {
    register: UseFormRegister<ITriage>;
    errors: FieldErrors<ITriage>
    control: Control<ITriage>
    setValue: UseFormSetValue<ITriage>
}

export default function IndicatorGroup(props: RegisterFormProps) {

    const {
        register,
        errors,
        control,
        setValue
    } = props;
    const [state, setState] = React.useState({
        all: false,
        respiratory: false,
        sepsis: false,
        shock: false,
        seizure: false,
    });

    const handleChange = (event: { target: { name: string; checked: boolean; }; }) => {
        if ([event.target.name].includes("all")) {
            setState({
                ...state,
                all: event.target.checked,
                respiratory: event.target.checked,
                sepsis: event.target.checked,
                shock: event.target.checked,
                seizure: event.target.checked,
            });
            setValue("indicator.respiratory", event.target.checked)
            setValue("indicator.sepsis", event.target.checked)
            setValue("indicator.shock", event.target.checked)
            setValue("indicator.seizure", event.target.checked)
        }
        else {
            setState({
                ...state,
                [event.target.name]: event.target.checked,
            });

            if ([event.target.name].includes("respiratory"))
                setValue("indicator.respiratory", event.target.checked)
            if ([event.target.name].includes("sepsis"))
                setValue("indicator.sepsis", event.target.checked)
            if ([event.target.name].includes("shock"))
                setValue("indicator.shock", event.target.checked)
            if ([event.target.name].includes("seizure"))
                setValue("indicator.seizure", event.target.checked)

        }

    };

    const { all, respiratory, sepsis, shock, seizure } = state;
    return (
        <React.Fragment>
            <Grid container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center" >
                <Typography variant="h6" gutterBottom>
                    อาการของผู้ป่วยที่น่าเป็นห่วง
                </Typography>
                <Grid container spacing={3} maxWidth={600}>
                    <Box sx={{ display: 'flex' }}>
                        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                            <FormLabel component="legend">แพทย์แจ้งให้ติดตามอาการดังกล่าว</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={all} onChange={handleChange} name="all" />
                                    }
                                    label="All"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={respiratory} onChange={handleChange} name="respiratory" />
                                    }
                                    label="Respiratory Indicator"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={sepsis} onChange={handleChange} name="sepsis" />
                                    }
                                    label="Sepsis Indicator"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={shock} onChange={handleChange} name="shock" />
                                    }
                                    label="Shock Indicator"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={seizure} onChange={handleChange} name="seizure" />
                                    }
                                    label="Seizure Indicator"
                                />
                            </FormGroup>
                        </FormControl>

                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}