import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  RefreshControl,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";
import {
  StripeProvider,
  initPaymentSheet,
  presentPaymentSheet,
  useStripe,
} from "@stripe/stripe-react-native";
import { useNavigation } from "@react-navigation/native";

import BottomScreeenNavigation from "../partials/BottomScreeenNavigation";
import ScreenHeader from "../partials/ScreenHeader";
import apiInstance from "../../src/utils/axios";
import { stripe_pb_key } from "../../src/utils/constants";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const Checkout = ({ route }) => {
  const { checkout_id } = route.params;
  const navigation = useNavigation();
  const stripe_pb_key_val = stripe_pb_key;
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [coupon, setCoupon] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrder = async () => {
    setLoading(true);

    try {
      const response = await apiInstance.get(`order/checkout/${checkout_id}/`);
      setOrder(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  const fetchPaymentSheetParams = async () => {
    try {
      const json = {
        order_oid: checkout_id,
      };
      const response = await apiInstance.post(`payment/payment_sheet`, json);
      setPaymentIntentId(response.data.paymentIntentId);
      let paymentIntent = response.data.paymentIntent;
      let ephemeralKey = response.data.ephemeralKey;
      let customer = response.data.customer;
      let publishableKey = response.data.publishableKey;
      let merchantDisplayName = response.data.merchantDisplayName;

      return {
        paymentIntent,
        ephemeralKey,
        customer,
        publishableKey,
        merchantDisplayName,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const initializePaymentSheet = async () => {
    try {
      const {
        paymentIntent,
        ephemeralKey,
        customer,
        publishableKey,
        merchantDisplayName,
      } = await fetchPaymentSheetParams();
      const { error } = await initPaymentSheet({
        merchantDisplayName: merchantDisplayName,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: merchantDisplayName,
        },
      });

      if (!error) {
        // setLoading(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
      Alert.alert(`Error Code: ${error.code}`, error.message);
    } else {
      console.log(paymentIntentId);
      navigation.navigate("Success", {
        checkout_id: checkout_id,
        payment_intent_id: paymentIntentId,
      });
    }
  };

  useEffect(() => {
    initializePaymentSheet();
    fetchOrder();
  }, []);

  onReFresh = () => {
    fetchOrder();
  };

  const applyCoupon = async () => {
    try {
      alert("Applying Coupon...");
      const json = {
        order_oid: checkout_id,
        coupon_code: coupon,
      };

      const response = await apiInstance.post(`order/coupon-apply/`, json);
      fetchOrder();
      alert(response?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StripeProvider publishableKey={stripe_pb_key_val}>
      <View className="bg-white flex-1 px-3">
        <ScrollView
          vertical
          showsVerticalScrollIndicator={false}
          className="flex-1"
          refreshControl={
            <RefreshControl onRefresh={onReFresh} refreshing={refreshing} />
          }
        >
          <ScreenHeader title={"Checkout"} returnScreen={"Cart"} />

          {loading ? (
            <View>
              <ActivityIndicator size={"large"} color={"#280e49"} />
            </View>
          ) : (
            <>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {order?.order_items?.map((o) => (
                  <View
                    className="flex-row gap-2 pb-3 mr-3 bg-gray-200 p-2 rounded-md mb-3"
                    key={o.id}
                  >
                    <Image
                      source={{ uri: o?.course?.image }}
                      className="h-[100px] w-[100px] rounded-md object-cover"
                    />
                    <View>
                      <Text className="text-[18px] font-bold">
                        {o?.course?.title?.slice(0, 20)}...
                      </Text>
                      <Text className="text-[16px] font-normal mt-1">
                        100 ETB
                      </Text>
                    </View>
                  </View>
                ))}
              </ScrollView>

              <View className="flex flex-row gap-3 items-center">
                <TextInput
                  onChangeText={(val) => setCoupon(val)}
                  className="border-dashed border border-gray-500 rounded-md w-[78%] p-1"
                  placeholder="Coupon Code"
                />
                <TouchableOpacity
                  onPress={applyCoupon}
                  className="bg-[#280e49] flex-row justify-center p-3 rounded-md mt-2 w-[12%]"
                >
                  <FontAwesome5Icon name="check-circle" color={"#fff"} />
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>

        <View>
          <View className="bg-gray-200 p-2 rounded-md mt-2">
            <Text className="text-[18px] font-semibold mb-4">Summary</Text>
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-[15px] font-semibold">Sub-Total</Text>
              <Text className="text-[15px] font-normal">
                {order?.sub_total || "0.00"} ETB
              </Text>
            </View>

            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-[15px] font-semibold">Tax</Text>
              <Text className="text-[15px] font-normal">
                {order?.tax_fee || "0.00"} ETB
              </Text>
            </View>

            <View className="flex-row items-center justify-between mb-1 mt-2">
              <Text className="text-[17px] font-semibold">Total</Text>
              <Text className="text-[17px] font-normal">
                {order?.total || "0.00"} ETB
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={openPaymentSheet}
            className="bg-[#280e49] w-[100%] flex-row justify-center p-2 rounded-md mt-2"
          >
            <Text className="text-white">Pay With Stripe</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Nav */}
        <BottomScreeenNavigation />
      </View>
    </StripeProvider>
  );
};

export default Checkout;
