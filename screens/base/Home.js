import { View, Text ,Image} from 'react-native'

const Home = () => {
    const name ="Tsigie Beyene"
  return (
    <View className="flex-1 px-3 bg-white">
        <View className='flex-1'>
            <View className="bg-[#280e49] p-2 rounded-[8px] mb-3">
               <View className="flex-row items-center justify-between">
                 <Image source={{uri:""}}/>
           </View>
            </View>
            

        </View>
    </View>
  )
}

export default Home;
