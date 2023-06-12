import client from './client';
const getListings = (phone, password, type) =>
	client.get(`/getOrders.php?username=${phone}&password=${password}&status=${type}`);

export default {
	getListings,
};
