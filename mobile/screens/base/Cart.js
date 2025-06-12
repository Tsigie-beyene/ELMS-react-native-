import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import BottomScreeenNavigation from "../partials/BottomScreeenNavigation";
import { List } from "react-native-paper";
import ScreenHeader from "../partials/ScreenHeader";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiInstance from "../../src/utils/axios";
import useUserData from "../../src/plugin/useUserData";
const Cart = () => {
  const navigation = useNavigation();
  const [cart, setCart] = useState([]);
  const [cartStats, setCartStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartId, setCartId] = useState("");
  const user_id = useUserData();

  const fetchCartItems = async () => {
    const cart_id = await AsyncStorage.getItem("randomString");
    setCartId(cart_id);
    setLoading(true);
    try {
      const cart_response = await apiInstance.get(`cart/list/${cart_id}`);
      const cart_stats_response = await apiInstance.get(
        `cart/stats/${cart_id}`
      );

      setCart(cart_response.data);
      setCartStats(cart_stats_response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const deleteCartItem = async (cartId, itemId) => {
    const url = `cart/item-delete/${cartId}/${itemId}/`;
    await apiInstance.delete(url);
    fetchCartItems();
  };

  const createCartOrder = async () => {
    try {
      json = {
        cart_id: cartId,
        user_id: user_id,
      };
      const response = await apiInstance.post("order/create-order/", json);
      console.log(response.data.order_oid);
      navigation.navigate("Checkout", { checkout_id: response.data.order_oid });
    } catch (error) {}
  };

  return (
    <View className="bg-white flex-1 px-3">
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        <ScreenHeader title={"Cart"} returnScreen={"Home"} />
        {loading ? (
          <View>
            <ActivityIndicator size={"large"} color={"#280e49"} />
          </View>
        ) : (
          <View>
            {cart.map((c, index) => (
              <View
                className="flex-row gap-2 pb-3 w-full bg-gray-200 p-2 rounded-md mb-3"
                key={index}
              >
                <Image
                  source={{ uri: c?.course?.image }}
                  className="h-[100px] w-[100px] rounded-md object-cover"
                />
                <View>
                  <Text className="text-[18px] font-bold">
                    {c?.course?.title?.slice(0, 25)}...
                  </Text>
                  <Text className="text-[16px] font-normal mt-1">
                    {c?.price} ETB
                  </Text>
                  <TouchableOpacity
                    onPress={() => deleteCartItem(c?.cart_id, c?.id)}
                    className="bg-[#280e49] w-7 h-7 flex justify-center items-center rounded-md mt-2"
                  >
                    <FontAwesome5 name="trash" color={"white"} size={15} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {cart?.length < 1 && <Text className="mt-5 ml-4">Empty Cart</Text>}
          </View>
        )}
      </ScrollView>

      <View>
        <View className="bg-gray-200 p-2 rounded-md mt-2">
          <Text className="text-[18px] font-semibold mb-4">Summary</Text>
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-[15px] font-semibold">Sub-Total</Text>
            <Text className="text-[15px] font-normal">
              {cartStats?.price || "0.00"} ETB
            </Text>
          </View>

          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-[15px] font-semibold">Tax</Text>
            <Text className="text-[15px] font-normal">
              {cartStats?.tax || "0.00"} ETB
            </Text>
          </View>

          <View className="flex-row items-center justify-between mb-1 mt-2">
            <Text className="text-[17px] font-semibold">Total</Text>
            <Text className="text-[17px] font-normal">
              {cartStats?.total || "0.00"} ETB
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={createCartOrder}
          className="bg-[#280e49] w-[100%] flex-row justify-center p-2 rounded-md mt-2"
        >
          <Text className="text-white">Proceed To Checkout</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Nav */}
      <BottomScreeenNavigation />
    </View>
  );
};

export default Cart;
