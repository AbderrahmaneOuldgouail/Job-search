import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./nearbyjobcard.style";

import { checkImageURL } from "../../../../utils";

const NearbyJobCard = ({ job, handleNavigate }) =>{
  return (
    <TouchableOpacity style={styles.container} onPress={() => handleNavigate()}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            // * check if employer_logo exist with checkImageURL(), if not put the default logo
            uri: checkImageURL(job.employer_logo)
              ? job.employer_logo
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqqRnh6PsAZgu9vt5FvjicBMMZN605Pw9t_M30JL09vMNvJ8lU&s",
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      {/* bring the job_title from the api and put it into the text component  */}
      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {job.job_title}
        </Text>

        {/* bring the job_employment_type from the api and put it into the text component  */}
        <Text style={styles.jobType}>{job.job_employment_type}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyJobCard;
