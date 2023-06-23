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
import { Select } from '@mui/material';
import { DateField, DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';


interface RegisterFormProps {
    register: UseFormRegister<IRegisterForm>;
    errors: FieldErrors<IRegisterForm>
    control: Control<IRegisterForm>
    setValue: UseFormSetValue<IRegisterForm>
}

export default function SignUpForm(props: RegisterFormProps) {

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

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Basic information
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="ชื่อ"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        {...register("name", { required: "Please input name" })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="นามสกุล"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        {...register("surname", { required: "Please input surname" })}
                        error={!!errors.surname}
                        helperText={errors.surname?.message}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        fullWidth
                        autoComplete="email"
                        variant="standard"
                        {...register("email", { required: "Please input email" })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Password"
                        fullWidth
                        type='password'
                        autoComplete="password"
                        variant="standard"
                        {...register("password", { required: "Please input password" })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField

                        label="Confirm Password"
                        fullWidth
                        type='password'
                        autoComplete="Confirm Password"
                        variant="standard"
                        {...register("confirmPassword", { required: "Please input confirm password" })}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />
                </Grid>
                <Grid item xs={6} sm={6} >
                    <TextField
                        id="outlined-select-currency"
                        fullWidth
                        select
                        label="เพศ"
                        variant="standard"
                        {...register("gender", { required: "Please select gender" })}
                        error={!!errors.gender}
                        helperText={errors.gender?.message}
                    >
                        {genders.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    {/* <FormControl variant="standard" fullWidth >
                        <InputLabel id="demo-simple-select-standard-label">เพศ</InputLabel>
                        <Controller
                            control={control}
                            name="gender"
                            render={({ field: { onChange, onBlur, value, ref }, formState, fieldState }) => (
                                <>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={value}
                                        onChange={onChange}
                                        label="เพศ"
                                        name='gender'
                                        inputProps={{
                                            inputRef: (ref: { value: any; }) => {
                                                if (!ref) return;
                                                register("gender", { required: "Please select gender" })
                                            },
                                        }}
                                        error={!!errors.gender}
                                    >
                                        <MenuItem value="male">ชาย</MenuItem>
                                        <MenuItem value="female">หญิง</MenuItem>
                                    </Select>
                                </>
                            )}
                        />

                    </FormControl> */}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <DatePicker
                        label="วัน/เดือน/ปี เกิด"
                        defaultValue={dayjs()}
                        sx={{ width: '100%' }}
                        onChange={d => {
                            setValue("dateOfBirth", d?.format("YYYY-MM-DD"))
                            //alert(d?.format("YYYY-MM-DD"))
                        }
                        } />

                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="หมายเลขประจำตัวพยาบาล/หมอ"
                        fullWidth
                        variant="standard"
                        {...register("medicalID", { required: "Please input medicalID" })}
                        error={!!errors.medicalID}
                        helperText={errors.medicalID?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="เบอร์โทรศัพท์"
                        fullWidth
                        variant="standard"
                        {...register("phoneNumber", { required: "Please input telephone number" })}
                        error={!!errors.medicalID}
                        helperText={errors.medicalID?.message}
                    />
                </Grid>

            </Grid>
        </React.Fragment>
    );
}