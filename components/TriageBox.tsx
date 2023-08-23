import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";

export interface ITriage {
    index: number,
    id: number,
    date: string,
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
        gcs: number
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
        result_respiratory: string,
        result_sepsis: string,
        result_shock: string,
        result_seizure: string
    }
}

export default function TriageBox(props: ITriage) {
    return (
        <React.Fragment>
            <Container component="main" sx={{ mb: 1 }}>

                <Paper sx={{ my: { xs: 1, md: 1 }, p: 2 }}>
                    <Grid item container md={12} spacing={1}>
                        <Grid item md={1.5}>
                            <Typography variant="subtitle2">
                                วันที่บันทึก
                            </Typography>
                        </Grid>
                        <Grid item md={2}>
                            <Typography variant="subtitle2">
                                สัญญาณชีพ
                            </Typography>
                        </Grid>
                        <Grid item md={2}>
                            <Typography variant="subtitle2">
                                อาการโดยรวม
                            </Typography>
                        </Grid>
                        <Grid item md={2}>
                            <Typography variant="subtitle2">
                                ระดับความรู้สึกตัว
                            </Typography>
                        </Grid>
                        <Grid item md={2}>
                            <Typography variant="subtitle2">
                                อาการฉุกเฉินเบื้องต้น
                            </Typography>
                        </Grid>
                        <Grid item md={1.5}>
                            <Typography variant="subtitle2">
                                PEWS SCORE
                            </Typography>
                        </Grid>
                        <Grid item md={1}>
                            <Typography variant="subtitle2">
                                พยาบาลที่ตรวจ
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container md={12} spacing={1}>
                        <Grid item md={1.5}>
                            <Typography variant="subtitle2">
                                {props.date}
                            </Typography>
                        </Grid>
                        <Grid item md={2}>
                            <Typography variant="subtitle2">
                                Temp(°C) : {props.vitalSign.temperature}
                            </Typography>
                            <Typography variant="subtitle2">
                                HR (/min) : {props.vitalSign.heartRate}
                            </Typography>
                            <Typography variant="subtitle2">
                                SpO (%) : {props.vitalSign.oxygenSaturation}
                            </Typography>
                            <Typography variant="subtitle2">
                                RR (/min) : {props.vitalSign.respiratoryRate}
                            </Typography>
                            <Typography variant="subtitle2">
                                BP(mmHg) : {props.vitalSign.systolic_blood_pressure}/{props.vitalSign.diastolic_blood_pressure}
                            </Typography>
                        </Grid>
                        <Grid item md={2}>
                            <Typography variant="subtitle2">
                                Sepsis Indicator
                            </Typography>
                            <Typography variant="subtitle2">
                                Shock Indicator
                            </Typography>
                        </Grid>
                        <Grid item md={2}>
                            <Typography variant="subtitle2">
                                LPM : 2-5
                            </Typography>
                            <Typography variant="subtitle2">
                                LOC : P
                            </Typography>
                            <Typography variant="subtitle2">
                                E : 1
                            </Typography>
                            <Typography variant="subtitle2">
                                V : 1
                            </Typography>
                            <Typography variant="subtitle2">
                                M : 1
                            </Typography>
                        </Grid>
                        <Grid item md={2}>
                            <Typography variant="subtitle2">
                                Irritable
                            </Typography>
                            <Typography variant="subtitle2">
                                Pale / Cyanosis
                            </Typography>
                        </Grid>
                        <Grid item md={1.5}>
                            <Typography variant="subtitle2">
                                {props.triageResult.mpew}
                            </Typography>
                        </Grid>
                        <Grid item md={1}>
                            <Typography variant="subtitle2">
                                กนกจันทร์
                            </Typography>
                        </Grid>
                    </Grid>
                    {props.index == 0 ? (
                        <Grid item md={1} sx={{ border: 1, borderColor: "red", borderRadius: 10 }} container spacing={0}
                            direction="column"
                            alignItems="center"
                            justifyContent="center">
                            <Typography sx={{ color: "red", fontSize: 15 }}>ล่าสุด</Typography>
                        </Grid>
                    )
                        : (<></>)
                    }


                </Paper>
            </Container>
        </React.Fragment>
    )

}