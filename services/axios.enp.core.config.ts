import Axios, { AxiosResponse, AxiosInstance } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next';

interface Api {
	http: AxiosInstance
	setBearerToken(token: string | null | undefined): void
	request?: NextApiRequest
	response?: NextApiResponse
	setHandler(req: NextApiRequest, res: NextApiResponse): void
}

export const api: Api = {
	http: Axios.create({
		baseURL:
			process.env.NEXT_PUBLIC_CORE_URL_API
	}),
	setBearerToken(token) {
		this.http.defaults.headers.common["Authorization"] = `Bearer ${token}`
	},
	setHandler(req, res) {
		this.request = req;
		this.response = res;
	}
}

api.http.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	(err) => {


		return  Promise.reject(err)
	}
)

api.http.interceptors.request.use(async (config) => {
	

	return config
})


export interface ResponseEntity<T = any> {
    bedList: any;
    length: any;
    authorities: any;
	success: boolean
	data?: T
}