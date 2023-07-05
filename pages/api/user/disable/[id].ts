import { csrf } from "@/lib/csrf";
import { api } from "@/services/axios.enp.core.config";

import { allowMethods } from "@/utils/nextApi";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    disableUser(req, res).then(response => {
        res.status(response.status).json(response.data || [])
    }).catch((err) => {
        res.status(err.response?.status || 500).json(err.response?.data)
    })
}


export const disableUser = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const session = await getServerSession(req, res, authOptions)
    api.setHandler(req, res)
    api.setBearerToken(session?.accessToken)

    console.log(req.query.id)


    return api.http.post(`/admin/users/disable/${req.query.id}`)
}

export default csrf(allowMethods(["POST"], handler))

export const config = {
    api: {
        externalResolver: true,
    },
}