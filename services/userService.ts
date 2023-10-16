import { ResponseEntity } from "./axios.enp.core.config";
import { api } from "./axios.site.config";

export interface IRegisterForm {
    name: string;
    surname: string;
    gender: any;
    email: string;
    password: string;
    confirmPassword: string;
    medicalID: string;
    phoneNumber: string;
}

export const registerNurse = (user: IRegisterForm) => {
    return api.http.post<ResponseEntity<IRegisterForm>>(
        `${window.origin}/api/register/nurse`,
        user
    );
}

export const registerDoctor = (user: IRegisterForm) => {
    return api.http.post<ResponseEntity<IRegisterForm>>(
        `${window.origin}/api/register/doctor`,
        user
    );
}

export interface IProfile {
    username: string;
    authorities: string[];
    nurse: object;
    doctor: object;
}
export const getProfile = () => {
    return api.http.get<ResponseEntity<IProfile>>(`${window.origin}/api/profile`)
}

export interface IUserForm {
    id: number;
    username: string;
    authorities: string[];
    enabled: boolean;
    nurse: {
        name: string;
        surname: string;
        phoneNumber: string;
        medicalID: string;
        gender: string;
    }
    doctor: {
        name: string;
        surname: string;
        phoneNumber: string;
        medicalID: string;
        gender: string;
    }
}
export const getAllUser = () => {
    return api.http.get<ResponseEntity<IUserForm>>(`${window.origin}/api/user/userList`)
}

export const disableUser = (id: string | number) => {
    return api.http.post<ResponseEntity<IUserForm>>(`${window.origin}/api/user/disable/${id}`)
}

export const getSearchedUser = (search: string) => {
    return api.http.get<ResponseEntity<IUserForm>>(`${window.origin}/api/user/search/${search}`)
}