import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hook/useFetch";
import { useState } from "react";

const Popularjobs = () => {
  const router = useRouter();
  const param = {
    query: "Web Devlopper",
    page: "1",
    num_pages: "1",
  };
  const { data, isLoading, error } = useFetch("search", param);

  const [selectedJob, setSelectedJob] = useState();

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id)
  }

  return (
    // todo popular jobs header =========================
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View // todo popular jobs cards
        style={styles.cardsContainer}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Somthing was wrong</Text>
        ) : (
          <FlatList
            // data to render it with renderItem
            data={data}
            // ! renderItem =>  Takes an item from data and renders it into the list
            renderItem={({ item }) => (
            <PopularJobCard 
            item={item}
            selectedJob={selectedJob}
            handleCardPress={handleCardPress}
            />)}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          
          />
        )}
      </View>
    </View>
  );
};
export default Popularjobs;
