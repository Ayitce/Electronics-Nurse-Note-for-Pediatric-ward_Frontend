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
import { Select } from '@mui/material';
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

export default function VitalSignForm(props: RegisterFormProps) {

    const {
        register,
        errors,
        control,
        setValue
    } = props;



    return (
        <React.Fragment>

            <Grid container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center" >
                <Typography variant="h6" gutterBottom>
                    การติดตามสัญญาณชีพในปัจจุบัน
                </Typography>
                <Grid container spacing={3} maxWidth={600}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Body Temp(°C)"
                            fullWidth
                            autoComplete="given-name"
                            variant="outlined"
                            {...register("vitalSign.temperature", { required: "โปรดระบุอุณหภูมิร่างกาย" })}
                            error={!!errors.vitalSign?.temperature}
                            helperText={errors.vitalSign?.temperature?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Heart Rate (/min)"
                            fullWidth
                            autoComplete="family-name"
                            variant="outlined"
                            {...register("vitalSign.heartRate", { required: "โปรดระบุ Heart rate" })}
                            error={!!errors.vitalSign?.heartRate}
                            helperText={errors.vitalSign?.heartRate?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="RR (/min)"
                            fullWidth
                            autoComplete="family-name"
                            variant="outlined"
                            {...register("vitalSign.respiratoryRate", { required: "โปรดระบุ Respiratory rate" })}
                            error={!!errors.vitalSign?.respiratoryRate}
                            helperText={errors.vitalSign?.respiratoryRate?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Systolic BP (mmHg)"
                            fullWidth
                            autoComplete="family-name"
                            variant="outlined"
                            {...register("vitalSign.systolic_blood_pressure", { required: "โปรดระบุ Systolic BP" })}
                            error={!!errors.vitalSign?.systolic_blood_pressure}
                            helperText={errors.vitalSign?.systolic_blood_pressure?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Diastolic BP (mmHg)"
                            fullWidth
                            autoComplete="family-name"
                            variant="outlined"
                            {...register("vitalSign.diastolic_blood_pressure", { required: "โปรดระบุ Diastolic BP" })}
                            error={!!errors.vitalSign?.diastolic_blood_pressure}
                            helperText={errors.vitalSign?.diastolic_blood_pressure?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="SpO2 (%)"
                            fullWidth
                            autoComplete="family-name"
                            variant="outlined"
                            {...register("vitalSign.oxygenSaturation", { required: "โปรดระบุ Oxygen saturation" })}
                            error={!!errors.vitalSign?.oxygenSaturation}
                            helperText={errors.vitalSign?.oxygenSaturation?.message}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}