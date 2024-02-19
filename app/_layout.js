import { Stack } from "expo-router";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
// !  SplashScreen use to load the app until the dependcise are loaded (mean hideAsync is called)
SplashScreen.preventAutoHideAsync();

const Layout = () => {
  // todo loading fonts 
  // load fonts from their folders 
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });
  // load fonts to the screens
  const onLayaoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // ! SplashScreen.hideAsync used when the loading is ended 
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return <Stack onLayout={onLayaoutRootView} />;
};

export default Layout;
