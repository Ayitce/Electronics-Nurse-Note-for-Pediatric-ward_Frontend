import { useAuth } from '@/_auth';
import Navbar from '@/components/Navbar';
import EnhancedTable from '@/components/PatientTable'
import { Avatar, Button, Chip, Container, Grid, InputAdornment, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import router from 'next/router';


export default function PatientList() {
    const { isLoggedIn, role } = useAuth()

    const handleOnClick = () => {

    }

    return (
        <>
            <Navbar item={
                <Button href="/" color="inherit"></Button>
            } isLoggedIn={isLoggedIn} />
            <Grid container sx={{ my: { xs: 3, md: 0 }, p: { xs: 2, md: 6 } }}>
                <Grid item xs={12} sm={10.5}>
                    <Typography variant="h5" gutterBottom sx={{ my: { xs: 3, md: 0 } }}>
                        การจัดการคนไข้
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={1.5}>
                    {role == "ROLE_NURSE" ?
                        <Chip
                            avatar={<Avatar alt="Natacha" src="/assets/nurse.png" />}
                            label="NURSE" color="primary" variant="outlined" />
                        :
                        <Chip
                            avatar={<Avatar alt="Natacha" src="/assets/doctor.png" />}
                            label="DOCTOR" color="primary" variant="outlined" />
                    }

                </Grid>

                <EnhancedTable />

            </Grid>
        </>
    );
}