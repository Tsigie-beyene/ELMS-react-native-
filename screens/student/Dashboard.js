import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Avatar1 } from "../../assets/image";

import BottomScreeenNavigation from "../partials/BottomScreeenNavigation";
import StudentScreenHeader from "../partials/StudentScreenHeader";

const Dashboard = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 px-3 bg-white">
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        <StudentScreenHeader title={"Dashboard"} returnScreen={"Home"} />

        <Text className="text-[25px] font-bold">Dashboard</Text>
        <Text className="text-[15px] font-normal mb-5">
          Welcome to your dashboard
        </Text>

        <View className="flex-row flex-wrap p-2 bg-gray-200 rounded-md">
          <View className="w-full">
            <View className="bg-blue-200 h-[70px] rounded-md m-1 pt-2 flex-col justify-center items-center ">
              <FontAwesome5 name="book" color={"#280e49"} size={22} />
              <Text className="text-[18px] font-semibold mb-3">3 Courses</Text>
            </View>
          </View>
          <View className="w-1/2">
            <View className="bg-red-200 h-[70px] rounded-md m-1 pt-2 flex-col justify-center items-center ">
              <FontAwesome5 name="graduation-cap" color={"#280e49"} size={22} />
              <Text className="text-[18px] font-semibold mb-3">
                1 Certificates
              </Text>
            </View>
          </View>
          <View className="w-1/2">
            <View className="bg-green-200 h-[70px] rounded-md m-1 pt-2 flex-col justify-center items-center ">
              <FontAwesome5 name="play" color={"#280e49"} size={22} />
              <Text className="text-[18px] font-semibold mb-3">
                2 Completed
              </Text>
            </View>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="mt-5">
          <Text className="text-[25px] font-bold">My Courses</Text>
          <Text className="text-[15px] font-normal mb-5">
            View and manage all your courses
          </Text>

          <View className="flex-row w-full gap-2 p-2 pb-3 mb-3 bg-gray-200 rounded-md">
            <Image
              source={Avatar1}
              className="h-[100px] w-[100px] rounded-md object-cover"
            />
            <View>
              <Text className="text-[18px] font-bold">Fun with Fractions</Text>
              <Text className="text-[16px] font-normal mt-1">3 Sections</Text>
              <TouchableOpacity className="bg-[#280e49] w-100 h-7 flex-row gap-2 justify-center items-center rounded-md mt-2">
                <Text className="text-white">Start Now</Text>
                <FontAwesome5 name="play" color={"white"} size={11} />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row w-full gap-2 p-2 pb-3 mb-3 bg-gray-200 rounded-md">
            <Image
              source={Avatar1}
              className="h-[100px] w-[100px] rounded-md object-cover"
            />
            <View>
              <Text className="text-[18px] font-bold">Fun with Fractions</Text>
              <Text className="text-[16px] font-normal mt-1">3 Sections</Text>
              <TouchableOpacity className="bg-[#280e49] w-100 h-7 flex-row gap-2 justify-center items-center rounded-md mt-2">
                <Text className="text-white">Start Now</Text>
                <FontAwesome5 name="play" color={"white"} size={11} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ScrollView>

      {/* Bottom Nav */}
      <BottomScreeenNavigation />
    </View>
  );
};

export default Dashboard;
