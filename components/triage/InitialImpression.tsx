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

export default function InitialIndicator(props: RegisterFormProps) {

    const {
        register,
        errors,
        control,
        setValue
    } = props;
    const [state, setState] = React.useState({
        irritable: false,
        stupor_drowsiness: false,
        dehydration: false,
        nasal_flaring: false,
        subcostal_retraction: false,
        suprasternal_retraction: false,
        scalene_muscle_contraction: false,
        grunting: false,
        pale_cyanosis: false,
        mottling_skin: false,
        petechiae: false,
    });

    const handleChange = (event: { target: { name: string; checked: boolean; }; }) => {

        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });

        if ([event.target.name].includes("irritable"))
            setValue("initialImpression.irritable", event.target.checked)
        if ([event.target.name].includes("stupor_drowsiness"))
            setValue("initialImpression.stupor_drownsiness", event.target.checked)
        if ([event.target.name].includes("dehydration"))
            setValue("initialImpression.dehedration", event.target.checked)
        if ([event.target.name].includes("nasal_flaring"))
            setValue("initialImpression.nasal_flaring", event.target.checked)
        if ([event.target.name].includes("subcostal_retraction"))
            setValue("initialImpression.subcostral_retraction", event.target.checked)
        if ([event.target.name].includes("suprasternal_retraction"))
            setValue("initialImpression.supersternal_retraction", event.target.checked)
        if ([event.target.name].includes("grunting"))
            setValue("initialImpression.grunting", event.target.checked)
        if ([event.target.name].includes("pale_cyanosis"))
            setValue("initialImpression.pale_cyanosis", event.target.checked)
        if ([event.target.name].includes("mottling_skin"))
            setValue("initialImpression.motting_skin", event.target.checked)
        if ([event.target.name].includes("petechiae"))
            setValue("initialImpression.petichea", event.target.checked)

    };

    const { irritable,
        stupor_drowsiness,
        dehydration,
        nasal_flaring,
        subcostal_retraction,
        suprasternal_retraction,
        scalene_muscle_contraction,
        grunting,
        pale_cyanosis,
        mottling_skin,
        petechiae } = state;
    return (
        <React.Fragment>
            <Grid container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center" >
                <Typography variant="h6" gutterBottom>
                    Initial Impression
                </Typography>
                <Grid container
                    spacing={3}
                    alignItems="center"
                    justifyContent="center"
                    maxWidth={800}>
                    <Box sx={{ display: 'flex' }}>
                        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={irritable} onChange={handleChange} name="irritable" />
                                    }
                                    label="Irritable"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={stupor_drowsiness} onChange={handleChange} name="stupor_drowsiness" />
                                    }
                                    label="Stupor / Drowsiness"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={dehydration} onChange={handleChange} name="dehydration" />
                                    }
                                    label="Dehydration"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={nasal_flaring} onChange={handleChange} name="nasal_flaring" />
                                    }
                                    label="Nasal Flaring"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={subcostal_retraction} onChange={handleChange} name="subcostal_retraction" />
                                    }
                                    label="Subcostal Retraction"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={suprasternal_retraction} onChange={handleChange} name="suprasternal_retraction" />
                                    }
                                    label="Suprasternal Retraction"
                                />
                            </FormGroup>

                        </FormControl>
                        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={scalene_muscle_contraction} onChange={handleChange} name="scalene_muscle_contraction" />
                                    }
                                    label="Scalene muscle contraction"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={grunting} onChange={handleChange} name="grunting" />
                                    }
                                    label="Grunting"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={pale_cyanosis} onChange={handleChange} name="pale_cyanosis" />
                                    }
                                    label="Pale / Cyanosis"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={mottling_skin} onChange={handleChange} name="mottling_skin" />
                                    }
                                    label="Mottling skin"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={petechiae} onChange={handleChange} name="petechiae" />
                                    }
                                    label="Petechiae"
                                />
                            </FormGroup>

                        </FormControl>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}