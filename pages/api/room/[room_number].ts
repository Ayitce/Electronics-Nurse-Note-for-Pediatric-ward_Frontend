import { csrf } from "@/lib/csrf";
import { api } from "@/services/axios.enp.core.config";

import { allowMethods } from "@/utils/nextApi";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    getRoomFromNumber(req, res).then(response => {
        res.status(response.status).json(response.data || [])
    }).catch((err) => {
        res.status(err.response?.status || 500).json(err.response?.data)
    })
}


export const getRoomFromNumber = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const session = await getServerSession(req, res, authOptions)
    api.setHandler(req, res)
    api.setBearerToken(session?.accessToken)

    console.log(req.query.room_number)


    return api.http.get(`/nurse/rooms/${req.query.room_number}`)
}

export default csrf(allowMethods(["GET"], handler))

export const config = {
    api: {
        externalResolver: true,
    },
}