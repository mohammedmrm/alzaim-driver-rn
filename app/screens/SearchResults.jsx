import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import ActivityIndecatorLoadingList from "./../components/ActivtyIndectors/ActivityIndecatorLoadingList";
import {
  OrderCard,
  ListItemSeparator,
  ListOrderCopyAction,
} from "../components/lists";
import AppFormField from "../components/AppTextInput";
import AppPickerCity from "./../components/AppPickerCites";
import Button from "./../components/AppButton";
import useAuth from "../auth/useAuth";
import getCities from "../api/getCities";
import getStores from "../api/getStores";
import getStatues from "../api/getStatues";
import getOrders from "../api/getOrders";
import colors from "../config/colors";
import { handleCopy } from "../utility/helper";
import Constants from "expo-constants";
//-------------------------------------------------------------------------
function Dashboard() {
  let { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState(null);
  const [stores, setStores] = useState([]);
  const [store, setStore] = useState(null);
  const [statues, setStatues] = useState([]);
  const [status, setStatus] = useState(null);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [noOrders, setNoOrders] = useState("0");
  const [page, setPage] = useState("1");

  const prefix = "SearchResults";

  const loadOrders = async (nextPage) => {
    const results = await getOrders.getOrders(
      user.token,
      status ? status.id : null,
      city ? city.id : null,
      store ? store.id : null,
      search ? search : null,
      nextPage
    );
    if (!results.ok || results.data.success === "0") {
      return setIsLoading(false);
    }
    setPage(results.data.nextPage);

    if (nextPage === "1") {
      setNoOrders(results.data.orders);
      setOrders(results.data.data);
      console.log(orders);
      return setIsLoading(false);
    }
    setOrders([...orders, ...results.data.data]);
    console.log(orders);
    setIsLoading(false);
  };

  const loadCities = async () => {
    const results = await getCities.getCities(user.token);
    if (!results.ok) return;
    const array = [
      {
        name: "الكل",
        id: "",
      },
    ];
    setCities([...array, ...results.data.data]);
  };
  const loadStores = async () => {
    const results = await getStores.getStores(user.token);
    if (!results.ok) return;
    const array = [
      {
        name: "الكل",
        id: "",
      },
    ];
    setStores([...array, ...results.data.data]);
  };
  const loadStatues = async () => {
    const results = await getStatues.getStatues(user.token);
    if (!results.ok) return;
    const array = [
      {
        name: "الكل",
        id: "",
      },
    ];
    setStatues([...array, ...results.data.data]);
  };
  const onEndReachedMohamed = () => {
    setIsLoading(true);
    loadOrders(page);
  };
  const refreshingMethod = () => {
    setRefreshing(true);
    loadOrders("1");
    setRefreshing(false);
  };
  const footer = () => {
    return (
      <View
        style={{
          flex: 1,
          height: 300,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading && <ActivityIndecatorLoadingList visable={isLoading} />}
      </View>
    );
  };
  useEffect(() => {
    setIsLoading(true);
    loadCities();
    loadStores();
    loadStatues();
    loadOrders("1");
    setIsLoading(false);
  }, []);
  return (
    <View style={{ paddingTop: Constants.statusBarHeight, flex: 1 }}>
      <AppFormField
        rightIcon="table-search"
        autoCapitalize="none"
        autoCorrect={true}
        onChangeText={(x) => setSearch(x)}
        placeholder="بحث رقم الوصل او رقم الهاتف..."
      />
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
          backgroundColor: colors.white,
          paddingHorizontal: 0,
        }}
      >
        <View style={{ width: "44%", marginHorizontal: 2 }}>
          <AppPickerCity
            items={cities}
            placeholder={city ? city : "المحافظة"}
            name="city"
            onSelectItem={(item) => setCity(item)}
            selectedItem={city}
            icon="city"
            backgroundColor={colors.white}
            color={colors.white}
          />
        </View>
        <View style={{ width: "44%", marginHorizontal: 2 }}>
          <AppPickerCity
            placeholder="الحالة"
            name="town"
            items={statues}
            onSelectItem={(item) => setStatus(item)}
            selectedItem={status}
            backgroundColor={colors.white}
            icon="crosshairs-gps"
          />
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          width: "100%",
          borderBottomColor: colors.black,
          borderBottomWidth: 2,
          backgroundColor: colors.white,
        }}
      >
        <Button
          width="95%"
          color="primery"
          textColor={colors.light}
          onPress={() => {
            setIsLoading(true);
            loadOrders("1");
          }}
          title={`أبحث في (${noOrders}) طلبية`}
        />
      </View>
      <FlatList
        style={{ flex: 1, width: "100%" }}
        data={orders}
        keyExtractor={(item) => `${item.id}-${prefix}`.toString()}
        renderItem={({ item }) => (
          <OrderCard
            item={item}
            renderRightActions={() => (
              <ListOrderCopyAction
                icon="content-copy"
                onPress={() => handleCopy(item)}
              />
            )}
            renderLeftActions={() => (
              <ListOrderCopyAction
                icon="content-copy"
                onPress={() => handleCopy(item)}
              />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        onEndReachedThreshold={0.5}
        onEndReached={() => onEndReachedMohamed()}
        refreshing={refreshing}
        onRefresh={() => refreshingMethod()}
        ListFooterComponent={footer}
      />
    </View>
  );
}
export default Dashboard;
