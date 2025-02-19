import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { TimerContext } from "../context/TimerContext";
import TimerItem from "../components/TimerItem";
import { useNavigation } from "@react-navigation/native";
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';

const HomeScreen = () => {
  const { timers } = useContext(TimerContext);
  const navigation = useNavigation();
  const [expandedCategories, setExpandedCategories] = useState({});

  const groupedTimers = timers.reduce((acc, timer) => {
    if (!acc[timer.category]) {
      acc[timer.category] = [];
    }
    acc[timer.category].push(timer);
    return acc;
  }, {});

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <View style={styles.container}>
      <Button
        title="Add Timer"
        onPress={() => navigation.navigate("AddTimer")}
      />

      <FlatList
        data={Object.keys(groupedTimers)}
        keyExtractor={(category) => category}
        renderItem={({ item: category }) => (
          <View style={styles.categoryContainer}>
            <TouchableOpacity
              onPress={() => toggleCategory(category)}
              style={styles.categoryHeader}
            >
              <Text style={styles.categoryText}>{category}</Text>
              <Text style={styles.toggleText}>
                {expandedCategories[category] ? (
                  <AntDesign name="caretdown" size={20} color="white" />
                ) : (
                  <AntDesign name="caretup" size={20} color="white" />
                )}
              </Text>
            </TouchableOpacity>
            {expandedCategories[category] &&
              groupedTimers[category].map((timer) => (
                <TimerItem key={timer.id} timer={timer} />
              ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 60,
    gap: 20,
  },
  categoryContainer: {
    marginBottom: 10,
    backgroundColor: "#ddd",
    borderRadius: 8,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    padding: 15,
    backgroundColor: "#444",
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  toggleText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default HomeScreen;
