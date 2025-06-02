import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

const ScreenHeader = ({ title, returnScreen }) => {
    const navigation = useNavigation();
    return (
        <View className="bg-[#280e49] p-2 rounded-[8px] mb-3">
            <View className="flex-row items-center justify-between gap-5">
                <TouchableOpacity onPress={() => navigation.navigate(returnScreen)} className="h-[30px] w-[30px] bg-white rounded-full flex items-center justify-center mx-auto">
                    <FontAwesome5 name="arrow-left" color={"#280e49"} size={20} />
                </TouchableOpacity>

                <View>
                    <Text className="text-white text-[17px] font-semibold text-center">{title}</Text>
                </View>

                <TouchableOpacity className="h-[30px] w-[30px] bg-white rounded-full flex items-center justify-center mx-auto">
                    <FontAwesome5 name="shopping-cart" color={"#280e49"} size={20} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ScreenHeader;
