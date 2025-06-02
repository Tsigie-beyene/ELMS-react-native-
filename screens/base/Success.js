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

const Success = () => {
  const [Courses, setCourses] = useState([1, 2, 3, 4, 5]);

  return (
    <View className="flex-1 px-3 bg-white">
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        <ScreenHeader title={"Success"} returnScreen={"Home"} />
          <View className="flex-col items-center gap-2 p-2 pb-2 mt-10 mb-3 mr-2 bg-gray-200 rounded-md">
            <FontAwesome5 name="check-circle" color={"#280e49"} size={105}/>
             <View>
                <Text className="text-[18px] font-semibold text-center">Enrollment Successfull!</Text>
                <TouchableOpacity className="bg-[#280e49] p-2 rounded-md mt-4">
                    <Text className="text-center text-white">Go to Dashboard</Text>
                </TouchableOpacity>
             </View>

          </View>
      </ScrollView>
    
      {/* Button Navigation */}
      <BottomScreeenNavigation />
    </View>
  );
};
export default Success;