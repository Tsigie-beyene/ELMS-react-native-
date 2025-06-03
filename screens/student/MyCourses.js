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

const MyCourses = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 px-3 bg-white">
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        <StudentScreenHeader title={"My Courses"} returnScreen={"Home"} />

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

export default MyCourses;
