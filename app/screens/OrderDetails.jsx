import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
	Image,
	Modal,
	RefreshControl,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableHighlight,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import Toast from 'react-native-root-toast';

import getOrder from '../api/getOrder';
import useAuth from '../auth/useAuth';
import ActivityIndicator from '../components/ActivtyIndectors/ActivityIndecatorOrderDetails';
import ListItemOrderDetail from '../components/ListItemOrderDetail';
import StatusBottm from '../components/StatusBottom';
import TrackingBox from '../components/TrackingBox';
import colors from '../config/colors';
import Routes from '../Routes';
import AppPickerReasons from './../components/AppPickerReasons';
function successToast() {
	Toast.show('تم تحديث الحالة', {
		duration: 3000,
		shadow: true,
		animation: true,
		hideOnPress: true,
		backgroundColor: colors.success,
		textColor: colors.white,
	});
}
function errorToast() {
	Toast.show('خطأ!', {
		duration: 3000,
		shadow: true,
		animation: true,
		hideOnPress: true,
		backgroundColor: colors.returned,
		textColor: colors.white,
	});
}
const OrderDetails = () => {
	const returnCases = [
		{ value: 'لايرد', label: 'لايرد' },
		{ value: 'لايرد مع رسالة', label: 'لايرد مع رسالة' },
		{ value: 'تم اغلاق الهاتف', label: 'تم اغلاق الهاتف' },
		{ value: 'مكرر', label: 'مكرر' },
		{ value: 'كاذب', label: 'كاذب' },
		{ value: 'الرقم غير معرف', label: 'الرقم غير معرف' },
		{ value: 'رفض الطلب', label: 'رفض الطلب' },
		{ value: 'حظر المندوب', label: 'حظر المندوب' },
		{ value: 'لايرد بعد التاجيل', label: 'لايرد بعد التاجيل' },
		{ value: 'مسافر', label: 'مسافر' },
		{ value: 'تالف', label: 'تالف' },
		{ value: 'راجع بسبب الحظر', label: 'راجع بسبب الحظر' },
		{ value: 'لايمكن الاتصال به', label: 'لايمكن الاتصال به' },
		{ value: 'مغلق بعد الاتفاق', label: 'مغلق بعد الاتفاق' },
		{ value: 'لم يطلب', label: 'لم يطلب' },
		{ value: 'لايرد بعد سماع المكالمة', label: 'لايرد بعد سماع المكالمة' },
		{ value: 'غلق بعد سماع المكالمة', label: 'غلق بعد سماع المكالمة' },
		{ value: 'مغلق', label: 'مغلق' },
		{ value: 'تم الوصول والرفض', label: 'تم الوصول والرفض' },
		{ value: 'لايرد بعد الاتفاق', label: 'لايرد بعد الاتفاق' },
		{ value: 'غير داخل بالخدمة', label: 'غير داخل بالخدمة' },
		{ value: 'خطأ بالعنوان', label: 'خطأ بالعنوان' },
		{ value: 'مستلم سابقا', label: 'مستلم سابقا' },
		{ value: 'خطأ بالتجهيز', label: 'خطأ بالتجهيز' },
		{ value: 'نقص رقم', label: 'نقص رقم' },
		{ value: 'زيادة رقم', label: 'زيادة رقم' },
		{ value: 'وصل بدون طلبية', label: 'وصل بدون طلبية' },
		{ value: 'الغاء الحجز', label: 'الغاء الحجز' },
	];
	const route = useRoute();
	let { user } = useAuth();
	const [isLoading, setIsLoading] = useState(true);
	const [order, setOrder] = useState(null);
	const navigation = useNavigation();
	const [amount, onChangeAmount] = useState('0');
	const [note, onChangeNote] = useState('');
	const [returnNo, onChangeReturnNo] = useState('');
	const [refreshing, setRefreshing] = useState(false);
	const [modalVisible, setModalVisible] = useState({
		arrive: false,
		return: false,
		partReturn: false,
		exchange: false,
		postpone: false,
	});

	const loadDetails = async (token, id, notificatin_id = '0') => {
		setIsLoading(true);
		const results = await getOrder.getOrder(token, id, notificatin_id);
		setOrder(results.data.data[0]);
		onChangeAmount(results.data.data[0].price);
		setIsLoading(false);
	};

	const arrive = async () => {
		try {
			setIsLoading(true);
			const results = await getOrder.arrive(user.token, route.params.id, amount, note);
			console.log(results);
			results.data.success === 1 ? successToast() : errorToast();
			loadDetails(user.token, route.params.id);
		} catch (e) {
			errorToast();
		}
	};
	const returned = async () => {
		try {
			setIsLoading(true);
			const results = await getOrder.returned(user.token, route.params.id, note.label);
			results.data.success === 1 ? successToast() : errorToast();
			loadDetails(user.token, route.params.id);
		} catch (e) {
			errorToast();
		}
	};
	const partReturn = async () => {
		try {
			setIsLoading(true);
			const results = await getOrder.partReturn(user.token, route.params.id, amount, note, returnNo);
			results.data.success === 1 ? successToast() : errorToast();
			loadDetails(user.token, route.params.id);
		} catch (e) {
			errorToast();
		}
	};

	const exchange = async () => {
		try {
			setIsLoading(true);
			const results = await getOrder.exchange(user.token, route.params.id, amount, note, returnNo);
			results.data.success === 1 ? successToast() : errorToast();
			loadDetails(user.token, route.params.id);
		} catch (e) {
			errorToast();
		}
	};

	const postponed = async () => {
		try {
			setIsLoading(true);
			const results = await getOrder.postponed(user.token, route.params.id, note);
			results.data.success === 1 ? successToast() : errorToast();
			loadDetails(user.token, route.params.id);
		} catch (e) {
			errorToast();
		}
	};
	useEffect(() => {
		loadDetails(user.token, route.params.id, route.params.notify_id);
	}, []);
	const handelColor = id => {
		switch (id) {
			case '4':
				return colors.success;
			case '5':
				return colors.secondery;
			case '6':
				return colors.primery;
			case '7':
				return colors.pause;
			case '8':
				return colors.returned;
			case '9':
				return colors.returned;
			case '13':
				return colors.unseen;
			default:
				return colors.medium;
		}
	};
	const startChating = item => {
		navigation.navigate(Routes.CHAT_MODEL, { item: item });
	};
	const onRefresh = () => {
		setRefreshing(true);
		loadDetails(user.token, route.params.id, '');
		setRefreshing(false);
	};
	return (
		<ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
			<View style={{ flex: 1, marginBottom: 10, paddingBottom: 5 }}>
				{order ? (
					<View style={{ flex: 1, marginBottom: 10, paddingBottom: 5 }}>
						<View style={styles.orderDetailsContainer}>
							<View style={{ width: '100%', height: '20%' }}>
								<View style={styles.headerDetails}>
									<View
										style={[
											styles.titleOrderStatusView,
											{ backgroundColor: handelColor(order.order_status_id) },
										]}>
										<Text style={styles.titleOrderStatus}>{order.order_status}</Text>
									</View>
									<TouchableWithoutFeedback onPress={() => startChating(order)}>
										<View style={styles.chatShadow}>
											<Image
												style={styles.chatIcon}
												source={require('./../assets/icons/chatIcon.png')}
											/>
										</View>
									</TouchableWithoutFeedback>
									<Text style={styles.titleOrderId}>{order.order_no}</Text>
								</View>
							</View>
							<View style={styles.textContainer}>
								<ListItemOrderDetail
									caption="أسم المحل"
									details={order.store_name}
									order={order}
								/>
								<ListItemOrderDetail caption="أسم الزبون" details={order.customer_name} />
								<ListItemOrderDetail
									onPress={true}
									caption="هاتف الزبون"
									details={order.customer_phone}
									order={order}
								/>
								{order.address ? (
									<ListItemOrderDetail
										caption="عنوان الزبون"
										details={`${order.city} - ${order.town} - ${order.address}`}
									/>
								) : (
									<ListItemOrderDetail
										caption="عنوان الزبون"
										details={`${order.city} - ${order.town}`}
									/>
								)}
								{order.dev_price && (
									<ListItemOrderDetail caption="سعر التوصيل" details={order.dev_price} />
								)}
								{order.client_price && (
									<ListItemOrderDetail
										caption="السعر الصافي"
										details={order.client_price}
									/>
								)}
								{order.price && (
									<ListItemOrderDetail caption="مبلغ الوصل" details={order.price} />
								)}
								{order.new_price && (
									<ListItemOrderDetail caption="المبلغ المستلم" details={order.new_price} />
								)}
								{order.driver_name && (
									<ListItemOrderDetail caption="أسم العميل" details={order.client_name} />
								)}
								{order.client_phone && (
									<ListItemOrderDetail
										onPress={true}
										caption="هاتف العميل"
										details={order.client_phone}
										order={order}
									/>
								)}
								{order.money_status && (
									<ListItemOrderDetail
										caption="تم التحاسب؟"
										details={order.money_status === '1' ? 'نعم' : 'كلا'}
									/>
								)}
							</View>
						</View>
						{/* ---------626802-------------- */}
						{order.driver_invoice_id === '0' && order.invoice_id == '0' && (
							<View
								style={{
									backgroundColor: colors.white,
									width: '100%',
									height: 170,
									alignSelf: 'center',
									borderRadius: 1,
									elevation: 10,
								}}>
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-around',
									}}>
									<StatusBottm
										color="returned"
										title="راجع كلي"
										onPress={() => setModalVisible({ ...modalVisible, return: true })}
									/>
									<StatusBottm
										color="partially"
										title="راجع جزئي"
										onPress={() => setModalVisible({ ...modalVisible, partReturn: true })}
									/>
									<StatusBottm
										color="success"
										title="واصل"
										onPress={() => setModalVisible({ ...modalVisible, arrive: true })}
									/>
								</View>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'center',
									}}>
									<StatusBottm
										color="secondery"
										title="استبدال"
										onPress={() => setModalVisible({ ...modalVisible, exchange: true })}
									/>
									<StatusBottm
										color="pause"
										title="مؤجل"
										onPress={() => setModalVisible({ ...modalVisible, postpone: true })}
									/>
								</View>
							</View>
						)}
						<ScrollView>
							{order.tracking.map(item => (
								<TrackingBox
									key={`${item.order_status_id}${Date.now() + Math.random()}`}
									bgColor={handelColor(item.order_status_id)}
									item={item}
								/>
							))}
							{/* -----arrive-------- */}
							<Modal
								animationType="slide"
								transparent={true}
								visible={modalVisible.arrive}
								onRequestClose={() => {
									Alert.alert('Modal has been closed.');
								}}>
								<View
									style={styles.centeredView}
									onPress={() => console.log('model pressed cencel')}>
									<View style={styles.modalView}>
										<Text style={styles.modalText}>تأكيد التوصيل:</Text>
										<View
											style={{
												flexDirection: 'row',
												alignItems: 'center',
												width: '100%',
											}}>
											<TextInputMask
												type={'money'}
												options={{
													precision: 0,
													separator: '.',
													delimiter: ',',
													unit: '',
												}}
												style={{
													height: 40,
													borderColor: 'gray',
													borderBottomWidth: 1,
													width: '70%',
													marginBottom: 10,
													backgroundColor: colors.lightGreen,
													textAlign: 'right',
												}}
												onChangeText={text => onChangeAmount(text)}
												value={amount}
											/>

											<Text style={{ textAlign: 'right', width: '30%' }}>
												المبلغ المستلم :
											</Text>
										</View>
										<View
											style={{
												flexDirection: 'row',
												alignItems: 'center',
												width: '100%',
											}}>
											<TextInput
												style={{
													height: 40,
													borderColor: 'gray',
													borderBottomWidth: 1,
													width: '70%',
													marginBottom: 10,
													backgroundColor: colors.lightGreen,
													textAlign: 'right',
												}}
												onChangeText={text => onChangeNote(text)}
												value={note}
											/>
											<Text style={{ textAlign: 'right', width: '30%' }}>ملاحظة:</Text>
										</View>
										<View
											style={{
												flexDirection: 'row-reverse',
												justifyContent: 'space-around',
												alignItems: 'center',
											}}>
											<TouchableHighlight
												style={{
													...styles.openButton,
													backgroundColor: '#2196F3',
												}}
												onPress={() => {
													arrive();
													setModalVisible({
														...modalVisible,
														arrive: !modalVisible.arrive,
													});
												}}>
												<Text style={styles.textStyle}>تأكيد</Text>
											</TouchableHighlight>
											<TouchableHighlight
												style={{
													...styles.openButton,
													backgroundColor: colors.light,
													borderWidth: 1,
												}}
												onPress={() => {
													setModalVisible({
														...modalVisible,
														arrive: !modalVisible.arrive,
													});
												}}>
												<Text style={{ color: colors.black, alignSelf: 'center' }}>
													ألغاء
												</Text>
											</TouchableHighlight>
										</View>
									</View>
								</View>
							</Modal>
							{/* -----return-------- */}
							<Modal
								animationType="slide"
								transparent={true}
								visible={modalVisible.return}
								onRequestClose={() => {
									Alert.alert('Modal has been closed.');
								}}>
								<View
									style={styles.centeredView}
									onPress={() => console.log('model pressed cencel')}>
									<View style={styles.modalView}>
										<Text style={styles.modalText}>راجع كلي:</Text>
										<View
											style={{
												flexDirection: 'row',
												justifyContent: 'space-around',
												alignItems: 'center',
											}}>
											<View
												style={{
													width: '60%',
												}}>
												<AppPickerReasons
													items={returnCases}
													onSelectItem={item => onChangeNote(item)}
													selectedItem={note}
													backgroundColor={colors.white}
													icon="crosshairs-gps"
												/>
											</View>
										</View>
										<View
											style={{
												flexDirection: 'row-reverse',
												justifyContent: 'space-around',
												alignItems: 'center',
											}}>
											<TouchableHighlight
												style={{
													...styles.openButton,
													backgroundColor: '#2196F3',
												}}
												onPress={() => {
													returned();
													setModalVisible({
														...modalVisible,
														return: !modalVisible.return,
													});
												}}>
												<Text style={styles.textStyle}>تأكيد</Text>
											</TouchableHighlight>
											<TouchableHighlight
												style={{
													...styles.openButton,
													backgroundColor: colors.light,
												}}
												onPress={() => {
													setModalVisible({
														...modalVisible,
														return: !modalVisible.return,
													});
												}}>
												<Text style={{ color: colors.black, alignSelf: 'center' }}>
													ألغاء
												</Text>
											</TouchableHighlight>
										</View>
									</View>
								</View>
							</Modal>
							{/* -----partreturn-------- */}
							<Modal animationType="slide" transparent={true} visible={modalVisible.partReturn}>
								<View
									style={styles.centeredView}
									onPress={() => console.log('model pressed cencel')}>
									<View style={styles.modalView}>
										<Text style={styles.modalText}>راجع جزئي</Text>
										<View
											style={{
												flexDirection: 'row',
												justifyContent: 'space-around',
												alignItems: 'center',
											}}>
											<TextInputMask
												type={'money'}
												options={{
													precision: 0,
													separator: '.',
													delimiter: ',',
													unit: '',
												}}
												style={{
													height: 40,
													borderColor: 'gray',
													borderBottomWidth: 1,
													width: '70%',
													marginBottom: 10,
													backgroundColor: colors.lightGreen,
													textAlign: 'right',
												}}
												onChangeText={text => onChangeAmount(text)}
												value={amount}
											/>
											<Text style={{ textAlign: 'right', width: '30%' }}>
												المبلغ المستلم :
											</Text>
										</View>
										<View
											style={{
												flexDirection: 'row',
												justifyContent: 'space-around',
												alignItems: 'center',
											}}>
											<TextInput
												style={{
													height: 40,
													borderColor: 'gray',
													borderBottomWidth: 1,
													width: '70%',
													marginBottom: 10,
													backgroundColor: colors.lightGreen,
													textAlign: 'right',
												}}
												onChangeText={text => onChangeNote(text)}
												value={note}
											/>
											<Text style={{ textAlign: 'right', width: '30%' }}> ملاحظة:</Text>
										</View>
										<View
											style={{
												flexDirection: 'row',
												justifyContent: 'space-around',
												alignItems: 'center',
											}}>
											<TextInput
												style={{
													height: 40,
													borderColor: 'gray',
													borderBottomWidth: 1,
													width: '70%',
													marginBottom: 10,
													backgroundColor: colors.lightGreen,
													textAlign: 'right',
												}}
												onChangeText={text => onChangeReturnNo(text)}
												value={returnNo}
											/>
											<Text style={{ textAlign: 'right', width: '30%' }}>
												عدد الرواجع:
											</Text>
										</View>
										<View
											style={{
												flexDirection: 'row-reverse',
												justifyContent: 'space-around',
												alignItems: 'center',
											}}>
											<TouchableHighlight
												style={{
													...styles.openButton,
													backgroundColor: '#2196F3',
												}}
												onPress={() => {
													partReturn();
													setModalVisible({
														...modalVisible,
														partReturn: !modalVisible.partReturn,
													});
												}}>
												<Text style={styles.textStyle}>تأكيد</Text>
											</TouchableHighlight>
											<TouchableHighlight
												style={{
													...styles.openButton,
													backgroundColor: colors.light,
													borderWidth: 1,
												}}
												onPress={() => {
													setModalVisible({
														...modalVisible,
														partReturn: !modalVisible.partReturn,
													});
												}}>
												<Text style={{ color: colors.black, alignSelf: 'center' }}>
													ألغاء
												</Text>
											</TouchableHighlight>
										</View>
									</View>
								</View>
							</Modal>
							{/* -----exchange-------- */}
							<Modal
								animationType="slide"
								transparent={true}
								visible={modalVisible.exchange}
								onRequestClose={() => {
									Alert.alert('Modal has been closed.');
								}}>
								<View
									style={styles.centeredView}
									onPress={() => console.log('model pressed cencel')}>
									<View style={styles.modalView}>
										<Text style={styles.modalText}>أستبدال</Text>
										<View
											style={{
												flexDirection: 'row',
												justifyContent: 'space-around',
												alignItems: 'center',
											}}>
											<TextInputMask
												type={'money'}
												options={{
													precision: 0,
													separator: '.',
													delimiter: ',',
													unit: '',
												}}
												style={{
													height: 40,
													borderColor: 'gray',
													borderBottomWidth: 1,
													width: '70%',
													marginBottom: 10,
													backgroundColor: colors.lightGreen,
													textAlign: 'right',
												}}
												onChangeText={text => onChangeAmount(text)}
												value={amount}
											/>
											<Text style={{ textAlign: 'right', width: '30%' }}>
												المبلغ المستلم :
											</Text>
										</View>
										<View
											style={{
												flexDirection: 'row',
												justifyContent: 'space-around',
												alignItems: 'center',
											}}>
											<TextInput
												style={{
													height: 40,
													borderColor: 'gray',
													borderBottomWidth: 1,
													width: '70%',
													marginBottom: 10,
													backgroundColor: colors.lightGreen,
													textAlign: 'right',
												}}
												onChangeText={text => onChangeNote(text)}
												value={note}
											/>
											<Text style={{ textAlign: 'right', width: '30%' }}> ملاحظة:</Text>
										</View>
										<View
											style={{
												flexDirection: 'row',
												justifyContent: 'space-around',
												alignItems: 'center',
											}}>
											<TextInput
												style={{
													height: 40,
													borderColor: 'gray',
													borderBottomWidth: 1,
													width: '70%',
													marginBottom: 10,
													backgroundColor: colors.lightGreen,
													textAlign: 'right',
												}}
												onChangeText={text => onChangeReturnNo(text)}
												value={returnNo}
											/>
											<Text style={{ textAlign: 'right', width: '30%' }}>
												عدد القطع:
											</Text>
										</View>
										<View
											style={{
												flexDirection: 'row-reverse',
												justifyContent: 'space-around',
												alignItems: 'center',
											}}>
											<TouchableHighlight
												style={{
													...styles.openButton,
													backgroundColor: '#2196F3',
												}}
												onPress={() => {
													exchange();
													setModalVisible({
														...modalVisible,
														exchange: !modalVisible.exchange,
													});
												}}>
												<Text style={styles.textStyle}>تأكيد</Text>
											</TouchableHighlight>
											<TouchableHighlight
												style={{
													...styles.openButton,
													backgroundColor: colors.light,
													borderWidth: 1,
												}}
												onPress={() => {
													setModalVisible({
														...modalVisible,
														exchange: !modalVisible.exchange,
													});
												}}>
												<Text style={{ color: colors.black, alignSelf: 'center' }}>
													ألغاء
												</Text>
											</TouchableHighlight>
										</View>
									</View>
								</View>
							</Modal>
							{/* -----postpone-------- */}
							<Modal
								animationType="slide"
								transparent={true}
								visible={modalVisible.postpone}
								onRequestClose={() => {
									Alert.alert('Modal has been closed.');
								}}>
								<View
									style={styles.centeredView}
									onPress={() => console.log('model pressed cencel')}>
									<View style={styles.modalView}>
										<Text style={styles.modalText}> تأجيل:</Text>
										<View
											style={{
												flexDirection: 'row',
												justifyContent: 'space-around',
												alignItems: 'center',
											}}>
											<View
												style={{
													flexDirection: 'row',
													justifyContent: 'space-around',
													alignItems: 'center',
												}}>
												<TextInput
													style={{
														height: 40,
														borderColor: 'gray',
														borderBottomWidth: 1,
														width: '70%',
														marginBottom: 10,
														backgroundColor: colors.lightGreen,
														textAlign: 'right',
													}}
													onChangeText={text => onChangeNote(text)}
													value={note}
												/>
												<Text style={{ textAlign: 'right', width: '30%' }}>
													{' '}
													ملاحظة:
												</Text>
											</View>
										</View>
										<View
											style={{
												flexDirection: 'row-reverse',
												justifyContent: 'space-around',
												alignItems: 'center',
											}}>
											<TouchableHighlight
												style={{
													...styles.openButton,
													backgroundColor: '#2196F3',
												}}
												onPress={() => {
													postponed();
													setModalVisible({
														...modalVisible,
														postpone: !modalVisible.postpone,
													});
												}}>
												<Text style={styles.textStyle}>تأكيد</Text>
											</TouchableHighlight>
											<TouchableHighlight
												style={{
													...styles.openButton,
													backgroundColor: colors.light,
													borderWidth: 1,
												}}
												onPress={() => {
													setModalVisible({
														...modalVisible,
														postpone: !modalVisible.postpone,
													});
												}}>
												<Text style={{ color: colors.black, alignSelf: 'center' }}>
													ألغاء
												</Text>
											</TouchableHighlight>
										</View>
									</View>
								</View>
							</Modal>
						</ScrollView>
					</View>
				) : (
					<ActivityIndicator visable={isLoading} />
				)}
			</View>
		</ScrollView>
	);
};

export default OrderDetails;

const styles = StyleSheet.create({
	centeredView: {
		backgroundColor: colors.primery,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 5,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	openButton: {
		backgroundColor: '#F194FF',
		borderRadius: 5,
		padding: 10,
		marginHorizontal: 10,
		elevation: 2,
		width: 70,
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
	headerDetails: {
		width: '90%',
		height: '100%',
		alignItems: 'center',
		alignSelf: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		borderBottomColor: colors.primery,
		borderBottomWidth: 2,
		marginBottom: 5,
	},
	container: {
		backgroundColor: colors.white,
		width: '100%',
		height: '100%',
	},
	orderDetailsContainer: {
		backgroundColor: colors.white,
		width: '100%',
		height: 300,
		marginBottom: 10,
		paddingBottom: 5,
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		elevation: 5,
	},
	textContainer: {
		width: '100%',
		height: '60%',
		marginRight: '10%',
		marginBottom: '5%',
		flexDirection: 'column',
	},

	chatShadow: {
		width: 70,
		height: 70,
		borderRadius: 10,
		padding: 10,
		margin: 5,
	},
	chatIcon: {
		width: '90%',
		height: '90%',
		padding: 5,
		borderRadius: 10,
	},
	titleStore: {
		fontSize: 22,
		paddingTop: 5,
	},
	titleOrderId: {
		fontSize: 22,
	},
	titleOrderStatus: {
		color: 'white',
		fontFamily: 'app_b',
	},
	titleOrderStatusView: {
		backgroundColor: colors.primery,
		padding: 10,
		borderRadius: 2,
		margin: 5,
	},
	contanerBox: {
		height: '100%',
		width: '100%',
		flexDirection: 'row-reverse',
		justifyContent: 'space-around',
		margin: 5,
	},
	trackingTitle: {
		color: '#39C555',
		fontWeight: 'bold',
		fontSize: 14,
		paddingBottom: 10,
	},
	trackingNote: {
		color: colors.medium,
		fontSize: 12,
	},
});
