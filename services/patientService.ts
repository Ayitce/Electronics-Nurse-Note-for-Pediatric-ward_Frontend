//ย้ายพวกcall api มาในนี้ด้วย

import { ResponseEntity } from "./axios.enp.core.config";
import { api } from "./axios.site.config";

export interface IPatientCard {
    name: string;
    surname: string;
    gender: any;
    idCard: string;
    height: string;
    weight: string;
    bloodType: any;
    dateOfBirth: any;
    hn: string;
    age: string;
    admitDateTime: any;
    symptom: string;
    allergies: string;
    doctor: any;
    address: string;
    parentName: string;
    phoneNumber: string;
    image: any;
}

export const getPatientCard = (hn: string) => {
    return api.http.get<ResponseEntity<IPatientCard>>(`${window.origin}/api/patient/${hn}`)
}

export const getPatientList = () => {
    return api.http.get<ResponseEntity<IPatientCard>>(`${window.origin}/api/patient`)
}

export const getSearchedPatient = (search: string) => {
    return api.http.get<ResponseEntity<IPatientCard>>(`${window.origin}/api/patient/search/${search}`)
}

export const admitPatient = (patient: IPatientCard) => {
    return api.http.post<ResponseEntity<IPatientCard>>(
        `${window.origin}/api/patient/admit`,
        patient
    );
}