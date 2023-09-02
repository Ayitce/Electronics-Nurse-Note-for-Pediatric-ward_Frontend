import { Box, Button, Collapse, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';

export interface ITriage {
    index: number,
    id: number,
    date: string,
    nurseName: string,
    doctor: string,
    indicator: {
        respiratory: boolean,
        sepsis: boolean,
        shock: boolean,
        seizure: boolean
    },
    vitalSign: {
        heartRate: number,
        respiratoryRate: number,
        temperature: number,
        oxygenSaturation: number,
        oxygenTherapy: number,
        systolic_blood_pressure: number,
        diastolic_blood_pressure: number
    },
    add: {
        poor_feeding: boolean,
        history_of_seizure: boolean,
        generalize_seizure: boolean,
        comoatose_stage_seizure: boolean,
        gcs: number,
        e: number,
        v: number,
        m: number,
    },
    initialImpression: {
        scalene_muscle: boolean,
        irritable: boolean,
        stupor_drownsiness: boolean,
        dehedration: boolean,
        nasal_flaring: boolean,
        subcostral_retraction: boolean,
        supersternal_retraction: boolean,
        grunting: boolean,
        pale_cyanosis: boolean,
        motting_skin: boolean,
        petichea: boolean
    },
    riskFactor: {
        suspected_infection: boolean,
        organtranplantation: boolean,
        history_bone_marrow: boolean
        primary_immune_defencing: boolean,
        postSplenectomy_asplenia: boolean,
        malignancy: boolean,
        bedRidden_cerebralPulsy: boolean,
        center_iv_catheter: boolean
    },
    physicalExam: {
        weak_pulse: boolean,
        bounding_pulse: boolean,
        cap_refill: boolean,
        flash_cap: boolean,
        consciousness: string,
        airEntry: number,
        wheezing: number
    },
    triageResult: {
        mpew: number,
        severity: number;
        result_respiratory: string,
        result_sepsis: string,
        result_shock: string,
        result_seizure: string
    }
}


function TriageBox(props: ITriage) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Container component="main" sx={{ mb: 1 }}>
            <Grid item container md={12} spacing={1}>

                <Grid container spacing={1}>
                    <Grid item sm={3} md={3}>
                        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                            Respiratory Indicator
                        </Typography>
                        <Typography variant="subtitle2">
                            <div dangerouslySetInnerHTML={{ __html: props.triageResult.result_respiratory ? props.triageResult.result_respiratory : "-" }}></div>
                        </Typography>
                
                    </Grid>
                    <Grid item sm={3} md={3}>
                        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                            Sepsis Indicator
                        </Typography>
                        <Typography variant="subtitle2">
                            <div dangerouslySetInnerHTML={{ __html: props.triageResult.result_sepsis ? props.triageResult.result_sepsis : "-" }}></div>
                        </Typography>
                    </Grid>
                    <Grid item sm={3} md={3}>
                        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                            Shock Indicator
                        </Typography>
                        <Typography variant="subtitle2">
                            <div dangerouslySetInnerHTML={{ __html: props.triageResult.result_shock ? props.triageResult.result_shock : "-" }}></div>
                        </Typography>
                    </Grid>
                    <Grid item sm={3} md={3}>
                        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                            Seizure Indicator
                        </Typography>
                        <Typography variant="subtitle2">
                            <div dangerouslySetInnerHTML={{ __html: props.triageResult.result_seizure ? props.triageResult.result_seizure : "-" }}></div>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item sm={11}></Grid>
                <Grid item sm={1}>
                    <Button variant="outlined" size="small" onClick={handleClickOpen}>
                        Record
                    </Button>
                </Grid>
            </Grid>

            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Detail record
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Grid item container md={12} spacing={1}>
                        <Grid item md={4}>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                Vital signs
                            </Typography>
                        </Grid>
                        <Grid item md={4}>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                Total symptom
                            </Typography>
                        </Grid>
                        <Grid item md={4}>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                Physical exam
                            </Typography>
                        </Grid>
                        <Grid item md={4}>
                            <Typography variant="subtitle2">
                                • Temp(°C) : {props.vitalSign.temperature}
                            </Typography>
                            <Typography variant="subtitle2">
                                • HR (/min) : {props.vitalSign.heartRate}
                            </Typography>
                            <Typography variant="subtitle2">
                                • SpO (%) : {props.vitalSign.oxygenSaturation}
                            </Typography>
                            <Typography variant="subtitle2">
                                • RR (/min) : {props.vitalSign.respiratoryRate}
                            </Typography>
                            <Typography variant="subtitle2">
                                • BP(mmHg) : {props.vitalSign.systolic_blood_pressure}/{props.vitalSign.diastolic_blood_pressure}
                            </Typography>
                        </Grid>
                        <Grid item md={4}>
                            <Typography variant="subtitle2">
                                • O2 Therapy (LPM) : {props.vitalSign.oxygenTherapy}
                            </Typography>
                            <Typography variant="subtitle2">
                                • Level of Consciousness (LOC) : {props.physicalExam.consciousness}
                            </Typography>
                            <Typography variant="subtitle2">
                                • Glasgow Coma Scale : {props.add.gcs}
                            </Typography>
                            <Typography variant="subtitle2">
                                E: {props.add.e}  V: {props.add.v}  M: {props.add.m}
                            </Typography>
                        </Grid>
                        <Grid item md={4}>
                            {props.physicalExam.weak_pulse ? (
                                <Typography variant="subtitle2">
                                    • Pulse : Weak pulse
                                </Typography>
                            ) : (<></>)}
                            {props.physicalExam.bounding_pulse ? (
                                <Typography variant="subtitle2">
                                    • Pulse : Bounding pulse
                                </Typography>
                            ) : (<></>)}
                            {!props.physicalExam.weak_pulse && !props.physicalExam.bounding_pulse ? (
                                <Typography variant="subtitle2">
                                    • Pulse : Normal
                                </Typography>
                            ) : (<></>)}
                            {props.physicalExam.cap_refill ? (
                                <Typography variant="subtitle2">
                                    • Capillary : refill
                                </Typography>
                            ) : (<></>)}
                            {props.physicalExam.flash_cap ? (
                                <Typography variant="subtitle2">
                                    • Capillary : flash
                                </Typography>
                            ) : (<></>)}
                            {!props.physicalExam.flash_cap && !props.physicalExam.cap_refill ? (
                                <Typography variant="subtitle2">
                                    • Capillary : Normal
                                </Typography>
                            ) : (<></>)}
                            <Typography variant="subtitle2">
                                • Air Entry : {props.physicalExam.airEntry}
                            </Typography>
                            <Typography variant="subtitle2">
                                • Wheezing : {props.physicalExam.wheezing}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid item container md={12} spacing={1}>


                        <Grid item md={6}>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                Risk factors
                            </Typography>
                        </Grid>

                        <Grid item md={6}>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                Initial Impression
                            </Typography>
                        </Grid>
                        <Grid item md={6}>
                            {props.riskFactor.suspected_infection ? (
                                <Typography variant="subtitle2">
                                    • Suspected Infection
                                </Typography>
                            ) : (<></>)}
                            {props.riskFactor.organtranplantation ? (
                                <Typography variant="subtitle2">
                                    • Organtransplantation
                                </Typography>
                            ) : (<></>)}
                            {props.riskFactor.history_bone_marrow ? (
                                <Typography variant="subtitle2">
                                    • History bone marrow
                                </Typography>
                            ) : (<></>)}
                            {props.riskFactor.primary_immune_defencing ? (
                                <Typography variant="subtitle2">
                                    • Primary immune defencing
                                </Typography>
                            ) : (<></>)}
                            {props.riskFactor.postSplenectomy_asplenia ? (
                                <Typography variant="subtitle2">
                                    • Post splenectomy/asplenia
                                </Typography>
                            ) : (<></>)}
                            {props.riskFactor.malignancy ? (
                                <Typography variant="subtitle2">
                                    • Malignancy
                                </Typography>
                            ) : (<></>)}
                            {props.riskFactor.bedRidden_cerebralPulsy ? (
                                <Typography variant="subtitle2">
                                    • Bed ridden/Cerebral pulsy
                                </Typography>
                            ) : (<></>)}
                            {props.riskFactor.center_iv_catheter ? (
                                <Typography variant="subtitle2">
                                    • Center IV Catheter
                                </Typography>
                            ) : (<></>)}
                            {props.add.poor_feeding ? (
                                <Typography variant="subtitle2">
                                    • Poor Feeding
                                </Typography>
                            ) : (<></>)}
                            {props.add.generalize_seizure ? (
                                <Typography variant="subtitle2">
                                    • Generalize seizure
                                </Typography>
                            ) : (<></>)}
                            {props.add.history_of_seizure ? (
                                <Typography variant="subtitle2">
                                    • History of seizure
                                </Typography>
                            ) : (<></>)}
                            {props.add.comoatose_stage_seizure ? (
                                <Typography variant="subtitle2">
                                    • Comoatose stage seizure
                                </Typography>
                            ) : (<></>)}
                        </Grid>

                        <Grid item md={6}>
                            {props.initialImpression.irritable ? (
                                <Typography variant="subtitle2">
                                    • Irritable
                                </Typography>
                            ) : (<></>)}
                            {props.initialImpression.scalene_muscle ? (
                                <Typography variant="subtitle2">
                                    • Scalene muscle
                                </Typography>
                            ) : (<></>)}
                            {props.initialImpression.stupor_drownsiness ? (
                                <Typography variant="subtitle2">
                                    • Stupor/Drownsiness
                                </Typography>
                            ) : (<></>)}
                            {props.initialImpression.dehedration ? (
                                <Typography variant="subtitle2">
                                    • Dehydration
                                </Typography>
                            ) : (<></>)}
                            {props.initialImpression.nasal_flaring ? (
                                <Typography variant="subtitle2">
                                    • Nasal flaring
                                </Typography>
                            ) : (<></>)}
                            {props.initialImpression.subcostral_retraction ? (
                                <Typography variant="subtitle2">
                                    • Subcostral retraction
                                </Typography>
                            ) : (<></>)}
                            {props.initialImpression.supersternal_retraction ? (
                                <Typography variant="subtitle2">
                                    • Supersternal retraction
                                </Typography>
                            ) : (<></>)}
                            {props.initialImpression.grunting ? (
                                <Typography variant="subtitle2">
                                    • Grunting
                                </Typography>
                            ) : (<></>)}
                            {props.initialImpression.pale_cyanosis ? (
                                <Typography variant="subtitle2">
                                    • Pale/cyanosis
                                </Typography>
                            ) : (<></>)}
                            {props.initialImpression.motting_skin ? (
                                <Typography variant="subtitle2">
                                    • Motting Skin
                                </Typography>
                            ) : (<></>)}
                            {props.initialImpression.petichea ? (
                                <Typography variant="subtitle2">
                                    • Petichea
                                </Typography>
                            ) : (<></>)}
                        </Grid>

                    </Grid>
                </DialogContent>
            </Dialog>
        </Container>
    )

}


export default function CollapseTable(props: ITriage) {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {props.index == 0 && (
                        <Typography sx={{ color: "red", fontSize: 15 }}>ล่าสุด</Typography>
                    )
                    }
                </TableCell>
                <TableCell>{props.date} น.</TableCell>
                <TableCell>{props.triageResult.mpew}</TableCell>
                {props.triageResult.severity == 0 &&
                    <TableCell sx={{ color: "green", fontWeight: "bold" }}>ปกติ</TableCell>
                }
                {props.triageResult.severity == 1 &&
                    <TableCell sx={{ color: "yellow", fontWeight: "bold" }}>น่าเป็นห่วง</TableCell>
                }
                {props.triageResult.severity == 2 &&
                    <TableCell sx={{ color: "orange", fontWeight: "bold" }}>รุนแรง</TableCell>
                }
                {props.triageResult.severity == 4 &&
                    <TableCell sx={{ color: "red", fontWeight: "bold" }}>รุนแรงมาก</TableCell>
                }
                <TableCell>{props.nurseName}</TableCell>
                <TableCell>{props.doctor}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <TriageBox index={0} id={props.id} date={props.date} doctor={props.doctor} indicator={{
                                respiratory: props.indicator.respiratory,
                                sepsis: props.indicator.sepsis,
                                shock: props.indicator.shock,
                                seizure: props.indicator.seizure
                            }} vitalSign={{
                                heartRate: props.vitalSign.heartRate,
                                respiratoryRate: props.vitalSign.respiratoryRate,
                                temperature: props.vitalSign.temperature,
                                oxygenSaturation: props.vitalSign.oxygenSaturation,
                                oxygenTherapy: props.vitalSign.oxygenTherapy,
                                systolic_blood_pressure: props.vitalSign.systolic_blood_pressure,
                                diastolic_blood_pressure: props.vitalSign.diastolic_blood_pressure
                            }} add={{
                                poor_feeding: props.add.poor_feeding,
                                history_of_seizure: props.add.history_of_seizure,
                                generalize_seizure: props.add.generalize_seizure,
                                comoatose_stage_seizure: props.add.comoatose_stage_seizure,
                                gcs: props.add.gcs,
                                e: props.add.e,
                                v: props.add.v,
                                m: props.add.m
                            }} initialImpression={{
                                scalene_muscle: props.initialImpression.scalene_muscle,
                                irritable: props.initialImpression.irritable,
                                stupor_drownsiness: props.initialImpression.stupor_drownsiness,
                                dehedration: props.initialImpression.dehedration,
                                nasal_flaring: props.initialImpression.nasal_flaring,
                                subcostral_retraction: props.initialImpression.subcostral_retraction,
                                supersternal_retraction: props.initialImpression.supersternal_retraction,
                                grunting: props.initialImpression.grunting,
                                pale_cyanosis: props.initialImpression.pale_cyanosis,
                                motting_skin: props.initialImpression.motting_skin,
                                petichea: props.initialImpression.petichea
                            }} riskFactor={{
                                suspected_infection: props.riskFactor.suspected_infection,
                                organtranplantation: props.riskFactor.organtranplantation,
                                history_bone_marrow: props.riskFactor.history_bone_marrow,
                                primary_immune_defencing: props.riskFactor.primary_immune_defencing,
                                postSplenectomy_asplenia: props.riskFactor.postSplenectomy_asplenia,
                                malignancy: props.riskFactor.malignancy,
                                bedRidden_cerebralPulsy: props.riskFactor.bedRidden_cerebralPulsy,
                                center_iv_catheter: props.riskFactor.center_iv_catheter
                            }} physicalExam={{
                                weak_pulse: props.physicalExam.weak_pulse,
                                bounding_pulse: props.physicalExam.bounding_pulse,
                                cap_refill: props.physicalExam.cap_refill,
                                flash_cap: props.physicalExam.flash_cap,
                                consciousness: props.physicalExam.consciousness,
                                airEntry: props.physicalExam.airEntry,
                                wheezing: props.physicalExam.wheezing
                            }} triageResult={{
                                mpew: props.triageResult.mpew,
                                severity: props.triageResult.severity,
                                result_respiratory: props.triageResult.result_respiratory,
                                result_sepsis: props.triageResult.result_sepsis,
                                result_shock: props.triageResult.result_shock,
                                result_seizure: props.triageResult.result_seizure
                            }} nurseName={props.nurseName} />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}