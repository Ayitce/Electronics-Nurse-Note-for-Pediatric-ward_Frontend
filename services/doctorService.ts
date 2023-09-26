import { ResponseEntity } from "./axios.enp.core.config";
import { api } from "./axios.site.config";

export interface IDoctor {
    id: number;
    name: string;
    surname: string;
    medicalID: string;
    phoneNumber: string;
    speciality: string;

}

export const getDoctorList = () => {
    return api.http.get<ResponseEntity<IDoctor>>(`${window.origin}/api/doctor`)
}

