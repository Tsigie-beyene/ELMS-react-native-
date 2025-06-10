import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Login3dImage } from "../../assets/image";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { login } from "../../src/utils/auth";
import CartId from "../../src/plugin/CartId";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [bioData, setBioData] = useState({
    email: "tsigiebey29@gmail.com",
    password: "Kidanu@16",
  });
  const [loading, setLoading] = useState(false);

  const handleBioData = (name, value) => {
    setBioData({
      ...bioData,
      [name]: value,
    });
  };

  const generateCartId = async () => {
    const generateRandomString = async () => {
      const length = 30;
      const characters = "abcdefghiklmnopqrstuvwxzy1234567890";
      let randomString = "";

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
      }
      await AsyncStorage.setItem("randomString", randomString);
    };

    const existingRandomString = await AsyncStorage.getItem("randomString");
    console.log("existingRandomString =====", existingRandomString);
    if (!existingRandomString) {
      generateRandomString();
    }
  };

  const handleLogin = async () => {
    setLoading(true);

    try {
      const { error } = await login(dispatch, bioData.email, bioData.password);
      if (error) {
        alert(error.detail);
        setLoading(false);
      } else {
        console.log("Login Succes");
        setLoading(false);
        navigation.navigate("Home");
        CartId();
        generateCartId();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      vertical
      className="flex-1 mx-3"
    >
      <Image source={Login3dImage} className="h-[250px] w-[250px] ml-14" />
      <Text className="text-[35px] font-extrabold mt-5">Login</Text>
      <Text className="text-[15px] font-normal mb-5">
        Welcome back, login to continue
      </Text>

      <View className="mt-3">
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

        {/* <TouchableOpacity disabled className="bg-[#280e4991] flex-row justify-center p-2 rounded-md mt-2">
                            <Text className="text-white">Processing</Text>
                        </TouchableOpacity> */}

        {loading === true ? (
          <>
            <TouchableOpacity
              disabled
              className="bg-[#280e4991] flex-row justify-center p-2 rounded-md mt-2"
            >
              <Text className="text-white">Processing</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={handleLogin}
              className="bg-[#280e49] flex-row justify-center p-2 rounded-md mt-2"
            >
              <Text className="text-white">Login</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          className="mt-2"
        >
          <Text className="text-[#280e49] text-center mt-4">
            Don't have an account yet? Register
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;
