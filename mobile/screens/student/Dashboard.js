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

import BottomScreeenNavigation from "../partials/BottomScreeenNavigation";
import StudentScreenHeader from "../partials/StudentScreenHeader";
import useUserData from "../../src/plugin/useUserData";
import apiInstance from "../../src/utils/axios";
const Dashboard = () => {
  const navigation = useNavigation();
  const user_id = useUserData();

  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchCourseData = async () => {
    setLoading(true);
    try {
      const stats_response = await apiInstance.get(
        `student/summary/${user_id}/`
      );
      const course_response = await apiInstance.get(
        `student/course-list/${user_id}/`
      );

      console.log(stats_response.data[0]);

      setCourses(course_response.data);
      setStats(stats_response.data[0]);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  onRefresh = () => {
    fetchCourseData();
  };

  return (
    <View className="bg-white flex-1 px-3">
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <StudentScreenHeader title={"Dashboard"} returnScreen={"Home"} />
        <Text className="text-[25px] font-bold">Dashboard</Text>
        <Text className="text-[15px] font-normal mb-5">
          Welcome to your dashboard
        </Text>

        {loading === true ? (
          <>
            <ActivityIndicator size={"large"} color={"#280e49"} />
          </>
        ) : (
          <>
            <View className="bg-gray-200 rounded-md p-2 flex-row flex-wrap">
              <View className="w-full">
                <View className="bg-blue-200 h-[70px] rounded-md m-1 pt-2 flex-col justify-center items-center ">
                  <FontAwesome5 name="book" color={"#280e49"} size={22} />
                  <Text className="text-[18px] font-semibold mb-3">
                    {stats?.total_courses || 0} Courses
                  </Text>
                </View>
              </View>
              <View className="w-1/2">
                <View className="bg-red-200 h-[70px] rounded-md m-1 pt-2 flex-col justify-center items-center ">
                  <FontAwesome5
                    name="graduation-cap"
                    color={"#280e49"}
                    size={22}
                  />
                  <Text className="text-[18px] font-semibold mb-3">
                    {stats?.total_achieved_certificates || 0} Certificates
                  </Text>
                </View>
              </View>
              <View className="w-1/2">
                <View className="bg-green-200 h-[70px] rounded-md m-1 pt-2 flex-col justify-center items-center ">
                  <FontAwesome5 name="play" color={"#280e49"} size={22} />
                  <Text className="text-[18px] font-semibold mb-3">
                    {stats?.completed_lessons || 0} Completed
                  </Text>
                </View>
              </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="mt-5">
              <Text className="text-[25px] font-bold">My Courses</Text>
              <Text className="text-[15px] font-normal mb-5">
                View and manage all your courses
              </Text>

              {courses?.map((c) => (
                <View
                  className="flex-row gap-2 pb-3 w-full bg-gray-200 p-2 rounded-md mb-3"
                  key={c.id}
                >
                  <Image
                    source={{ uri: c?.course?.image }}
                    className="h-[100px] w-[100px] rounded-md object-cover"
                  />
                  <View>
                    <Text className="text-[18px] font-bold">
                      {c?.course?.title?.slice(0, 25)}
                    </Text>
                    <Text className="text-[16px] font-normal mt-1">
                      3 Sections
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("StudentCourseDetail", {
                          user_id: user_id,
                          enrollment_id: c?.enrollment_id,
                        })
                      }
                      className="bg-[#280e49] w-100 h-7 flex-row gap-2 justify-center items-center rounded-md mt-2"
                    >
                      <Text className="text-white">Start Now</Text>
                      <FontAwesome5 name="play" color={"white"} size={11} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </>
        )}
      </ScrollView>

      {/* Bottom Nav */}
      <BottomScreeenNavigation />
    </View>
  );
};

export default Dashboard;
