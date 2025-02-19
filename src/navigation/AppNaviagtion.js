import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import AddTimerScreen from "../screens/AddTimerScreen";
import HistoryScreen from "../screens/HistoryScreen";
import { TimerProvider } from "../context/TimerContext";
import BottomNav from "../navigation/BottomNav";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [selectedTab, setSelectedTab] = useState("Home");

  return (
    <TimerProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Home"
        >
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen name="AddTimer" component={AddTimerScreen} />
          <Stack.Screen name="History">
            {(props) => <HistoryScreen {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
        <BottomNav selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </NavigationContainer>
    </TimerProvider>
  );
};

export default AppNavigator;
