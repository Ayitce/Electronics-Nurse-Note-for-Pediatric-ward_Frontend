//ย้ายพวกcall api มาในนี้ด้วย

import { ResponseEntity } from "./axios.enp.core.config";
import { api } from "./axios.site.config";

export interface IPatientCard {
    id: number;
    bed: { id: number };
    room: { id: number };
    patient: {
        name: string;
        surname: string;
        gender: any;
        idCard: string;
        height: string;
        weight: string;
        bloodType: any;
        dateOfBirth: any;
        hn: string;
        symptom: string;
        allergies: string;
        address: string;
        parentName: string;
        phoneNumber: string;
        image: any;
        doctor: {
            id: number;
            name: string;
            surname: string;
            medicalID: string;
            phoneNumber: string;
        };
    };
    admitDateTime: any;
    dischargeDate: any;
    an: string;
    age: string;
}

export interface Patient {
    name: string;
    surname: string;
    gender: any;
    idCard: string;
    height: string;
    weight: string;
    bloodType: any;
    dateOfBirth: any;
    hn: string;
    symptom: string;
    allergies: string;
    address: string;
    parentName: string;
    phoneNumber: string;
    image: any;
    doctor: {
        id: number;
        name: string;
        surname: string;
        medicalID: string;
        phoneNumber: string;
    };
}

export interface ITriage {
    id: number,
    date: string,
    nurseName: string,
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
        m: number
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
//----------Nurse--------------
export const getAdmitCardForNurse = (an: string) => {
    return api.http.get<ResponseEntity<IPatientCard>>(`${window.origin}/api/admit/${an}`)
}

export const getPatientByAN = (an: string) => {
    return api.http.get<ResponseEntity<Patient>>(`${window.origin}/api/${an}`)
}
export const getAdmitListForNurse = () => {
    return api.http.get<ResponseEntity<IPatientCard>>(`${window.origin}/api/admit`)
}

export const getSearchedAdmitForNurse = (search: string) => {
    return api.http.get<ResponseEntity<IPatientCard>>(`${window.origin}/api/admit/search/${search}`)
}

export const admitPatient = (patient: IPatientCard) => {
    return api.http.post<ResponseEntity<IPatientCard>>(
        `${window.origin}/api/admit/admit`,
        patient
    );
}

export const dischargePatient = (patient: IPatientCard) => {
    return api.http.post<ResponseEntity<IPatientCard>>(
        `${window.origin}/api/admit/discharge`,
        patient
    );
}

export const getAllPatient = () => {
    return api.http.get<ResponseEntity<Patient>>(`${window.origin}/api/patientList`)
}

//-------------Doctor------------
export const getAdmitCardForDoctor = (an: string) => {
    return api.http.get<ResponseEntity<IPatientCard>>(`${window.origin}/api/doctor/admit/${an}`)
}

export const getAdmitListForDoctor = () => {
    return api.http.get<ResponseEntity<IPatientCard>>(`${window.origin}/api/doctor/admit`)
}

export const getSearchedAdmitForDoctor = (search: string) => {
    return api.http.get<ResponseEntity<IPatientCard>>(`${window.origin}/api/doctor/admit/search/${search}`)
}

export const getPatientByANForDoctor = (an: string) => {
    return api.http.get<ResponseEntity<Patient>>(`${window.origin}/api/doctor/${an}/patient`)
}
export const getTriageHistoryForDoctor = (an: string) => {
    return api.http.get<ResponseEntity<ITriage>>(`${window.origin}/api/doctor/${an}/triage_history`)
}

//------------Triage------------
export const getTriageHistory = (an: string) => {
    return api.http.get<ResponseEntity<ITriage>>(`${window.origin}/api/admit/${an}/triage_history`)
}
export const addNewTriage = (an: string, triage: ITriage) => {
    return api.http.post<ResponseEntity<ITriage>>(`${window.origin}/api/admit/${an}/triage`, triage)
}
//-------------line notify-----
export interface Inotify {
    message: string
}
export const lineNotify = (message: Inotify) => {
    return api.http.post(`${window.origin}/api/line-notify`, message)
}
