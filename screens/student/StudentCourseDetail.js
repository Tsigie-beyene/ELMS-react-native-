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

const StudentCourseDetail = ({ route }) => {
  const navigation = useNavigation();
  const { user_id, enrollment_id } = route.params;
  const [status,setStatus] = useState({});

  const refRBSheet = useRef();
  const video = useRef();

  const openRBSheet = () => {
    refRBSheet.current.open();
  };

  const closeRBSheet = () => {
    refRBSheet.current.close();
  };

  return (
    <View className="flex-1 px-3 bg-white">
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        <StudentScreenHeader title={"Course Detail"} returnScreen={"Home"} />

        <ScrollView showsVerticalScrollIndicator={false} className="mt-5">
          <Text className="text-[20px] font-semibold text-center">
            Fun with Fractions
          </Text>

          <View className="flex-row items-center justify-center gap-3 mt-4">
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
            <ProgressBar progress={0.4} color={"blue"} />
          </View>

          <List.Section title="">
            <List.Accordion
              title="Section 1"
              className="mb-4 bg-gray-300 rounded-md"
            >
              <List.Item
                onPress={openRBSheet}
                title="Fun with Fractions"
                className="ml-10"
                left={() => <List.Icon icon={"play"} />}
              />
              <List.Item
                title="Fun with Fractions"
                className="ml-10"
                left={() => <List.Icon icon={"lock"} />}
              />
              <List.Item
                title="Fun with Fractions"
                className="ml-10"
                left={() => <List.Icon icon={"lock"} />}
              />
            </List.Accordion>
            <List.Accordion
              title="Section 1"
              className="mb-4 bg-gray-300 rounded-md"
            >
              <List.Item
                title="Fun with Fractions"
                className="ml-10"
                left={() => <List.Icon icon={"play"} />}
              />
              <List.Item
                title="Fun with Fractions"
                className="ml-10"
                left={() => <List.Icon icon={"lock"} />}
              />
              <List.Item
                title="Fun with Fractions"
                className="ml-10"
                left={() => <List.Icon icon={"lock"} />}
              />
            </List.Accordion>
            <List.Accordion
              title="Section 1"
            
              className="mb-4 bg-gray-300 rounded-md"
            >
              <List.Item
                title="Fun with Fractions"
                className="ml-10"
                left={() => <List.Icon icon={"play"} />}
              />
              <List.Item
                title="Fun with Fractions"
                className="ml-10"
                left={() => <List.Icon icon={"lock"} />}
              />
              <List.Item
                title="Fun with Fractions"
                className="ml-10"
                left={() => <List.Icon icon={"lock"} />}
              />
            </List.Accordion>
          </List.Section>
        </ScrollView>
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
            Fun with Fractions 3m 45s
          </Text>

          <View style={styles.container}>
            <Video
              ref={video}
              style={styles.video}
              source={{ uri:"https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"  }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
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
