import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Login3dImage } from "../../assets/image";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
    const navigation = useNavigation();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      vertical
      className="flex-1 mx-3"
    >
      <Image source={Login3dImage} className="h-[250px] w-[250px] ml-14" />
      <Text className="text-[35px] font-extrabold mt-5">Register</Text>
      <Text className="text-[15px] font-normal mb-5">
        Create an account and start learning
      </Text>

      <View className="mt-3">
        <TextInput
          placeholder="Full Name"
          keyboardType="default"
          className="bg-[#e9e9e9a7] border-[#e8e8e8d2] rounded-md mb-2 p-2"
        />
        <TextInput
          placeholder="Email"
          keyboardType="default"
          className="bg-[#e9e9e9a7] border-[#e8e8e8d2] rounded-md mb-2 p-2"
        />
        <TextInput
          placeholder="Password"
          keyboardType="default"
          secureTextEntry={true}
          className="bg-[#e9e9e9a7] border-[#e8e8e8d2] rounded-md mb-2 p-2"
        />
        <TextInput
          placeholder="Confirm Password"
          keyboardType="default"
          secureTextEntry={true}
          className="bg-[#e9e9e9a7] border-[#e8e8e8d2] rounded-md mb-2 p-2"
        />

        {/* <TouchableOpacity className="bg-[#280e4991] flex-row justify-center p-2 rounded-md mt-2">
                            <Text className="text-white">Processing</Text>
                        </TouchableOpacity> */}

        <TouchableOpacity className="bg-[#280e49] flex-row justify-center p-2 rounded-md mt-2">
          <Text className="text-white">Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          className="mt-2"
        >
          <Text className="text-[#280e49] text-center mt-4">
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Register;
