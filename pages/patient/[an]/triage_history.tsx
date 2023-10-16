import { useAuth } from '@/_auth';
import Navbar from '@/components/Navbar';
import EnhancedTable from '@/components/HistoryTable'
import { Button, Container, Grid, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import router, { useRouter } from 'next/router';
import TriageBox from '@/components/TriageBox';
import { useEffect, useState } from 'react';
import { getAdmitCardForNurse, getAdmitCardForDoctor, getTriageHistory, ITriage, getPatientByAN, getPatientByANForDoctor, getTriageHistoryForDoctor } from '@/services/patientService';
import { ResponseEntity } from '@/services/axios.enp.core.config';
import CollapseTable from '@/components/TriageBox';
import dayjs from 'dayjs';
import React from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import * as XLSX from "xlsx"

export default function PatientList() {
    const { isLoggedIn, role } = useAuth()

    const [history, setHistory] = useState<any>([])

    const router = useRouter();
    const { an } = router.query;

    useEffect(() => {
        //loadPatientFromApi()
        const fetchData = async () => {
            if (!an) return
            // get the data from the api
            if (role === "ROLE_NURSE") {
                const history = await loadTriageHistoryFromApiWithAN()
                setHistory(history)
                console.log(history)

            }
            else {
                const history = await loadTriageHistoryFromApiWithANForDoctor()
                setHistory(history)
            }
            console.log(history)
        }

        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, [an, role])

    const loadTriageHistoryFromApiWithAN = async () => {
        const response = await getTriageHistory(`${an}`)
        console.log(response)
        return response.data
    }

    const loadTriageHistoryFromApiWithANForDoctor = async () => {
        const response = await getTriageHistoryForDoctor(`${an}`)
        console.log(response)
        return response.data
    }

    const day = dayjs().format('DD/MM/YYYY')
    const [patient, setPatient] = React.useState<any>()
    useEffect(() => {
        //loadPatientFromApi()
        const fetchData = async () => {
            if (!an) return
            // get the data from the api
            if (role === "ROLE_NURSE") {
                const patient = await loadPatientWithAN()
                setPatient(patient)
            } else {
                const patient = await loadPatientWithANForDoctor()
                setPatient(patient)
            }
        }

        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, [an])

    const loadPatientWithAN = async () => {
        const response = await getPatientByAN(`${an}`)
        console.log(response)
        return response.data
    }

    const loadPatientWithANForDoctor = async () => {
        const response = await getPatientByANForDoctor(`${an}`)
        console.log(response)
        return response.data
    }

    const arr = history.map(triage => {
        let sev;
        if (triage.triageResult.severity == 0)
            sev = "ปกติ"
        else if (triage.triageResult.severity == 1)
            sev = "น่าเป็นห่วง"
        else if (triage.triageResult.severity == 2)
            sev = "รุนแรง"
        else if (triage.triageResult.severity == 4)
            sev = "รุนแรงมาก"
        return {
            id: triage.id,
            date: triage.date,
            nurse: triage.nurseName,
            mpew: triage.triageResult.mpew,
            result_respiratory: triage.triageResult.result_respiratory,
            result_seizure: triage.triageResult.result_seizure,
            result_sepsis: triage.triageResult.result_sepsis,
            result_shock: triage.triageResult.result_shock,
            severity: sev,
            heart_rate: triage.vitalSign.heartRate,
            oxygenSaturation: triage.vitalSign.oxygenSaturation,
            oxygenTherapy: triage.vitalSign.oxygenTherapy,
            respiratoryRate: triage.vitalSign.respiratoryRate,
            temperature: triage.vitalSign.temperature,
            systolic_blood_pressure: triage.vitalSign.systolic_blood_pressure,
            diastolic_blood_pressure: triage.vitalSign.diastolic_blood_pressure,
            bed_ridden_cerebralPulsy: triage.riskFactor.bedRidden_cerebralPulsy,
            center_iv_catheter: triage.riskFactor.center_iv_catheter,
            history_bone_marrow: triage.riskFactor.history_bone_marrow,
            malignancy: triage.riskFactor.malignancy,
            organtranplantation: triage.riskFactor.organtranplantation,
            post_splenectomy_asplenia: triage.riskFactor.postSplenectomy_asplenia,
            primary_immune_defencing: triage.riskFactor.primary_immune_defencing,
            suspected_infection: triage.riskFactor.suspected_infection,
            dehydration: triage.initialImpression.dehedration,
            grunting: triage.initialImpression.grunting,
            irritable: triage.initialImpression.irritable,
            motting_skin: triage.initialImpression.motting_skin,
            nasal_flaring: triage.initialImpression.nasal_flaring,
            pale_cyanosis: triage.initialImpression.pale_cyanosis,
            petichea: triage.initialImpression.petichea,
            scalene_muscle: triage.initialImpression.scalene_muscle,
            stupor_drownsiness: triage.initialImpression.stupor_drownsiness,
            subcostral_retraction: triage.initialImpression.subcostral_retraction,
            supersternal_retraction: triage.initialImpression.supersternal_retraction,
            airEntry: triage.physicalExam.airEntry,
            bounding_pulse: triage.physicalExam.bounding_pulse,
            cap_refill: triage.physicalExam.cap_refill,
            consciousness: triage.physicalExam.consciousness,
            flash_cap: triage.physicalExam.flash_cap,
            weak_pulse: triage.physicalExam.weak_pulse,
            wheezing: triage.physicalExam.wheezing,
            comoatose_stage_seizure: triage.add.comoatose_stage_seizure,
            generalize_seizure: triage.add.generalize_seizure,
            history_of_seizure: triage.add.history_of_seizure,
            poor_feeding: triage.add.poor_feeding,
            e: triage.add.e,
            v: triage.add.v,
            m: triage.add.m,
        }
    })
    console.log(arr)

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(arr);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "Triages_" + an + ".xlsx");
    };

    return (
        <>
            <Navbar item={
                <Button href="/" color="inherit"></Button>
            } isLoggedIn={isLoggedIn} />
            <Grid container sx={{ my: { xs: 3, md: 0 }, p: { xs: 2, md: 6 } }}>
                <Grid container sx={{ mb: 3 }}>
                    <Grid item md={1}>
                        <Button
                            variant='contained'
                            onClick={() => router.push("/patient/" + an)}
                        >
                            <ArrowBackIcon />
                        </Button>
                    </Grid>
                    <Grid item md={8.5}>
                    </Grid>
                    <Grid item sm={2.5}>
                        <Paper variant="outlined" sx={{ backgroundColor: "#DADADA" }}>
                            <Typography align="center" variant="subtitle2">
                                {patient?.name} {patient?.surname}
                            </Typography>
                            <Typography align="center" variant="subtitle2">
                                {an} {patient?.hn}
                            </Typography>
                            <Typography align="center" variant="subtitle2">
                                today : {day}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                <Grid item xs={10} sm={10}>
                    <Typography variant="h5" gutterBottom sx={{ my: { xs: 3, md: 0 } }}>
                        ประวัติการ Triage
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={2}>
                    <Button variant='contained' onClick={() => downloadExcel()} size='small' >
                        Download<DownloadIcon />
                    </Button>
                </Grid>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell></TableCell>
                                <TableCell >วันที่บันทึก</TableCell>
                                <TableCell >MPEW</TableCell>
                                <TableCell> ความรุนแรง</TableCell>
                                <TableCell >พยาบาลที่ตรวจ</TableCell>
                                <TableCell >แพทย์เจ้าของไข้</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {history.slice(0).reverse().map((history: ITriage, index: number) => {
                                return (
                                    <CollapseTable
                                        nurseName={history.nurseName}
                                        index={index} id={history.id} date={history.date} doctor={patient?.doctor.name + ' ' + patient?.doctor.surname} indicator={{
                                            respiratory: history.indicator.respiratory,
                                            sepsis: history.indicator.sepsis,
                                            shock: history.indicator.shock,
                                            seizure: history.indicator.seizure
                                        }} vitalSign={{
                                            heartRate: history.vitalSign.heartRate,
                                            respiratoryRate: history.vitalSign.respiratoryRate,
                                            temperature: history.vitalSign.temperature,
                                            oxygenSaturation: history.vitalSign.oxygenSaturation,
                                            oxygenTherapy: history.vitalSign.oxygenTherapy,
                                            systolic_blood_pressure: history.vitalSign.systolic_blood_pressure,
                                            diastolic_blood_pressure: history.vitalSign.diastolic_blood_pressure
                                        }} add={{
                                            poor_feeding: history.add.poor_feeding,
                                            history_of_seizure: history.add.history_of_seizure,
                                            generalize_seizure: history.add.generalize_seizure,
                                            comoatose_stage_seizure: history.add.comoatose_stage_seizure,
                                            gcs: history.add.gcs,
                                            e: history.add.e,
                                            v: history.add.v,
                                            m: history.add.m,
                                        }} initialImpression={{
                                            scalene_muscle: history.initialImpression.scalene_muscle,
                                            irritable: history.initialImpression.irritable,
                                            stupor_drownsiness: history.initialImpression.stupor_drownsiness,
                                            dehedration: history.initialImpression.dehedration,
                                            nasal_flaring: history.initialImpression.nasal_flaring,
                                            subcostral_retraction: history.initialImpression.subcostral_retraction,
                                            supersternal_retraction: history.initialImpression.supersternal_retraction,
                                            grunting: history.initialImpression.grunting,
                                            pale_cyanosis: history.initialImpression.pale_cyanosis,
                                            motting_skin: history.initialImpression.motting_skin,
                                            petichea: history.initialImpression.petichea
                                        }} riskFactor={{
                                            suspected_infection: history.riskFactor.suspected_infection,
                                            organtranplantation: history.riskFactor.organtranplantation,
                                            history_bone_marrow: history.riskFactor.history_bone_marrow,
                                            primary_immune_defencing: history.riskFactor.primary_immune_defencing,
                                            postSplenectomy_asplenia: history.riskFactor.postSplenectomy_asplenia,
                                            malignancy: history.riskFactor.malignancy,
                                            bedRidden_cerebralPulsy: history.riskFactor.bedRidden_cerebralPulsy,
                                            center_iv_catheter: history.riskFactor.center_iv_catheter
                                        }} physicalExam={{
                                            weak_pulse: history.physicalExam.weak_pulse,
                                            bounding_pulse: history.physicalExam.bounding_pulse,
                                            cap_refill: history.physicalExam.cap_refill,
                                            flash_cap: history.physicalExam.flash_cap,
                                            consciousness: history.physicalExam.consciousness,
                                            airEntry: history.physicalExam.airEntry,
                                            wheezing: history.physicalExam.wheezing
                                        }} triageResult={{
                                            mpew: history.triageResult.mpew,
                                            severity: history.triageResult.severity,
                                            result_respiratory: history.triageResult.result_respiratory,
                                            result_sepsis: history.triageResult.result_sepsis,
                                            result_shock: history.triageResult.result_shock,
                                            result_seizure: history.triageResult.result_seizure
                                        }} />

                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>


            </Grid>
        </>
    );
}