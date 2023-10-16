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
import { Box, Button, FormGroup, Select, ToggleButton, ToggleButtonGroup, Tooltip, styled } from '@mui/material';
import { DateField, DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import { ITriage } from '@/pages/patient/[an]/triage';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

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


function Item(props: { [x: string]: any; sx: any; display: any; alignItems: any; }) {
    const { sx, display, alignItems, ...other } = props;
    return (
        <Box
            display='flex'
            alignItems='center'
            sx={{
                p: 1,
                m: 1,
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
                color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
                border: '1px solid',
                borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                borderRadius: 2,
                fontSize: '1',
                fontWeight: '700',
                width: 50,
                height: 50,
                display: 'flex', alignItems: 'center', flexDirection: 'column',
                ...sx,
            }}
            {...other}
        />
    );
}
export default function TotalSymptoms(props: RegisterFormProps) {

    const {
        register,
        errors,
        control,
        setValue
    } = props;
    const [o2, setO2] = React.useState('0');

    const handleO2 = (event, newO2) => {
        if (newO2 !== null) {
            setO2(newO2);
            setValue("vitalSign.oxygenTherapy", newO2)
        }

    };

    const [loc, setLOC] = React.useState('A');
    const handleLOC = (event, newLOC) => {
        if (newLOC !== null)
            setLOC(newLOC);
        setValue("physicalExam.consciousness", newLOC)
    };



    const [e, setE] = React.useState(1);

    const handleDecreaseE = () => {
        if (e - 1 > 0) {
            setE(e - 1)
            setValue("add.e", e - 1)
        }

        //  setValue("add.gcs", gcs - 1)
        //  setGCS(gcs - 1)
    }

    const handleIncreaseE = () => {
        if (e + 1 <= 4) {
            setE(e + 1)
            setValue("add.e", e + 1)
        }


        //   setValue("add.gcs", gcs + 1)
        //   setGCS(gcs + 1)

    }

    const [v, setV] = React.useState(1);

    const handleDecreaseV = () => {
        if (v - 1 > 0) {
            setV(v - 1)
            setValue("add.v", v - 1)
        }


        //   setValue("add.gcs", gcs - 1)
        //   setGCS(gcs - 1)

    }

    const handleIncreaseV = () => {
        if (v + 1 <= 5) {
            setV(v + 1)
            setValue("add.v", v + 1)
        }


        //  setValue("add.gcs", gcs + 1)
        //  setGCS(gcs + 1)
    }

    const [m, setM] = React.useState(1);

    const handleDecreaseM = () => {
        if (m - 1 > 0) {
            setM(m - 1)
            setValue("add.m", m - 1)
        }


        //  setValue("add.gcs", gcs - 1)
        // setGCS(gcs - 1)


    }

    const handleIncreaseM = () => {
        if (m + 1 <= 6) {
            setM(m + 1)
            setValue("add.m", m + 1)
        }


        //  setValue("add.gcs", gcs + 1)
        //  setGCS(gcs + 1)

    }

    const [state, setState] = React.useState({
        tube: false,
    });

    const handleChange = (event: { target: { name: string; checked: boolean; }; }) => {

        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
        if ([event.target.name].includes("tube"))
            setValue("tube", event.target.checked)

    };

    const LOCtext = 'Awake: รู้สึกตัวดี\nVerbal: ตอบสนองต่อการกระตุ้นด้วยเสียงเรียก\nPain: ตอบสนองต่อการกระตุ้นด้วยความเจ็บปวด\nUnresponsive: ไม่ตอบสนอง'
    const Etext = 'E= Eyes opening\nE1 ไม่ลืมตาเลย\nE2 ลืมตาเมื่อเจ็บ\nE3 ลืมตาเมื่อเรียก\nE4 ลืมตาได้ปกติ'
    const Mtext = 'M= Motor response\nM1 ไม่ขยับเลย\nM2 แขนเหยียดผิดปกติ\nM3 แขนงอผิดปกติ\nM4 ขยับเมื่อเจ็บ\nM5 เอามือปัดตำแหน่งเจ็บได้\nM6 ทำตามสั่งได้'
    const Vtext = 'V= Verbal response\nV1 ไม่ออกเสียง\nV2 ออกเสียงไม่เป็นภาษา ไม่มีความหมาย\nV3 ออกเสียงเป็นคำ ๆ มีความหมาย\nV4 ออกเสียงเป็นประโยคแต่สับสน\nV5 พูดคุยได้ตามปกติ'
    const { tube } = state;
    return (
        <React.Fragment>

            <Grid container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center" >
                <Typography variant="h6" gutterBottom>
                    Total Symptoms
                </Typography>
                <Grid container spacing={3} maxWidth={700}>
                    <Grid item sm={6}>
                        <Typography variant="h6" gutterBottom>
                            O2 Therapy (LPM)
                        </Typography>

                        {/* <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: 28 }}>2</Button> */}
                        <StyledToggleButtonGroup
                            size="medium"
                            value={o2}
                            exclusive
                            onChange={handleO2}
                        >
                            <ToggleButton value="0" aria-label="0" sx={{ width: 50 }}>
                                0
                            </ToggleButton>
                            <ToggleButton value="1" aria-label="1" sx={{ width: 50 }}>
                                1
                            </ToggleButton>
                            <ToggleButton value="3" aria-label="2-5" sx={{ width: 50 }}>
                                2-5
                            </ToggleButton>
                            <ToggleButton value="6" aria-label=">5" sx={{ width: 50 }}>
                                {'>'}5
                            </ToggleButton>
                        </StyledToggleButtonGroup>
                    </Grid>
                    <Grid item sm={6}>
                        <Typography variant="h6" gutterBottom>
                            Level of Consciousness (LOC)
                            <Tooltip title={<span style={{ whiteSpace: 'pre-line' }}>{LOCtext}</span>} placement="top-start" sx={{}}>
                                <HelpOutlineIcon sx={{ color: "grey" }} fontSize='small' />
                            </Tooltip>
                        </Typography>
                        {/* <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: 28 }}>2</Button> */}
                        <StyledToggleButtonGroup
                            size="medium"
                            value={loc}
                            exclusive
                            onChange={handleLOC}
                        >
                            <ToggleButton value="A" aria-label="A" sx={{ width: 50 }}>
                                A
                            </ToggleButton>
                            <ToggleButton value="V" aria-label="V" sx={{ width: 50 }}>
                                V
                            </ToggleButton>
                            <ToggleButton value="P" aria-label="P" sx={{ width: 50 }}>
                                P
                            </ToggleButton>
                            <ToggleButton value="U" aria-label="U" sx={{ width: 50 }}>
                                U
                            </ToggleButton>
                        </StyledToggleButtonGroup>
                    </Grid>
                    <Grid item container spacing={3} sm={12} sx={{ mt: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Glasgow Coma Scale การประเมินระดับความรู้สึกตัว
                        </Typography>
                        {/* <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: 28 }}>2</Button> */}
                        <Grid item sm={4}>
                            <Typography variant="h6" gutterBottom>
                                E <Tooltip title={<span style={{ whiteSpace: 'pre-line' }}>{Etext}</span>} placement="top-start" sx={{}}>
                                    <HelpOutlineIcon sx={{ color: "grey" }} fontSize='small' />
                                </Tooltip>
                            </Typography>
                            <Grid container alignItems='center'>
                                <Button onClick={handleDecreaseE} variant="contained" color="secondary" size="small" sx={{ borderRadius: '50%', maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }}>-</Button>
                                <Item sx={undefined} display={undefined} alignItems={undefined}> {e}</Item>
                                <Button onClick={handleIncreaseE} variant="contained" color="secondary" size="small" sx={{ borderRadius: '50%', maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }}>+</Button>

                            </Grid>
                        </Grid>
                        <Grid item sm={4}>
                            <Typography variant="h6" gutterBottom>
                                V <Tooltip title={<span style={{ whiteSpace: 'pre-line' }}>{Vtext}</span>} placement="top-start" sx={{}}>
                                    <HelpOutlineIcon sx={{ color: "grey" }} fontSize='small' />
                                </Tooltip>
                            </Typography>
                            <Grid container alignItems='center'>
                                <Button onClick={handleDecreaseV} variant="contained" color="secondary" size="small" sx={{ borderRadius: '50%', maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }}>-</Button>
                                <Item sx={undefined} display={undefined} alignItems={undefined}> {v}</Item>
                                <Button onClick={handleIncreaseV} variant="contained" color="secondary" size="small" sx={{ borderRadius: '50%', maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }}>+</Button>

                            </Grid>
                        </Grid>
                        <Grid item sm={4}>
                            <Typography variant="h6" gutterBottom>
                                M <Tooltip title={<span style={{ whiteSpace: 'pre-line' }}>{Mtext}</span>} placement="top-start" sx={{}}>
                                    <HelpOutlineIcon sx={{ color: "grey" }} fontSize='small' />
                                </Tooltip>
                            </Typography>
                            <Grid container alignItems='center'>
                                <Button onClick={handleDecreaseM} variant="contained" color="secondary" size="small" sx={{ borderRadius: '50%', maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }}>-</Button>
                                <Item sx={undefined} display={undefined} alignItems={undefined}> {m}</Item>
                                <Button onClick={handleIncreaseM} variant="contained" color="secondary" size="small" sx={{ borderRadius: '50%', maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }}>+</Button>

                            </Grid>
                        </Grid>
                        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={tube} onChange={handleChange} name="tube" />
                                    }
                                    label="Endotrachel Tube / Tracheostomy Tube"
                                />
                            </FormGroup>

                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment >
    );
}