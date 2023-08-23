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
import { ITriage } from '@/pages/patient/[an]/triage';

interface RegisterFormProps {
    register: UseFormRegister<ITriage>;
    errors: FieldErrors<ITriage>
    control: Control<ITriage>
    setValue: UseFormSetValue<ITriage>
}


export default function RiskFactor(props: RegisterFormProps) {

    const {
        register,
        errors,
        control,
        setValue
    } = props;
    const [state, setState] = React.useState({
        suspect_infection: false,
        organ_tranplantation: false,
        history_bone_narrow: false,
        primary_immunodeficiency: false,
        post_splenectomy: false,
        malignancy: false,
        bedRidden_cerebralPalsy: false,
        central_venous_catheter: false,
        poor_feeding: false,
        generalize_seizure: false,
        comatose: false,
    });

    const handleChange = (event: { target: { name: string; checked: boolean; }; }) => {

        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });

        if ([event.target.name].includes("suspect_infection"))
            setValue("riskFactor.suspected_infection", event.target.checked)
        if ([event.target.name].includes("organ_tranplantation"))
            setValue("riskFactor.organtranplantation", event.target.checked)
        if ([event.target.name].includes("history_bone_narrow"))
            setValue("riskFactor.history_bone_marrow", event.target.checked)
        if ([event.target.name].includes("primary_immunodeficiency"))
            setValue("riskFactor.primary_immune_defencing", event.target.checked)
        if ([event.target.name].includes("post_splenectomy"))
            setValue("riskFactor.postSplenectomy_asplenia", event.target.checked)
        if ([event.target.name].includes("malignancy"))
            setValue("riskFactor.malignancy", event.target.checked)
        if ([event.target.name].includes("bedRidden_cerebralPalsy"))
            setValue("riskFactor.bedRidden_cerebralPulsy", event.target.checked)
        if ([event.target.name].includes("central_venous_catheter"))
            setValue("riskFactor.center_iv_catheter", event.target.checked)
        if ([event.target.name].includes("poor_feeding"))
            setValue("add.poor_feeding", event.target.checked)
        if ([event.target.name].includes("generalize_seizure"))
            setValue("add.generalize_seizure", event.target.checked)
        if ([event.target.name].includes("comatose"))
            setValue("add.comoatose_stage_seizure", event.target.checked)
    };

    const { suspect_infection,
        organ_tranplantation,
        history_bone_narrow,
        primary_immunodeficiency,
        post_splenectomy,
        malignancy,
        bedRidden_cerebralPalsy,
        central_venous_catheter,
        poor_feeding,
        generalize_seizure,
        comatose } = state;
    return (
        <React.Fragment>
            <Grid container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center" >
                <Typography variant="h6" gutterBottom>
                    Risk Factors
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
                                        <Checkbox checked={suspect_infection} onChange={handleChange} name="suspect_infection" />
                                    }
                                    label="Suspect Infection"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={organ_tranplantation} onChange={handleChange} name="organ_tranplantation" />
                                    }
                                    label="Organ Tranplantation"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={history_bone_narrow} onChange={handleChange} name="history_bone_narrow" />
                                    }
                                    label="History bone narrow transplantation"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={primary_immunodeficiency} onChange={handleChange} name="primary_immunodeficiency" />
                                    }
                                    label="Primary Immunodeficiency / Acquired"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={post_splenectomy} onChange={handleChange} name="post_splenectomy" />
                                    }
                                    label="Post Splenectomy"
                                />

                            </FormGroup>

                        </FormControl>
                        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={malignancy} onChange={handleChange} name="malignancy" />
                                    }
                                    label="Malignancy"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={bedRidden_cerebralPalsy} onChange={handleChange} name="bedRidden_cerebralPalsy" />
                                    }
                                    label="Bed Ridden / Cerebral Palsy"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={central_venous_catheter} onChange={handleChange} name="central_venous_catheter" />
                                    }
                                    label="Central venous catheter"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={poor_feeding} onChange={handleChange} name="poor_feeding" />
                                    }
                                    label="Poor Feeding"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={generalize_seizure} onChange={handleChange} name="generalize_seizure" />
                                    }
                                    label="Generalize seizure"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={comatose} onChange={handleChange} name="comatose" />
                                    }
                                    label="Comatose"
                                />
                            </FormGroup>

                        </FormControl>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}