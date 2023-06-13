import client from './client';

const getOrder = (token, id, nofiy_id) => {
	let url = `/getOrder.php?token=${token}&orderid=${id}`;
	if (nofiy_id) url += `&notification_id=${nofiy_id}`;
	return client.get(url);
};
const config = {
	onUploadProgress: progressEvent => console.log(progressEvent),
};
const arrive = (token, id, price, note) => {
	let url = `/recived.php?token=${token}&orderid=${id}`;
	if (note) url += `&note=${note}`;
	if (price) url += `&price=${price}`;
	return client.post(url);
};
const returned = (token, id, note) => {
	let url = `/returned.php?token=${token}&orderid=${id}`;
	if (note) url += `&note=${note}`;
	return client.post(url);
};
const postponed = (token, id, note) => {
	let url = `/postponded.php?token=${token}&orderid=${id}`;
	if (note) url += `&note=${note}`;
	return client.post(url);
};
const partReturn = (token, id, price, note, no) => {
	let url = `/partialyReturned.php?token=${token}&orderid=${id}`;
	if (note) url += `&note=${note}`;
	if (price) url += `&price=${price}`;
	if (no) url += `&items_no=${no}`;
	return client.post(url);
};
const exchange = (token, id, price, note, no) => {
	let url = `/replace.php?token=${token}&orderid=${id}`;
	if (note) url += `&note=${note}`;
	if (price) url += `&price=${price}`;
	if (no) url += `&items_no=${no}`;
	return client.post(url);
};
const orderService = {
	getOrder,
	arrive,
	returned,
	partReturn,
	exchange,
	postponed,
};
export default orderService;
