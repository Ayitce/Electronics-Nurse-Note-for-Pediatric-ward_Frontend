import { ResponseEntity } from "./axios.enp.core.config";
import { api } from "./axios.site.config";

export interface IRegisterForm {
    name: string;
    surname: string;
    gender: any;
    email: string;
    password: string;
    confirmPassword: string;
    dateOfBirth: any;
    medicalID: string;
    phoneNumber: string;
}
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

export const registerPatient = (user: IRegisterForm) => {
    return api.http.post<ResponseEntity<IRegisterForm>>(
        `${window.origin}/api/registerNurse`,
        user
    );
}
