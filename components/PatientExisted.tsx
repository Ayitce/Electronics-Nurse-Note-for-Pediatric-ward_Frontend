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
import { IRegisterForm } from './RegisterComp';
import { Autocomplete, FormLabel, Radio, RadioGroup, Select } from '@mui/material';
import { DateField, DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import { IPatientCard } from '@/pages/patient/admit';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { getDoctorList } from '@/services/doctorService';
import { uploadBytes } from 'firebase/storage';
import { getAllPatient } from '@/services/patientService';

interface AdmitFormProps {
    register: UseFormRegister<IPatientCard>;
    errors: FieldErrors<IPatientCard>
    control: Control<IPatientCard>
    setValue: UseFormSetValue<IPatientCard>
    existed: boolean;
    setExisted: React.Dispatch<React.SetStateAction<boolean>>;
}



export default function PatientExisted(props: AdmitFormProps) {

    const {
        register,
        errors,
        control,
        setValue
    } = props;

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                คนไข้เคยแอดมิทที่โรงพยาบาลมาก่อนหรือไม่
            </Typography>
            <FormControl>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                    <FormControlLabel value="existed" control={<Radio onChange={() => {
                        props.setExisted(true)
                        setValue("isExisted", true);
                    }} checked={!!props.existed == true} />} label="เคย" />
                    <FormControlLabel value="notexisted" control={<Radio onChange={() => {
                        props.setExisted(false)
                        setValue("patient.id", undefined);
                        setValue("isExisted", false);
                    }} checked={!!props.existed == false} />} label="ไม่เคย" />
                </RadioGroup>
            </FormControl>

        </React.Fragment>
    );
}