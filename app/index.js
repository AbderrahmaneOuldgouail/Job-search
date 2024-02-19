import { useState } from "react";
import { View, ScrollView, SafeAreaView, Text } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";


const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('')
  return (
    // * SafeAreaView => make your app visible corectly without being covered by hardwares
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen //todo ======= nav bar component ========
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false, //  make the default shadow of the header invisible
          // * headerLeft => pre definded function to show left header
          headerLeft: () => (
            // * ScreenHeaderBtn => component of the menu icon
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          // * headerRight => pre definded function to show right header
          headerRight: () => (
            // * ScreenHeaderBtn => component of the profile image
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          ),
          headerTitle: "",
        }}
      />
        {/* // todo =========== home body screen  ============
         */}
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`);
              }
            }}
          />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
