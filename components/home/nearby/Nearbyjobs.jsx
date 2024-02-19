import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

import { COLORS, SIZES } from "../../../constants";
import styles from "./nearbyjobs.style";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hook/useFetch";

const Nearbyjobs = () => {
  const router = useRouter();
  const param = {
    query: "Web Devlopper",
    page: "1",
    num_pages: "1",
  };
  const { data, isLoading, error } = useFetch("search", param);

  return (
    // todo popular jobs header =========================
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearbyjobs jobs</Text>
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
          // data?.map(...) : the (?.) is used to check if the 'data' arra exist and not null or undifinde, if it's null the map() won't be called
          // ! map(...) => used to repeat each element of the array and creat a new array
          // * job={job} :  pass the 'job' object as a prop of <NearbyjobCard/> to display info from 'job' object
          // *  key={`neaby-job-${job?.job_id}`} :  assigns a unique key to each <NearbyjobCard/> component
          // * andleNavigate={()} : navigate a specific route using "router.push()"
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job?.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
