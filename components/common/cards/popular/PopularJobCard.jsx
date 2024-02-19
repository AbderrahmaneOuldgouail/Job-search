import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./popularjobcard.style";

import { checkImageURL } from "../../../../utils";

const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedJob, item)}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
        <Image
          source={{
            // * check if employer_logo exist with checkImageURL(), if not put the default logo
            uri: checkImageURL(item.employer_logo)
              ? item.employer_logo
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqqRnh6PsAZgu9vt5FvjicBMMZN605Pw9t_M30JL09vMNvJ8lU&s",
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>

      {/* bring the company name from the api and put it into the text component  */}
      <Text style={styles.companyName} numberOfLines={1}>
        {item.employer_name}
      </Text>

      {/* bring the job_title from the api and put it into the text component  */}
      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>
          {item.job_title}
        </Text>

        {/* bring the job_country from the api and put it into the text component  */}
        <Text style={styles.location}>{item.job_country}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
