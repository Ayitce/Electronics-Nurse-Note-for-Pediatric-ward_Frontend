import { csrf } from "@/lib/csrf";
import { allowMethods } from "@/utils/nextApi";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios"
import querystring from "querystring"

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {

    const mes = JSON.stringify(req.body)
    console.log(mes)
    const responseLineNotify = await axios({
        method: 'post',
        url: 'https://notify-api.line.me/api/notify',
        headers: {
            'Authorization': 'Bearer ' + '7o1RPymyVlprbv3ShuLYogpsey55rgUbKYEjRPmValU',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*',
        },
        data: querystring.stringify({
            message: req.body.message,
        })
    })
    res.status(200).end
}

export default csrf(allowMethods(["POST"], handler))