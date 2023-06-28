import { ResponseEntity } from "./axios.enp.core.config";
import { api } from "./axios.site.config";

export interface IRoom {
    id: number;
    bedList: [{
        id: number;
        isAvailable: Boolean;
    }];
}

export const getRoomList = () => {
    return api.http.get<ResponseEntity<IRoom>>(`${window.origin}/api/room`)
}


export const getRoom = (room_number: string) => {
    return api.http.get<ResponseEntity<IRoom>>(`${window.origin}/api/room/${room_number}`)
}