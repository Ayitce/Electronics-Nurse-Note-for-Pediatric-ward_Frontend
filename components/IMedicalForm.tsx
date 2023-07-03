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
import { FormLabel, Radio, RadioGroup, Select } from '@mui/material';
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
}



export default function AdmitForm(props: AdmitFormProps) {

    const {
        register,
        errors,
        control,
        setValue
    } = props;

    const [doctor, setDoctor] = useState<any>()


    useEffect(() => {
        //loadPatientFromApi()
        const fetchData = async () => {
            // get the data from the api
            const doctor = await loadDoctorFromAPI()
            setDoctor(doctor)
            console.log(doctor)
        }

        fetchData()
            .catch(console.error);
    }, [])

    const loadDoctorFromAPI = async () => {

        const response = await getDoctorList()
        // setPatientInfo(response.data)
        return response.data
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Medical information
            </Typography>
            <Grid container spacing={3}>

                <Grid item xs={12} sm={12}><h1></h1></Grid>

                <Grid item xs={12} sm={3}>
                    <DateTimePicker
                        label="วันและเวลาที่เข้ารับการรักษา"
                        defaultValue={dayjs()}
                        sx={{ width: '100%' }}
                        onChange={d => {
                            setValue("admitDateTime", d?.format("YYYY-MM-DD hh:mm A"));
                            //alert(d?.format("YYYY-MM-DD hh:mm A"))
                        }} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        id="outlined-select-currency"
                        fullWidth
                        select
                        label="หมอเจ้าของไข้"
                        variant="standard"
                        {...register("patient.doctor.id", { required: "Please select doctor" })}
                        error={!!errors.patient?.doctor}
                        helperText={errors.patient?.doctor?.message}
                    >
                        {doctor?.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}  {option.surname}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="อาการที่มาพบแพทย์"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        {...register("patient.symptom", { required: "Please input symptom" })}
                        error={!!errors.patient?.symptom}
                        helperText={errors.patient?.symptom?.message} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="ประวัติการแพ้ยา"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        {...register("patient.allergies", { required: "Please input allergies" })}
                        error={!!errors.patient?.allergies}
                        helperText={errors.patient?.allergies?.message} />
                </Grid>


            </Grid>
        </React.Fragment>
    );
}