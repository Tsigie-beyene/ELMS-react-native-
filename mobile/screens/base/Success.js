import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import BottomScreeenNavigation from "../partials/BottomScreeenNavigation";
import { List } from "react-native-paper";
import ScreenHeader from "../partials/ScreenHeader";
import { useNavigation } from "@react-navigation/native";
import apiInstance from "../../src/utils/axios";

const Success = ({ route }) => {
  const { checkout_id, payment_intent_id } = route.params;
  const navigation = useNavigation();
  const [orderResponse, setOrderResponse] = useState("Processing Payment");
  const [order, setOrder] = useState([]);

  console.log("Order Response:", orderResponse);

  const fetchOrder = async () => {
    try {
      const response = await apiInstance.post(`order/checkout/${checkout_id}`);
      setOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOrderPayment = async () => {
    setOrderResponse("Processing Payment");

    try {
      json = {
        payment_intent_id: payment_intent_id,
        order_oid: checkout_id,
        session_id: "null",
        paypal_order_id: "null",
      };

      const response = await apiInstance.post(`payment/payment-success/`, json);
      setOrderResponse(response.data.message);
    } catch (error) {
      console.log(error);
      setOrderResponse("Payment Failed");
    }
  };

  useEffect(() => {
    fetchOrder();
    verifyOrderPayment();
  }, []);

  return (
    <View className="bg-white flex-1 px-3">
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        <ScreenHeader
          title={orderResponse || "Pending"}
          returnScreen={"Home"}
        />

        {orderResponse === "Processing Payment" ? (
          <View className="flex-col items-center gap-2 pb-3 mr-2 bg-gray-200 p-2 rounded-md mb-3 mt-10">
            <FontAwesome5 name="check-circle" color={"#280e49"} size={105} />
            <View>
              <Text className="text-[18px] font-semibold text-center">
                {orderResponse}
              </Text>
              <TouchableOpacity className="bg-[#280e49] p-2 rounded-md mt-4">
                <Text className="text-white text-center">Go to dashboard</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text className="hidden">{orderResponse}</Text>
        )}

        {orderResponse === "Payment Successfull" ? (
          <View className="flex-col items-center gap-2 pb-3 mr-2 bg-gray-200 p-2 rounded-md mb-3 mt-10">
            <FontAwesome5 name="check-circle" color={"#280e49"} size={105} />
            <View>
              <Text className="text-[18px] font-semibold text-center">
                {orderResponse}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Dashboard")}
                className="bg-[#280e49] p-2 rounded-md mt-4"
              >
                <Text className="text-white text-center">Go to dashboard</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text className="hidden">{orderResponse}</Text>
        )}

        {orderResponse === "Already Paid" ? (
          <View className="flex-col items-center gap-2 pb-3 mr-2 bg-gray-200 p-2 rounded-md mb-3 mt-10">
            <FontAwesome5 name="check-circle" color={"#280e49"} size={105} />
            <View>
              <Text className="text-[18px] font-semibold text-center">
                {orderResponse}
              </Text>
              <Text className="text-[15px] mt-2 font-semibold text-center">
                You already paid!
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Dashboard")}
                className="bg-[#280e49] p-2 rounded-md mt-4"
              >
                <Text className="text-white text-center">Go to dashboard</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text className="hidden">{orderResponse}</Text>
        )}

        {orderResponse === "Payment Failed" ? (
          <View className="flex-col items-center gap-2 pb-3 mr-2 bg-gray-200 p-2 rounded-md mb-3 mt-10">
            <FontAwesome5 name="ban" color={"#280e49"} size={105} />
            <View>
              <Text className="text-[18px] font-semibold text-center">
                {orderResponse}
              </Text>
              <Text className="text-[15px] mt-2 font-semibold text-center">
                Try again later
              </Text>
            </View>
          </View>
        ) : (
          <Text className="hidden">{orderResponse}</Text>
        )}
      </ScrollView>

      {/* Bottom Nav */}
      <BottomScreeenNavigation />
    </View>
  );
};

export default Success;
