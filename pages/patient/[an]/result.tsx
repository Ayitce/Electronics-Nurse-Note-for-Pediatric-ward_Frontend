import { useAuth } from '@/_auth';
import Navbar from '@/components/Navbar';
import EnhancedTable from '@/components/HistoryTable'
import { Button, Container, Grid, InputAdornment, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import router, { useRouter } from 'next/router';
import TriageBox from '@/components/TriageBox';
import { useEffect, useState } from 'react';
import { getAdmitCardForNurse, getAdmitCardForDoctor, getTriageHistory } from '@/services/patientService';
import { ResponseEntity } from '@/services/axios.enp.core.config';
import TriageResultBox from '@/components/TriageResult';
import React from 'react';
import { ITriage } from './triage';

export default function TriageResult() {
    const { isLoggedIn, role } = useAuth()

    const router = useRouter();
    const { an } = router.query;

    const { myData } = router.query;
    const [data, setData] = React.useState<ITriage>()
    useEffect(() => {
        if (myData !== undefined) {
            setData(JSON.parse(myData as string))
            console.log(myData as string)
        }
    }, [router.query]);


    return (
        <>
            <Navbar item={
                <Button href="/" color="inherit"></Button>
            } isLoggedIn={isLoggedIn} />
            <Grid container sx={{ my: { xs: 3, md: 0 }, p: { xs: 2, md: 6 } }}>

                <Grid container
                    spacing={0}
                    //  direction="column"
                    alignItems="center"
                    justifyContent="center">
                    <Typography variant="h5" gutterBottom sx={{ my: { xs: 3, md: 0 }, fontWeight: "bold" }} color={"primary"} >
                        RESULT
                    </Typography>
                    <TriageResultBox id={data?.id!} date={data?.date!} indicator={{
                        respiratory: data?.indicator.respiratory!,
                        sepsis: data?.indicator.sepsis!,
                        shock: data?.indicator.shock!,
                        seizure: data?.indicator.seizure!
                    }} vitalSign={{
                        heartRate: data?.vitalSign.heartRate!,
                        respiratoryRate: data?.vitalSign.respiratoryRate!,
                        temperature: data?.vitalSign.temperature!,
                        oxygenSaturation: data?.vitalSign.oxygenSaturation!,
                        oxygenTherapy: data?.vitalSign.oxygenTherapy!,
                        systolic_blood_pressure: data?.vitalSign.systolic_blood_pressure!,
                        diastolic_blood_pressure: data?.vitalSign.diastolic_blood_pressure!
                    }} add={{
                        poor_feeding: data?.add.poor_feeding!,
                        history_of_seizure: data?.add.history_of_seizure!,
                        generalize_seizure: data?.add.generalize_seizure!,
                        comoatose_stage_seizure:data?.add.comoatose_stage_seizure!,
                        gcs: data?.add.gcs!
                    }} initialImpression={{
                        scalene_muscle: data?.initialImpression.scalene_muscle!,
                        irritable: data?.initialImpression.irritable!,
                        stupor_drownsiness: data?.initialImpression.stupor_drownsiness!,
                        dehedration: data?.initialImpression.dehedration!,
                        nasal_flaring: data?.initialImpression.nasal_flaring!,
                        subcostral_retraction: data?.initialImpression.subcostral_retraction!,
                        supersternal_retraction: data?.initialImpression.supersternal_retraction!,
                        grunting: data?.initialImpression.grunting!,
                        pale_cyanosis: data?.initialImpression.pale_cyanosis!,
                        motting_skin: data?.initialImpression.motting_skin!,
                        petichea: data?.initialImpression.petichea!
                    }} riskFactor={{
                        suspected_infection: data?.riskFactor.suspected_infection!,
                        organtranplantation: data?.riskFactor.organtranplantation!,
                        history_bone_marrow: data?.riskFactor.history_bone_marrow!,
                        primary_immune_defencing: data?.riskFactor.primary_immune_defencing!,
                        postSplenectomy_asplenia: data?.riskFactor.postSplenectomy_asplenia!,
                        malignancy: data?.riskFactor.malignancy!,
                        bedRidden_cerebralPulsy: data?.riskFactor.bedRidden_cerebralPulsy!,
                        center_iv_catheter: data?.riskFactor.center_iv_catheter!
                    }} physicalExam={{
                        weak_pulse: data?.physicalExam.weak_pulse!,
                        bounding_pulse: data?.physicalExam.bounding_pulse!,
                        cap_refill:data?.physicalExam.cap_refill!,
                        flash_cap: data?.physicalExam.flash_cap!,
                        consciousness: data?.physicalExam.consciousness!,
                        airEntry: data?.physicalExam.airEntry!,
                        wheezing:data?.physicalExam.wheezing!
                    }} triageResult={{
                        mpew: data?.triageResult.mpew!,
                        result_respiratory: data?.triageResult.result_respiratory!,
                        result_sepsis: data?.triageResult.result_sepsis!,
                        result_shock: data?.triageResult.result_shock!,
                        result_seizure: data?.triageResult.result_seizure!
                    }} />
                </Grid>
                <Grid item md={10.5}>

                </Grid>
                <Grid item md={1.5}>
                    <Button
                        variant='contained'
                        onClick={() => router.push("/patient/list")}
                    >
                        เสร็จสิ้น
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}