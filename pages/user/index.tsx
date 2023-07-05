import { useAuth } from '@/_auth';
import Navbar from '@/components/Navbar';
import EnhancedTable from '@/components/NurseTable'
import { Button, Container, Grid, InputAdornment, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
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
            <Grid container spacing={3} sx={{ my: { xs: 3, md: 0 }, p: { xs: 2, md: 6 } }}>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h5" gutterBottom sx={{ my: { xs: 3, md: 0 } }}>
                        การจัดการ User
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <EnhancedTable/>
                </Grid>

            </Grid>
        </>
    );
}