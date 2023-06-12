import { create } from 'apisauce';
import cache from '../utility/cache';
import settings from '../config/settings';
import axios from 'axios';
const api = create({
	baseURL: settings.apiUrl,
});

api.addRequestTransform((request) => {
	const { instance } = request.axiosInstance || {};
	if (instance) {
		instance.defaults.httpsAgent = new axios.defaults.https.Agent({
			rejectUnauthorized: false,
		});
	}
});

const get = async (url, params, axiosConfig) => {
	const response = await api.get(url, params, axiosConfig);
	if (response.ok) {
		cache.store(url, response.data);
		return response;
	}
	const data = await cache.get(url);
	return data ? { ok: true, data } : response;
};
const apiClient = { get };
export default apiClient;
