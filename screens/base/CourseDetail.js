import { View, Text ,Image,TouchableOpacity,TextInput,ScrollView} from 'react-native'
import { useState } from 'react';
import { Avatar1 } from '../../assets/image'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BottomScreeenNavigation from "../partials/BottomScreeenNavigation";


const CourseDatail = ({route})=> {
     const { course_slug } = route.params; // Get the courseId from route params
    return (
        <View className="flex-1 px-3 bg-white">
                <ScrollView vertical showsVerticalScrollIndicator={false} className='flex-1'>
                    <View className="bg-[#280e49] p-2 rounded-[8px] mb-3">
                       <View className="flex-row items-center justify-between gap-5">
                         <TouchableOpacity className=" h-[30px] w-[30px] flex items-center justify-center bg-white rounded-full">
                             <FontAwesome5 name="arrow-left" size={20} color={"#280e49"} />
                         </TouchableOpacity>
                        <View>
                          <Text className="text-white text-[17px] font-semibold text-center">Course Detail</Text>
                         </View> 
                   </View>
                 </View>
                
                </ScrollView>
                {/* Button Navigation */}
                <BottomScreeenNavigation/>
            </View>

    )

}
 export default CourseDatail;