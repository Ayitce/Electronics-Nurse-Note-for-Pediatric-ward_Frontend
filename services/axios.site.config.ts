import Axios, { AxiosResponse, AxiosInstance } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next';

interface Api {
	http: AxiosInstance
	setBearerToken(token: string | null): void
	request?: NextApiRequest
	response?: NextApiResponse
	setHandler(req: NextApiRequest, res: NextApiResponse): void
}

export const api: Api = {
	http: Axios.create({
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
	(response: AxiosResponse) => response,
	(err) => {

		switch (err.response?.status) {
			case 401:
				// case 500:
				// const res = api.response
				// if (res) {
				// 	nookies.destroy({ res }, 'token', { path: '/' });
				// }
				// setTimeout(() => {
				// 	window.location.href = '/signin'
				// }, 1500)

				break;
		}
		return  Promise.reject(err)
		// return err
	}
)

api.http.interceptors.request.use(async (config) => {
	// if (!config) {
	// 	config = {}
	// }

	// if (!config.headers) {
	// 	config.headers = {}
	// }

	// console.log(">>> REQUESRET CORE >>> ", config)
	// const accessToken = Cookie.get('accessTokenTded')
	// if (accessToken) {
	//     config.headers['Authorization'] = `Bearer ${accessToken}`
	// }

	return config
})
