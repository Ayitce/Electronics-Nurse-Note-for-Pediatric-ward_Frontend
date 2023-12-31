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



export default function AdmitForm(props: AdmitFormProps) {

    const {
        register,
        errors,
        control,
        setValue
    } = props;

    const genders = [
        { value: "ชาย", label: "ชาย" },
        { value: "หญิง", label: "หญิง" }
    ]

    const bloodTypes = [
        { value: "A", label: "A" },
        { value: "B", label: "B" },
        { value: "O", label: "O" },
        { value: "AB", label: "AB" }
    ]


    const [doctor, setDoctor] = useState<any>()
    const [patient, setPatient] = useState<any>()


    useEffect(() => {
        //loadPatientFromApi()
        const fetchData = async () => {
            // get the data from the api
            const doctor = await loadDoctorFromAPI()
            setDoctor(doctor)
            const patient = await loadPatientFromAPI()
            setPatient(patient)
            console.log(doctor)
        }

        fetchData()
            .catch(console.error);
    }, [])

    const loadDoctorFromAPI = async () => {

        const response = await getDoctorList()
        return response.data
    }

    const loadPatientFromAPI = async () => {

        const response = await getAllPatient()
        return response.data
    }

    const [createObjectURL, setCreateObjectURL] = useState<string>();

    const uploadToClient = async (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Access uploadToClient")
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];


            setValue("patient.imageFile", i)
            console.log("file : ", i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                ข้อมูลส่วนตัวผู้ป่วย
            </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={patient}
                            onChange={(e, value) => {
                                console.log(value);
                                setValue("patient", value, { shouldValidate: true });
                            }}
                            getOptionLabel={(option) => option.name + " " +option.surname + " " + option.hn}
                            isOptionEqualToValue={(option, value) => option === value}
                            sx={{ width: 300 }}
                            renderInput={(params) =>
                                <TextField {...params} label="ค้นหาด้วยชื่อ นามสกุล หรือ HN"
                                />
                            }

                        />
                       
                    </Grid>
                </Grid>
                

                <><Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="ชื่อ"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            {...register("patient.name", { required: "Please input name" })}
                            error={!!errors.patient?.name}
                            helperText={errors.patient?.name?.message} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="นามสกุล"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            {...register("patient.surname", { required: "Please input surname" })}
                            error={!!errors.patient?.surname}
                            helperText={errors.patient?.surname?.message} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="เลขบัตรประจำตัวประชาชน"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            {...register("patient.idCard", {
                                required: "Please input IDcard",
                                validate: {
                                    maxLength: (v) =>
                                        v.length <= 13 || "เลขประจำตัวประชาชนต้องมี 13 หลัก",
                                    minLength: (v) =>
                                        v.length >= 13 || "เลขประจำตัวประชาชนต้องมี 13 หลัก",
                                    },
                            })}
                            error={!!errors.patient?.idCard}
                            helperText={errors.patient?.idCard?.message} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="ส่วนสูง"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            {...register("patient.height", { required: "Please input height" })}
                            error={!!errors.patient?.height}
                            helperText={errors.patient?.height?.message} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="น้ำหนัก"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            {...register("patient.weight", { required: "Please input weight" })}
                            error={!!errors.patient?.weight}
                            helperText={errors.patient?.weight?.message} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            id="outlined-select-currency"
                            fullWidth
                            select
                            label="เพศ"
                            variant="standard"
                            {...register("patient.gender", { required: "Please select gender" })}
                            error={!!errors.patient?.gender}
                            helperText={errors.patient?.gender?.message}
                        >
                            {genders.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <TextField
                            id="outlined-select-currency"
                            fullWidth
                            select
                            label="หมู่เลือด"
                            variant="standard"
                            {...register("patient.bloodType", { required: "Please select bloodType" })}
                            error={!!errors.patient?.bloodType}
                            helperText={errors.patient?.bloodType?.message}
                        >
                            {bloodTypes.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <DatePicker
                            label="วัน/เดือน/ปี เกิด"
                            disableFuture
                            defaultValue={dayjs()}
                            sx={{ width: '100%' }}
                            onChange={d => {
                                setValue("patient.dateOfBirth", d?.format("YYYY-MM-DD"));
                                //alert(d?.format("YYYY-MM-DD"))
                            }} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="ที่อยู่ปัจจุบัน"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            {...register("patient.address", { required: "Please input address" })}
                            error={!!errors.patient?.address}
                            helperText={errors.patient?.address?.message} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="ผู้ปกครอง"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            {...register("patient.parentName", { required: "Please input parent name" })}
                            error={!!errors.patient?.parentName}
                            helperText={errors.patient?.parentName?.message} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="เบอร์ติดต่อ"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            {...register("patient.phoneNumber", { required: "Please input telephone number" })}
                            error={!!errors.patient?.phoneNumber}
                            helperText={errors.patient?.phoneNumber?.message} />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <img src={createObjectURL} width={200} height={200} />
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Upload File
                            <input
                                type="file"
                                name="myImage"
                                onChange={event => {
                                    uploadToClient(event);
                                }}
                                hidden />
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="รหัสผู้ป่วย HN"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            {...register("patient.hn", { required: "Please input HN" })}
                            error={!!errors.patient?.hn}
                            helperText={errors.patient?.hn?.message} />
                    </Grid>
                </Grid></>
        </React.Fragment>
    );
}