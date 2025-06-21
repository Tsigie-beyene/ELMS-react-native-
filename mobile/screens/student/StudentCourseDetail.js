import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import { List, ProgressBar } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import { ResizeMode, Video } from "expo-av";
import BottomScreeenNavigation from "../partials/BottomScreeenNavigation";
import StudentScreenHeader from "../partials/StudentScreenHeader";
import apiInstance from "../../src/utils/axios";

const StudentCourseDetail = ({ route }) => {
  const { user_id, enrollment_id } = route.params;
  const refRBSheet = useRef();
  const video = useRef();

  const navigation = useNavigation();
  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);

  const [selectedVariantItem, setSelectedVariantItem] = useState({
    title: "",
    video: "",
    content_duration: "",
  });

  const openRBSheet = () => {
    refRBSheet.current.open();
  };

  const closeRBSheet = () => {
    refRBSheet.current.close();
  };

  const handleSelectedVariantItem = (
    title,
    video,
    content_duration,
    variant_item_id
  ) => {
    setSelectedVariantItem({
      title: title,
      video: video,
      content_duration: content_duration,
      variant_item_id: variant_item_id,
    });

    console.log(video);
    refRBSheet.current.open();
  };

  const fetchCourseDetail = async () => {
    setLoading(true);

    try {
      const response = await apiInstance.get(
        `student/course-detail/${user_id}/${enrollment_id}/`
      );
      setCourse(response.data);

      // Course Progress
      const percentageCompleted =
        (response?.data?.completed_lesson?.length /
          response?.data.lectures?.length) *
        100;
      setCompletedLessons(response?.data?.completed_lesson);
      setCompletionPercentage(percentageCompleted?.toFixed(0));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchCourseDetail();
  }, []);

  onReFresh = () => {
    fetchCourseDetail();
  };

  const handleMarkCourseAsCompleted = async (VariantItemId) => {
    json = {
      user_id: user_id,
      course_id: course?.course?.id,
      variant_item_id: VariantItemId,
    };

    const response = await apiInstance.post(`student/course-completed/`, json);
    fetchCourseDetail();
  };

  const isCourseCompleted = completedLessons?.some((course) => {
    if (course?.variant_item?.title === selectedVariantItem?.title) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <View className="bg-white flex-1 px-3">
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onReFresh} refreshing={refreshing} />
        }
        vertical
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        <StudentScreenHeader title={"Course Detail"} returnScreen={"Home"} />
        {loading ? (
          <>
            <ActivityIndicator size={"large"} color={"#280e49"} />
          </>
        ) : (
          <>
            <ScrollView showsVerticalScrollIndicator={false} className="mt-5">
              <Text className="text-[20px] font-semibold text-center">
                {course?.course?.title}
              </Text>

              <View className="flex-row justify-center items-center gap-3 mt-4">
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Message", {
                      user_id: user_id,
                      enrollment_id: enrollment_id,
                    })
                  }
                  className="bg-[#280e49] w-100 p-2 rounded-md"
                >
                  <Text className="text-white">Messages</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Note", {
                      user_id: user_id,
                      enrollment_id: enrollment_id,
                    })
                  }
                  className="bg-[#280e49] w-100 p-2 rounded-md"
                >
                  <Text className="text-white">Notes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Reviews", {
                      user_id: user_id,
                      enrollment_id: enrollment_id,
                    })
                  }
                  className="bg-[#280e49] w-100 p-2 rounded-md"
                >
                  <Text className="text-white">Reviews</Text>
                </TouchableOpacity>
              </View>

              <Text className="font-bold text-[20px] mt-10 text-center">
                Course Content
              </Text>
              <View className="mt-3 mb-3">
                <ProgressBar
                  progress={completionPercentage / 100}
                  color={"blue"}
                />
              </View>

              <List.Section title="">
                {course?.curriculum?.map((v, index) => (
                  <List.Accordion
                    title={v?.title}
                    key={index}
                    className="bg-gray-300 rounded-md mb-4"
                  >
                    {v?.variant_items?.map((i, v_index) => (
                      <List.Item
                        onPress={() =>
                          handleSelectedVariantItem(
                            i?.title,
                            i?.file,
                            i?.content_duration,
                            i?.variant_item_id
                          )
                        }
                        title={i?.title}
                        className="ml-10"
                        left={(props) => <List.Icon {...props} icon={"play"} />}
                        key={v_index}
                      />
                    ))}
                  </List.Accordion>
                ))}
              </List.Section>
            </ScrollView>
          </>
        )}
      </ScrollView>

      {/* Bottom Nav */}
      <BottomScreeenNavigation />

      <View>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          dragFromTopOnly={true}
          height={400}
          customStyles={{
            wrapper: {
              backgroundColor: "#00000077",
            },
            draggableIcon: {
              backgroundColor: "#020e40",
            },
          }}
        >
          <Text className="text-center">
            {selectedVariantItem?.title} -{" "}
            {selectedVariantItem?.content_duration} -{" "}
            {selectedVariantItem?.variant_item_id}
          </Text>

          <View style={styles.container}>
            <Video
              ref={video}
              style={styles.video}
              source={{ uri: selectedVariantItem?.video }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
          </View>
          <View>
            {isCourseCompleted === true ? (
              <>
                <View className="flex flex-row gap-2 justify-center items-center mt-6">
                  <Text className="text-center font-semibold text-[17px] text-[#020e40] mb-6">
                    Mark as In-Complete
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      handleMarkCourseAsCompleted(
                        selectedVariantItem?.variant_item_id
                      )
                    }
                    className="bg-[#280e49] flex-row justify-center items-center p-1 rounded-md w-6"
                  >
                    <FontAwesome5
                      name="sign-out-alt"
                      color={"white"}
                      size={15}
                    />
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <View className="flex flex-row gap-2 justify-center items-center mt-6">
                  <Text className="text-center font-semibold text-[17px] text-[#020e40] mb-6">
                    Mark as Completed
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      handleMarkCourseAsCompleted(
                        selectedVariantItem?.variant_item_id
                      )
                    }
                    className="bg-[#280e49] flex-row justify-center items-center p-1 rounded-md w-6"
                  >
                    <FontAwesome5 name="check" color={"white"} size={15} />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </RBSheet>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StudentCourseDetail;
