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
import { getAdmitCardForNurse, getAdmitCardForDoctor, getTriageHistory, ITriage } from '@/services/patientService';
import { ResponseEntity } from '@/services/axios.enp.core.config';

export default function PatientList() {
    const { isLoggedIn, role } = useAuth()

    const handleOnClick = () => {

    }
    const [history, setHistory] = useState<any>([])

    const router = useRouter();
    const { an } = router.query;

    useEffect(() => {
        //loadPatientFromApi()
        const fetchData = async () => {
            if (!an) return
            // get the data from the api
            const history = await loadTriageHistoryFromApiWithAN()
            const arr = [];
            console.log(history.length)
            setHistory(history)
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
    const arr = history.length;

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
                            onClick={() => router.push("/patient/list")}
                        >
                            <ArrowBackIcon />
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h5" gutterBottom sx={{ my: { xs: 3, md: 0 } }}>
                        ประวัติการ Triage
                    </Typography>
                </Grid>
                {history.map((history) => {
                    //console.log(history)
                    return (
                        <TriageBox id={history.id} date={history.date} indicator={{
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
                            gcs: history.add.gcs
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
                            result_respiratory: history.triageResult.result_respiratory,
                            result_sepsis: history.triageResult.result_sepsis,
                            result_shock: history.triageResult.result_shock,
                            result_seizure: history.triageResult.result_seizure
                        }} />

                    )
                })}

            </Grid>
        </>
    );
}