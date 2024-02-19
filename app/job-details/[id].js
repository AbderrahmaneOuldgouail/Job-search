import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Share,
  Alert,
} from "react-native";
import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import { useCallback, useState } from "react";

// importing components to render it in the job-details screen
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";

// job details tabs
const tabs = ["About", "Qualifications", "Responsibilities"];
// todo JobDetails component 
const JobDetails = () => {
  // recive the id of the job chose
  const params = useGlobalSearchParams();
  const router = useRouter();

    const onShare = async () => {
      try {
        const result = await Share.share({
          message:
            "React Native | A framework for building native apps using React",
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        Alert.alert(error.message);
      }
    };

  // fetching data from the api
  const { data, isLoading, error, refetch } = useFetch("job-details", {
    job_id: params.id,
  });

  // a state to set the refreching to true when the user refrech the page
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  // ! onRefresh => used to set refetch the the data from the api
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  // * used to show the user the active tab and the informations of the tab selected whene it called
  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifics
            title="Qualifications"
            points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
          />
        );
        break;
      case "About":
        return (
          <JobAbout
            title="About"
            info={data[0].job_description ?? "No data provided"}
          />
        );
        break;
      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities"
            points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );
        break;
    }
  };

  // todo start of the saveAreaView where to render the about, qualifications and responsibilities components
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      {/* make a specific header for the job details */}
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlepress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimension="60%"
              handlepress={() => onShare()}
            />
          ),
          headerTitle: "Go back",
        }}
      />

      <>
        {/* this scrollView used to refrsh data if necissary  */}
        <ScrollView
          showsHorizontalScrollIndicator={false}
          RefreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Somthing was wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              {/* // todo start the company component ==============================
               */}
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                Location={data[0].job_country}
              />
              {/* // todo start the JobTabs component ==============================
               */}
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {/* // todo start the the JobAbout/Specifics component by calling the displacTabContent to show them ==============================
               */}
              {displayTabContent()}
            </View>
          )}
        </ScrollView>
        {/* // todo start the JobFooter component
         */}
        <JobFooter
          url={
            data[0]?.job_google_link ?? "https://careers.google.com/jobs/result"
          }
        />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
