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

const CourseDatail = ({ route }) => {
  const { course_slug } = route.params; // Get the courseId from route params
  const [expanded, setExpanded] = useState(true);
  const handlePress = () => setExpanded(!expanded);

  return (
    <View className="flex-1 px-3 bg-white">
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
         <ScreenHeader title={"Course Detail"} returnScreen={"Home"}/>
        {/* section 2 */}
        <View className="w-full p-2 pb-3 rounded-md">
          <Image
            source={Avatar1}
            className="h-[200px] w-full rounded-md object-cover"
          />
          <View>
            <Text className="text-[20px] text-[#280e49] font-semibold mt-2">
              Fun With Fractions{" "}
            </Text>
            <Text className="text-[15px] text-[#280e49] font-normal mt-1 mb-3">
              Learn the basics of fractions through fun stories, colorful
              comics, and real-life examples. This course makes fractions easy
              to understand and exciting to explore!
            </Text>
            <View className="flex-row items-center gap-1 mt-1">
              <Text>4/5</Text>
              <View className="flex-row items-center gap-1 mt-1">
                <AntDesign name="star" size={15} color={"#dba100"} />
                <AntDesign name="star" size={15} color={"#dba100"} />
                <AntDesign name="star" size={15} color={"#dba100"} />
                <AntDesign name="star" size={15} color={"#dba100"} />
              </View>
              <Text> 2 Reviews</Text>
            </View>
            <Text className="text-[15px] mt-4">
              Created by:
              <Text className="font-bold"> Tsigie Beyene</Text>
            </Text>
            <Text className="text-[15px] mt-1">
              Last Updated:
              <Text className="font-bold"> 07 Jan, 2025</Text>
            </Text>
            <Text className="text-[15px] mt-1">
              Language:
              <Text className="font-bold"> English</Text>
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("CourseDetail", { course_slug: index })
              }
              className=" bg-[#280e49] rounded-md w-30 flex-row items-center justify-center p-2"
            >
              <Text className="mr-3 text-white ">Add to Cart </Text>
              <FontAwesome5 name="shopping-cart" size={15} color={"#fff"} />
            </TouchableOpacity>

            <Text className="font-bold text-[20px] mt-10">Course Contents</Text>

            <List.Section title="">
              <List.Accordion
                title="section 1"
                className="mb-4 bg-gray-300 rounded-md"
              >
                <List.Item
                  title="What Are Fractions?"
                  className="ml-10"
                  left={(props) => <List.Icon {...props} icon="play" />}
                />
                <List.Item
                  title="Halves, Thirds, and Quarters"
                  className="ml-10"
                  left={(props) => <List.Icon {...props} icon="lock" />}
                />
              </List.Accordion>
              <List.Accordion
                title="section 2"
                className="mb-4 bg-gray-300 rounded-md"
              >
                <List.Item
                  title="Fractions in Real Life "
                  className="ml-10"
                  left={(props) => <List.Icon {...props} icon="play" />}
                />
                <List.Item
                  title="Comparing Fractions"
                  className="ml-10"
                  left={(props) => <List.Icon {...props} icon="lock" />}
                />
              </List.Accordion>

              <List.Accordion
                title="section 3"
                className="mb-4 bg-gray-300 rounded-md"
              >
                <List.Item
                  title="Adding and Subtracting Fractions"
                  className="ml-10"
                  left={(props) => <List.Icon {...props} icon="play" />}
                />
                <List.Item
                  title="Simplifying Fractions"
                  className="ml-10"
                  left={(props) => <List.Icon {...props} icon="lock" />}
                />
              </List.Accordion>
              <List.Accordion
                title="section 4"
                className="mb-4 bg-gray-300 rounded-md"
              >
                <List.Item
                  title="Fractions vs. Decimals"
                  className="ml-10"
                  left={(props) => <List.Icon {...props} icon="play" />}
                />
                <List.Item
                  title="Fractions in Ethiopian Culture (e.g., injera sharing)"
                  className="ml-10"
                  left={(props) => <List.Icon {...props} icon="lock" />}
                />
                <List.Item
                  title="Fraction Games & Challenges"
                  className="ml-10"
                  left={(props) => <List.Icon {...props} icon="lock" />}
                />
              </List.Accordion>
              <List.Accordion
                title="section 5"
                className="mb-4 bg-gray-300 rounded-md"
              >
                <List.Item
                  title="Mastering Fractions!"
                  className="ml-10"
                  left={(props) => <List.Icon {...props} icon="lock" />}
                />
                <List.Item
                  title="Final Quiz"
                  className="ml-10"
                  left={(props) => <List.Icon {...props} icon="lock" />}
                />
              </List.Accordion>
            </List.Section>
            <View>
              <Text className="font-bold text-[20px] mt-10">
                Course Description
              </Text>
              <Text>
                Learn the basics of fractions through fun stories, colorful
                comics, and real-life examples. This course makes fractions easy
                to understand and exciting to explore!
              </Text>
            </View>
            <View>
              <Text className="font-bold text-[20px] mt-10">
                Course Reviews
              </Text>
              <View className="p-3 mb-3 bg-gray-200 rounded-md">
                <View>
                  <Text className="font-bold text-[17px]">Mekdes, Grade 8 Student</Text>
                  <Text className="font-normal text-[14px]">3/22/2025</Text>
                </View>
                <View className="flex-row items-center gap-1 mt-1">
                  <AntDesign name="star" size={15} color={"#dba100"} />
                  <AntDesign name="star" size={15} color={"#dba100"} />
                  <AntDesign name="star" size={15} color={"#dba100"} />
                  <AntDesign name="star" size={15} color={"#dba100"} />
                </View>
                <Text className="mt-3">This course made learning fractions super easy and fun! The comics helped me understand each topic step-by-step. I used to be confused about fractions, but now I can solve them confidently!</Text>
              </View>
<View className="p-3 mb-3 bg-gray-200 rounded-md">
                <View>
                  <Text className="font-bold text-[17px]">Abenezer, Grade 10 Student</Text>
                  <Text className="font-normal text-[14px]">3/22/2025</Text>
                </View>
                <View className="flex-row items-center gap-1 mt-1">
                  <AntDesign name="star" size={15} color={"#dba100"} />
                  <AntDesign name="star" size={15} color={"#dba100"} />
                  <AntDesign name="star" size={15} color={"#dba100"} />
                  <AntDesign name="star" size={15} color={"#dba100"} />
                </View>
                <Text className="mt-3">I used to skip math classes because fractions were hard, but now I love them! The comic stories make it feel like an adventure.</Text>
              </View>
              <View className="p-3 mb-3 bg-gray-200 rounded-md">
                <View>
                  <Text className="font-bold text-[17px]">Mr. Getahun, STEM Teacher, Addis Ababa</Text>
                  <Text className="font-normal text-[14px]">3/22/2025</Text>
                </View>
                <View className="flex-row items-center gap-1 mt-1">
                  <AntDesign name="star" size={15} color={"#dba100"} />
                  <AntDesign name="star" size={15} color={"#dba100"} />
                  <AntDesign name="star" size={15} color={"#dba100"} />
                  <AntDesign name="star" size={15} color={"#dba100"} />
                  <AntDesign name="star" size={15} color={"#dba100"} />
                </View>
                <Text className="mt-3">As a math teacher, I highly recommend this course. It explains concepts in a simple way and keeps students engaged through visuals and local context!</Text>
              </View>

            </View>
          </View>
        </View>
      </ScrollView>
      {/* Button Navigation */}
      <BottomScreeenNavigation />
    </View>
  );
};
export default CourseDatail;
