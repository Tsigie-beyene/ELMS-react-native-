import { useState } from "react";
import apiInstance from "../../src/utils/axios";
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
import { login } from "../../src/utils/auth";
import { useDispatch } from "react-redux";

const Register = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [bioData, setBioData] = useState({
    full_name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [loading, setLoading] = useState(false);

  const handleBioData = (name, value) => {
    setBioData({
      ...bioData,
      [name]: value,
    });
  };

  const handleRegister = async () => {
    setLoading(true);

    try {
      const userData = {
        full_name: bioData.full_name,
        email: bioData.email,
        password: bioData.password,
        password2: bioData.password2,
      };

      const response = await apiInstance.post(`user/register/`, userData);
      navigation.navigate("Login");

      if (response.status === 201) {
        const { error } = await login(
          dispatch,
          bioData.email,
          bioData.password
        );
        if (error) {
        } else {
          navigation.navigate("Home");
          generateCartId();
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);

      if (error.response.data.email) {
        alert(error.response.data.email);
      }

      if (error.response.data.password) {
        alert(error.response.data.password);
      }
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      vertical
      className="flex-1 mx-3"
    >
      <Image source={Login3dImage} className="h-[200px] w-[200px] ml-20 mt-5" />
      <Text className="text-[35px] font-extrabold mt-5">Register</Text>
      <Text className="text-[15px] font-normal mb-5">
        Create an account and start learning
      </Text>

      <View className="mt-3">
        <TextInput
          onChangeText={(text) => handleBioData("full_name", text)}
          value={bioData.full_name}
          placeholder="Full Name"
          keyboardType="default"
          className="bg-[#e9e9e9a7] border-[#e8e8e8d2] rounded-md mb-2 p-2"
        />
        <TextInput
          onChangeText={(text) => handleBioData("email", text)}
          value={bioData.email}
          placeholder="Email"
          keyboardType="default"
          className="bg-[#e9e9e9a7] border-[#e8e8e8d2] rounded-md mb-2 p-2"
        />
        <TextInput
          onChangeText={(text) => handleBioData("password", text)}
          value={bioData.password}
          placeholder="Password"
          keyboardType="default"
          secureTextEntry={true}
          className="bg-[#e9e9e9a7] border-[#e8e8e8d2] rounded-md mb-2 p-2"
        />
        <TextInput
          onChangeText={(text) => handleBioData("password2", text)}
          value={bioData.password2}
          placeholder="Confirm Password"
          keyboardType="default"
          secureTextEntry={true}
          className="bg-[#e9e9e9a7] border-[#e8e8e8d2] rounded-md mb-2 p-2"
        />

        {/* <TouchableOpacity className="bg-[#280e4991] flex-row justify-center p-2 rounded-md mt-2">
                            <Text className="text-white">Processing</Text>
                        </TouchableOpacity> */}

        {loading === true ? (
          <>
            <TouchableOpacity
              disabled
              onPress={handleRegister}
              className="bg-[#280e4991] flex-row justify-center p-2 rounded-md mt-2"
            >
              <Text className="text-white">Processing</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={handleRegister}
              className="bg-[#280e49] flex-row justify-center p-2 rounded-md mt-2"
            >
              <Text className="text-white">Register</Text>
            </TouchableOpacity>
          </>
        )}

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
