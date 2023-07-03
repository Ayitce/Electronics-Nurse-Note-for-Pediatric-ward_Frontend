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
    id: number;
    name: string;
    surname: string;
    gender: any;
    idCard: string;
    height: string;
    weight: string;
    bloodType: any;
    dateOfBirth: any;
    hn: string;
    // age: string;
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
//----------Nurse--------------
export const getAdmitCardForNurse = (an: string) => {
    return api.http.get<ResponseEntity<IPatientCard>>(`${window.origin}/api/admit/${an}`)
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