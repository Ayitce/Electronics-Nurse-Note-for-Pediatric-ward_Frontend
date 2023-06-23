//ย้ายพวกcall api มาในนี้ด้วย

import { ResponseEntity } from "./axios.enp.core.config";
import { api } from "./axios.site.config";

export interface IPatientCard {
    name: string;
    surname: string;
    gender: any;
    IDcard: string;
    height: string;
    weight: string;
    bloodType: any;
    dateOfBirth: any;
    an: string;
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

export const getPatientCard = (an: string) => {
    return api.http.get<ResponseEntity<IPatientCard>>(`${window.origin}/api/patient/${an}`)
}

export const getPatientList = () => {
    return api.http.get<ResponseEntity<IPatientCard>>(`${window.origin}/api/patient`)
}

export const getSearchedPatient = (search: string) => {
    return api.http.get<ResponseEntity<IPatientCard>>(`${window.origin}/api/patient/search/${search}`)
}