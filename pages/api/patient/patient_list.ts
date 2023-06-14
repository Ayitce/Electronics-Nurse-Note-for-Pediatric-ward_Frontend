import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function getPatientList(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const response = await axios.get("http://localhost:8080/patients")
   // console.log("response: ", response)
    res.status(200).json(response.data)
}
 