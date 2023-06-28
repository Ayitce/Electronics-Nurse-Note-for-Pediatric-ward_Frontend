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
        age: string;
        symptom: string;
        allergies: string;
        doctor: any;
        address: string;
        parentName: string;
        phoneNumber: string;
        image: any;
    };
    admitDateTime: any;
    dischargeDate: any;
    an: string;
}

export interface Card {
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

export const getAdmitCard = (an: string) => {
    return api.http.get<ResponseEntity<IPatientCard>>(`${window.origin}/api/admit/${an}`)
}

export const getAdmitList = () => {
    return api.http.get<ResponseEntity<IPatientCard>>(`${window.origin}/api/admit`)
}

export const getSearchedAdmit = (search: string) => {
    return api.http.get<ResponseEntity<IPatientCard>>(`${window.origin}/api/admit/search/${search}`)
}

export const admitPatient = (patient: IPatientCard) => {
    return api.http.post<ResponseEntity<IPatientCard>>(
        `${window.origin}/api/admit/admit`,
        patient
    );
}