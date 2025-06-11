import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { useEffect, useRef, useState } from "react";
// import { Avatar1 } from "../../assets/Image";
import { ResizeMode, Video } from "expo-av";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import BottomScreeenNavigation from "../partials/BottomScreeenNavigation";
import { List } from "react-native-paper";
import ScreenHeader from "../partials/ScreenHeader";
import apiInstance from "../../src/utils/axios";
import moment from "moment";
import RBSheet from "react-native-raw-bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useUserData from "../../src/plugin/useUserData";
import * as Animatable from "react-native-animatable";

const CourseDetail = ({ route }) => {
  const [expanded, setExpanded] = useState(true);
  const [cartStatus, setCartStatus] = useState(false);
  const [cartId, setCartId] = useState("");
  const [course, setCourse] = useState([]);
  const [selectedVariantItem, setSelectedVariantItem] = useState({
    title: "",
    video: "",
    content_duration: "",
  });
  const { course_slug } = route.params;
  const handlePress = () => setExpanded(!expanded);
  const refRBSheet = useRef();
  const user_id = useUserData();
  const video = useRef();
  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCourse = async () => {
    setLoading(true);
    const cart_id = await AsyncStorage.getItem("randomString");
    setCartId(cart_id);
    try {
      const response = await apiInstance.get(
        `course/course-detail/${course_slug}/`
      );
      setCourse(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectedVariantItem = (title, video, content_duration) => {
    setSelectedVariantItem({
      title: title,
      video: video,
      content_duration: content_duration,
    });
    refRBSheet.current.open();
  };

  const addToCart = async (courseId, userId, price, country, cartId) => {
    alert("adding to cart");

    try {
      json = {
        course_id: courseId,
        user: userId,  
        price: price,
        country: country,
        cart_id: cartId,
      };

      await apiInstance.post(`cart/create/`, json).then((res) => {
        alert("Added to cart");
        setTimeout(() => {}, 3000);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  onReFresh = () => {
    fetchReview();
  };

  return (
    <Animatable.View className="bg-white flex-1 px-3">
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        className="flex-1"
        refreshControl={
          <RefreshControl onRefresh={onReFresh} refreshing={refreshing} />
        }
      >
        <ScreenHeader title={"Course Detail"} returnScreen={"Home"} />
        {loading === true ? (
          <>
            <ActivityIndicator size={"large"} color={"#280e49"} />
          </>
        ) : (
          <>
            <View className="pb-4 w-full p-2 rounded-md">
              <Image
                source={{ uri: course.image }}
                className="h-[200px] w-full rounded-md object-cover"
              />
              <View>
                <Text className="text-[20px] text-[#280e49] font-semibold mt-2">
                  {course.title}
                </Text>
                <Text className="text-[15px] text-[#280e49] font-normal mt-1 mb-3">
                  {course.description}
                </Text>
                <View className="flex-row items-center gap-1 mt-1">
                  <Text>{course?.average_rating || 0}/5</Text>
                  <View className="flex-row items-center gap-1 mt-1">
                    <Text>
                      {course?.average_rating === 1 ? (
                        <AntDesign name="star" color={"#dba100"} size={15} />
                      ) : course?.average_rating === 2 ? (
                        <>
                          <AntDesign name="star" color={"#dba100"} size={15} />
                          <AntDesign name="star" color={"#dba100"} size={15} />
                        </>
                      ) : course?.average_rating === 3 ? (
                        <>
                          <AntDesign name="star" color={"#dba100"} size={15} />
                          <AntDesign name="star" color={"#dba100"} size={15} />
                          <AntDesign name="star" color={"#dba100"} size={15} />
                        </>
                      ) : course?.average_rating === 4 ? (
                        <>
                          <AntDesign name="star" color={"#dba100"} size={15} />
                          <AntDesign name="star" color={"#dba100"} size={15} />
                          <AntDesign name="star" color={"#dba100"} size={15} />
                          <AntDesign name="star" color={"#dba100"} size={15} />
                        </>
                      ) : course?.average_rating === 5 ? (
                        <>
                          <AntDesign name="star" color={"#dba100"} size={15} />
                          <AntDesign name="star" color={"#dba100"} size={15} />
                          <AntDesign name="star" color={"#dba100"} size={15} />
                          <AntDesign name="star" color={"#dba100"} size={15} />
                          <AntDesign name="star" color={"#dba100"} size={15} />
                        </>
                      ) : (
                        <Text>Rating Not Added</Text>
                      )}
                    </Text>
                  </View>
                  <Text>
                    {course?.rating_count} Review
                    {course?.rating_count?.length > 1 ? "s" : ""}
                  </Text>
                </View>
                <Text className="text-[15px] mt-4">
                  Created By:
                  <Text className="font-bold">
                    {" "}
                    {course?.teacher?.full_name}
                  </Text>
                </Text>
                <Text className="text-[15px] mt-1">
                  Date Published:
                  <Text className="font-bold">
                    {" "}
                    {moment(course?.date).format("DD MMM, YYYY")}
                  </Text>
                </Text>
                <Text className="text-[15px] mt-1">
                  Language:
                  <Text className="font-bold"> {course?.language}</Text>
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    addToCart(
                      course?.id,
                      user_id,
                      course?.price,
                      "Nigeria",
                      cartId
                    )
                  }
                  className="bg-[#280e49] rounded-md w-30 mt-5 flex-row items-center justify-center p-2"
                >
                  <Text className="text-white mr-3">Add To Cart</Text>
                  <FontAwesome5 name="shopping-cart" color={"#fff"} size={15} />
                </TouchableOpacity>

                <Text className="font-bold text-[20px] mt-10">
                  Course Contents
                </Text>

                <List.Section title="">
                  {course?.variant?.map((v, index) => (
                    <List.Accordion
                      title={v?.title}
                      key={index}
                      className="bg-gray-300 rounded-md mb-4"
                    >
                      {v?.variant_items?.map((i, v_index) => (
                        <List.Item
                          onPress={
                            i.preview
                              ? () =>
                                  handleSelectedVariantItem(
                                    i?.title,
                                    i?.file,
                                    i?.content_duration
                                  )
                              : null
                          }
                          title={i?.title}
                          className="ml-10"
                          left={(props) => (
                            <List.Icon
                              {...props}
                              icon={i.preview ? "play" : "lock"}
                            />
                          )}
                          key={v_index}
                        />
                      ))}
                    </List.Accordion>
                  ))}
                </List.Section>

                <View>
                  <Text className="font-bold text-[20px] mt-10">
                    Course Description
                  </Text>
                  <Text>{course.description}</Text>
                </View>

                <View>
                  <Text className="font-bold text-[20px] mt-10">
                    Course Reviews
                  </Text>
                  {course?.reviews?.map((r, index) => (
                    <View className="bg-gray-200 p-3 rounded-md mb-3">
                      <View>
                        <Text className="font-bold text-[17px]">
                          {r?.user?.full_name || "No Name Found"}
                        </Text>
                        <Text className="font-normal text-[14px]">
                          {moment(r?.date).format("DD MMM, YYYY")}
                        </Text>
                      </View>
                      <View className="flex-row items-center gap-1 mt-1">
                        <Text>
                          {r?.rating === 1 ? (
                            <AntDesign
                              name="star"
                              color={"#dba100"}
                              size={15}
                            />
                          ) : r?.rating === 2 ? (
                            <>
                              <AntDesign
                                name="star"
                                color={"#dba100"}
                                size={15}
                              />
                              <AntDesign
                                name="star"
                                color={"#dba100"}
                                size={15}
                              />
                            </>
                          ) : r?.rating === 3 ? (
                            <>
                              <AntDesign
                                name="star"
                                color={"#dba100"}
                                size={15}
                              />
                              <AntDesign
                                name="star"
                                color={"#dba100"}
                                size={15}
                              />
                              <AntDesign
                                name="star"
                                color={"#dba100"}
                                size={15}
                              />
                            </>
                          ) : r?.rating === 4 ? (
                            <>
                              <AntDesign
                                name="star"
                                color={"#dba100"}
                                size={15}
                              />
                              <AntDesign
                                name="star"
                                color={"#dba100"}
                                size={15}
                              />
                              <AntDesign
                                name="star"
                                color={"#dba100"}
                                size={15}
                              />
                              <AntDesign
                                name="star"
                                color={"#dba100"}
                                size={15}
                              />
                            </>
                          ) : r?.rating === 5 ? (
                            <>
                              <AntDesign
                                name="star"
                                color={"#dba100"}
                                size={15}
                              />
                              <AntDesign
                                name="star"
                                color={"#dba100"}
                                size={15}
                              />
                              <AntDesign
                                name="star"
                                color={"#dba100"}
                                size={15}
                              />
                              <AntDesign
                                name="star"
                                color={"#dba100"}
                                size={15}
                              />
                              <AntDesign
                                name="star"
                                color={"#dba100"}
                                size={15}
                              />
                            </>
                          ) : (
                            <Text>Rating Not Added</Text>
                          )}
                        </Text>
                      </View>
                      <Text className="mt-3">{r?.review}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
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
          height={300}
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
            {selectedVariantItem?.content_duration}
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
        </RBSheet>
      </View>
    </Animatable.View>
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

export default CourseDetail;
