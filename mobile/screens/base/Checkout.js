import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { Avatar1 } from "../../assets/image";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import BottomScreeenNavigation from "../partials/BottomScreeenNavigation";
import { List } from "react-native-paper";
import ScreenHeader from "../partials/ScreenHeader";
import { useNavigation } from "@react-navigation/native";

const Checkout = () => {
  const [Courses, setCourses] = useState([1, 2, 3, 4, 5]);
  const navigation = useNavigation();

  return (
    <View className="flex-1 px-3 bg-white">
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        <ScreenHeader title={"Checkout"} returnScreen={"Cart"} />
        <ScrollView horizontal showsVerticalScrollIndicator={false}>
            {Courses.map((c, index) => (
          <View
            className="flex-row gap-2 p-2 pb-3 mb-3 mr-2 bg-gray-200 rounded-md"
            key={index}
          >
            <Image
              source={Avatar1}
              className="h-[100px] w-[100px] rounded-md object-cover"
            />
            <View>
              <Text className="text-[18px] font-bold mt-1">
                Fun with Fractions...
              </Text>
              <Text className="text-[16px] font-normal mt-1">50 ETB</Text>
              
            </View>
          </View>
        ))}
        </ScrollView>
      </ScrollView>
      <View>
        <View className="p-2 mt-2 bg-gray-200 rounded-md">
          <Text className="text-[18px] font-semibold mb-4">Summary</Text>
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-[15px] font-semibold ">Sub-Total</Text>
            <Text className="text-[15px] font-normal">200 ETB</Text>
          </View>
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-[15px] font-semibold ">Tax</Text>
            <Text className="text-[15px] font-normal ">30 ETB</Text>
          </View>
          <View className="flex-row items-center justify-between mt-2 mb-1">
            <Text className="text-[17px] font-semibold ">Total</Text>
            <Text className="text-[17px] font-normal ">230 ETB</Text>
          </View>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate("Success") } className="bg-[#280e49] w-[100%] flex justify-center items-center rounded-md p-2 mt-2">
          <Text className="text-white text-[17px] font-semibold"> Pay with Stripe</Text>
          </TouchableOpacity>
      </View>
      {/* Button Navigation */}
      <BottomScreeenNavigation />
    </View>
  );
};
export default Checkout;
