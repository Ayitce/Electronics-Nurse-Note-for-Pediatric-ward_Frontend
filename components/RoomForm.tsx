import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Card, CardContent, MenuItem, ToggleButton } from '@mui/material';
import { useEffect, useState } from 'react';
import bedPNG from '../public/assets/bed.png'
import roomPNG from '../public/assets/room.png'
import Image from 'next/image'
import { IPatientCard } from '@/pages/patient/admit';
import { Control, FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { getRoom, getRoomList } from '@/services/roomService';

interface RoomFormProps {
    register: UseFormRegister<IPatientCard>;
    errors: FieldErrors<IPatientCard>
    control: Control<IPatientCard>
    setValue: UseFormSetValue<IPatientCard>
}

export default function RoomForm(props: RoomFormProps) {

    const {
        register,
        errors,
        control,
        setValue
    } = props;

    const [room, setRoom] = useState<any>()
    const [selectedRoom, setSelectedRoom] = useState<any>()

    const [bed, setBed] = useState<any>()


    useEffect(() => {
        //loadPatientFromApi()
        const fetchData = async () => {
            // get the data from the api
            const roomList = await loadRoomListFromAPI()
            setRoom(roomList)
            console.log(roomList)
        }

        fetchData()
            // make sure to catch any error
            .catch(console.error);

    }, [])

    const loadRoomListFromAPI = async () => {

        const response = await getRoomList()
        // setPatientInfo(response.data)
        return response.data
    }

    useEffect(() => {
        console.log("affect this")
        const fetchData = async () => {
            // get the data from the api
            const room = await loadRoomFromAPI()
            setBed(room.bedList)
            console.log(room.bedList)
        }

        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, [selectedRoom])

    const loadRoomFromAPI = async () => {
        const response = await getRoom(selectedRoom)
        return response.data
    }
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Room Bed AN
            </Typography>
            <Grid container spacing={3} sx={{ px: 5 }} >
                <Grid item xs={12} sm={6} >
                    <Card onClick={() => { }} >
                        <CardContent
                            sx={{ px: 12.5 }}>
                            <Image src={roomPNG}
                                width={150}
                                height={150}
                                sizes="100vw"
                                alt="RoomIcon"
                            />
                            <Typography variant="h6" gutterBottom align='center'>
                                Room
                            </Typography>
                            <TextField
                                id="outlined-select-currency"
                                fullWidth
                                select
                                label="ห้อง"
                                variant="outlined"
                                {...register("room.id", { required: "Please select room number" })}
                                error={!!errors.room?.id}
                                helperText={errors.room?.id?.message}
                                onChange={(room) => {
                                    setSelectedRoom(room.target.value)
                                    console.log(room.target.value)
                                }}
                            >
                                {room?.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        กุมารเวช {option.id}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card onClick={() => { }}>

                        <CardContent sx={{ px: 12.5 }}>
                            <Image src={bedPNG}
                                width={150}
                                height={150}
                                sizes="100vw"
                                alt="BedIcon" />
                            <Typography variant="h6" gutterBottom align='center'>
                                Bed
                            </Typography>
                            <TextField
                                id="outlined-select-currency"
                                fullWidth
                                select
                                label="ห้อง"
                                variant="outlined"
                                {...register("bed.id", { required: "Please select bed number" })}
                                error={!!errors.bed?.id}
                                helperText={errors.bed?.id?.message}
                            >
                                {bed?.map((option) => (
                                    option.available &&
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.id}
                                    </MenuItem>
                                ))}
                            </TextField>

                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="หมายเลขแอดมิท AN"
                        fullWidth
                        required
                        autoComplete="given-name"
                        variant="outlined"
                        {...register("an", { required: "Please input AN" })}
                        error={!!errors.an}
                        helperText={errors.an?.message}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}