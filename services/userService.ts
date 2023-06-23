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

export const registerPatient = (user: IRegisterForm) => {
    return api.http.post<ResponseEntity<IRegisterForm>>(
        `${window.origin}/api/registerNurse`,
        user
    );
}
