import { useAuth } from '@/_auth';
import Navbar from '@/components/Navbar';
import EnhancedTable from '@/components/PatientTable'
import { Button, Container, Grid, InputAdornment, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import router from 'next/router';

export default function PatientList() {
    const { isLoggedIn } = useAuth()

    const handleOnClick = () => {
        
    }

    return (
        <>
            <Navbar item={
                <Button href="/" color="inherit"></Button>
            } isLoggedIn={isLoggedIn} />
            <Grid container sx={{ my: { xs: 3, md: 0 }, p: { xs: 2, md: 6 } }}>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h5" gutterBottom sx={{ my: { xs: 3, md: 0 } }}>
                        การจัดการคนไข้
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ mt: { xs: 3, md: 4 }, mb: { xs: 3, md: 1 } }}>
                    <TextField
                        id="input-with-icon-textfield"
                        label="ค้นหา"
                        placeholder="ชื่อ, รหัสผู้ป่วย"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6.5}></Grid>
                <Grid item xs={12} sm={1.5} sx={{ mt: { xs: 3, md: 4 }, mb: { xs: 3, md: 1 } }}>
                    <Button
                        variant='contained'
                        fullWidth
                        onClick={() => router.push("/patient/admit")}
                    >
                        <AddIcon />
                        เพิ่มคนไข้
                    </Button>
                </Grid>
                <EnhancedTable />
            </Grid>
        </>
    );
}