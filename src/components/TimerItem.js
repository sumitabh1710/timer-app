import React, { useContext, useState, useEffect } from "react";
import { View, Text, Pressable, ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TimerContext } from "../context/TimerContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const TimerItem = ({ timer }) => {
  const { updateTimer } = useContext(TimerContext);
  const [remaining, setRemaining] = useState(timer.remaining ?? timer.duration);
  const [isRunning, setIsRunning] = useState(timer.isRunning);
  const intervalRef = React.useRef(null); // ✅ Store interval per timer

  useEffect(() => {
    const loadRemainingTime = async () => {
      const storedTime = await AsyncStorage.getItem(`timer_${timer.id}`);
      if (storedTime !== null) {
        setRemaining(parseInt(storedTime, 10));
      }
    };
    loadRemainingTime();
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setIsRunning(false);

            const completionTime = new Date().toLocaleString();
            saveToHistory(timer.name, completionTime);

            updateTimer(timer.id, { isRunning: false, status: "Completed", remaining: 0 });
            AsyncStorage.setItem(`timer_${timer.id}`, "0");

            return 0;
          }

          const newTime = prev - 1;
          AsyncStorage.setItem(`timer_${timer.id}`, newTime.toString());
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  const saveToHistory = async (name, completionTime) => {
    try {
      const history = await AsyncStorage.getItem("history");
      const historyArray = history ? JSON.parse(history) : [];
      historyArray.push({ name, completionTime });
      await AsyncStorage.setItem("history", JSON.stringify(historyArray));
    } catch (error) {
      console.error("Error saving history:", error);
    }
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
    updateTimer(timer.id, { isRunning: !isRunning, status: isRunning ? "Paused" : "Running" });
    ToastAndroid.show(`Timer ${isRunning ? "Paused" : "Started"}!`, ToastAndroid.SHORT);
  };

  const handleRestart = async () => {
    setRemaining(timer.duration);
    setIsRunning(false);
    updateTimer(timer.id, { isRunning: false, status: "Idle", remaining: timer.duration });
    await AsyncStorage.setItem(`timer_${timer.id}`, timer.duration.toString());
    ToastAndroid.show("Timer Restarted!", ToastAndroid.SHORT);
  };

  return (
    <View
      style={{
        padding: 20,
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10,
        borderColor: "#aaa",
      }}
    >
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Text>{timer.name}</Text>
        <Text>Time Left: {remaining}s</Text>
        <Text>Status: {timer.status}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Pressable onPress={handleStartPause}>
          <AntDesign name={isRunning ? "pause" : "caretright"} size={24} color="black" />
        </Pressable>
        <Pressable onPress={handleRestart}>
          <MaterialCommunityIcons name="restart" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

export default TimerItem;
