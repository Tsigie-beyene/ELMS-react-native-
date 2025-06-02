import { View, Text ,Image,TouchableOpacity,TextInput,ScrollView} from 'react-native'
import { useState } from 'react';
import { Avatar1 } from '../../assets/image'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BottomScreeenNavigation from "../partials/BottomScreeenNavigation";
import { useNavigation } from '@react-navigation/native';



const Home = () => {
  const [trendingCourses, setTrendingCourses] = useState([1,2,3,4,5])
  const navigation = useNavigation();

  return (
    <View className="flex-1 px-3 bg-white">
        <ScrollView vertical showsVerticalScrollIndicator={false} className='flex-1'>
            <View className="bg-[#280e49] p-2 rounded-[8px] mb-3">
               <View className="flex-row items-center justify-between">
                 <View className="flex-row items-center gap-2">
                  <Image source={Avatar1} className= "h-[40px] w-[40px] rounded-full"/>
                    <View>
                      <Text className= "text-[15px] font-normal text-white ">Hello 👋</Text>
                      <Text className= " text-[17px] font-semibold text-white ">Tsigie Beyene</Text>
                    </View>
                 </View>
                   <View>
                   <View className="flex-row items-center gap-2">
                     <TouchableOpacity onPress={()=>navigation.navigate("Cart")} className="h-[30px] w-[30px] bg-white rounded-full flex items-center justify-center">
                        <FontAwesome5 name="shopping-cart" size={20} color={"#280e49"} />
                     </TouchableOpacity>
                     <TouchableOpacity className="h-[30px] w-[30px] bg-white rounded-full flex items-center justify-center">
                        <FontAwesome5 name="bell" size={20} color={"#280e49"} />
                     </TouchableOpacity>
                     <TouchableOpacity className="h-[30px] w-[30px] bg-[#fe3535] rounded-full flex items-center justify-center">
                        <FontAwesome5 name="power-off" size={20} color={"#fff"} />
                     </TouchableOpacity>

                   </View> 
                   </View>
           </View>
         </View>

          <View className="flex-row items-center justify-between bg-[#280e4935] p-2 rounded-full ">
            <TextInput placeholder="Search Courses..."/>
            <TouchableOpacity className="mr-[10px]">
              <FontAwesome5 name="search" color ={"#280e49"} size ={15}/>
            </TouchableOpacity>
          </View>

          <View className="bg-[#280e4935] p-2 rounded-[8px] mt-3 mb-3">
            <View className="flex-row items-center justify-between gap-2 mb-3">
              <Text className="text-[17] font-semibold">Trending Courses</Text>
              <View className="flex-row items-center gap-2">
                <Text className="text-[15] font-normal">See All</Text>
                <FontAwesome5 name="chevron-right" size={15} color={"#280e49"} />
              </View>
            </View>

            <ScrollView horizontal showsVerticalScrollIndicator={false} >
              {trendingCourses?.map((t, index) => (
                
                <View className="bg-white w-[300px] p-3 mr-2 rounded-md" key={index}>
                  <Image source={Avatar1} className="h-[200px] w-full rounded-md object-cover"/>
                  <View>
                    <Text className="text-[20px] text-[#280e49] font-semibold mt-2" >Fun with Fractions</Text>
                   <Text className="text-[15px] text-[#280e49] font-normal mt-1" >Tsigie Beyene</Text>
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
                   <View className="flex-row items-center justify-between ">
                      <Text className=" text-[22px] font-bold mt-3">50 ETB</Text>
                      <View className="flex-row items-center gap-2">
                          <TouchableOpacity className=" bg-[#280e49] rounded-md w-30 flex items-center justify-center p-2">
                            <Text className="text-white ">View Courses </Text>
                          </TouchableOpacity>
                           <TouchableOpacity className="bg-[#280e49] rounded-md w-30 flex items-center justify-center p-2">
                             <FontAwesome5 name="shopping-cart" size={15} color={"#fff"} />

                           </TouchableOpacity>
                      </View>

                   </View>

                  </View>
                </View>
              ) )}
              
            </ScrollView>
          </View> 

          <View className="bg-[#280e4935] p-2 rounded-[8px] mt-3 mb-3">
            <View className="flex-row items-center justify-between gap-2 mb-3">
              <Text className="text-[17] font-semibold">Popular Courses</Text>
              <View className="flex-row items-center gap-2">
                <Text className="text-[15] font-normal">See All</Text>
                <FontAwesome5 name="chevron-right" size={15} color={"#280e49"} />
              </View>
            </View>

            <ScrollView horizontal showsVerticalScrollIndicator={false} >
              {trendingCourses?.map((t, index) => (
                
                <View className="bg-white w-[300px] p-3 mr-2 rounded-md" key={index}>
                  <Image source={Avatar1} className="h-[200px] w-full rounded-md object-cover"/>
                  <View>
                    <Text className="text-[20px] text-[#280e49] font-semibold mt-2" >Fun with Fractions</Text>
                   <Text className="text-[15px] text-[#280e49] font-normal mt-1" >Tsigie Beyene</Text>
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
                   <View className="flex-row items-center justify-between ">
                      <Text className=" text-[22px] font-bold mt-3">50 ETB</Text>
                      <View className="flex-row items-center gap-2">
                          <TouchableOpacity onPress={()=>navigation.navigate("CourseDetail",{course_slug:index} )} className=" bg-[#280e49] rounded-md w-30 flex items-center justify-center p-2">
                            <Text className="text-white ">View Courses </Text>
                          </TouchableOpacity>
                           <TouchableOpacity className="bg-[#280e49] rounded-md w-30 flex items-center justify-center p-2">
                             <FontAwesome5 name="shopping-cart" size={15} color={"#fff"} />

                           </TouchableOpacity>
                      </View>

                   </View>

                  </View>
                </View>
              ) )}
              
            </ScrollView>
          </View>

        </ScrollView>
        {/* Button Navigation */}
        <BottomScreeenNavigation/>
    </View>
  )
}

export default Home;
