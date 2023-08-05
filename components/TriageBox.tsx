import { Container, Grid, Paper } from "@mui/material";
import React from "react";

export default function TriageBox() {
    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Container component="main" maxWidth="md" sx={{ mb: 4 }}>

                    <Paper sx={{ my: { xs: 3, md: 6 } }}>

                    </Paper>
                </Container>
            </Grid>
        </React.Fragment>
    )

}