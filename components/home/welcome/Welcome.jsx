import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";

const jobTypes = ["Full-time", "Part-time", "Contractor"];

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState("Full-time");

  return (
    // todo user name and welcom message =======================
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Abdou Ould</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>

      <View // todo search bar ==================================
        style={styles.searchContainer}
      >
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => {
              setSearchTerm(text);
            }}
            placeholder="What are you looking for?"
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMod="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View // todo categories ====================================
        style={styles.tabsContainer}
      >
        <FlatList
          // data to render it with renderItem
          data={jobTypes}
          // ! renderItem =>  Takes an item from data and renders it into the list
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          // specific the direction of the flatlist
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
