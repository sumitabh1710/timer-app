import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function BottomNav({ selectedTab, setSelectedTab }) {
  const navigation = useNavigation();

  const handleNavigation = (screen) => {
    setSelectedTab(screen);
    navigation.navigate(screen);
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        onPress={() => handleNavigation("Home")}
        style={[styles.navButton, selectedTab === "Home" && styles.activeTab]}
      >
        <Text style={[styles.navText, selectedTab === "Home" && styles.activeText]}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleNavigation("History")}
        style={[styles.navButton, selectedTab === "History" && styles.activeTab]}
      >
        <Text style={[styles.navText, selectedTab === "History" && styles.activeText]}>
          History
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#222",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  navButton: {
    padding: 10,
  },
  navText: {
    color: "#fff",
    fontSize: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
  },
  activeText: {
    fontWeight: "bold",
  },
});
