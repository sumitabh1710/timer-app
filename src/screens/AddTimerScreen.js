import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TimerContext } from "../context/TimerContext";

export default function AddTimerScreen({ navigation }) {
  const { addTimer } = useContext(TimerContext);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("Workout");

  const handleAddTimer = async () => {
    if (!name.trim()) {
      ToastAndroid.show("Please enter a timer name!", ToastAndroid.SHORT);
      return;
    }

    const parsedDuration = parseInt(duration, 10);
    if (isNaN(parsedDuration) || parsedDuration <= 0) {
      ToastAndroid.show("Please enter a valid duration!", ToastAndroid.SHORT);
      return;
    }

    const newTimer = {
      id: Date.now().toString(),
      name,
      duration: parsedDuration,
      category,
      status: "Paused",
      remaining: parsedDuration,
      isRunning: false,
    };

    addTimer(newTimer);

    ToastAndroid.show("Timer Added Successfully!", ToastAndroid.SHORT);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Timer Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Duration (seconds)"
        value={duration}
        onChangeText={(text) => setDuration(text.replace(/[^0-9]/g, ""))}
        keyboardType="numeric"
        style={styles.input}
      />
      <Picker
        selectedValue={category}
        onValueChange={setCategory}
        style={styles.picker}
      >
        <Picker.Item label="Workout" value="Workout" />
        <Picker.Item label="Study" value="Study" />
        <Picker.Item label="Break" value="Break" />
      </Picker>
      <Button title="Add Timer" onPress={handleAddTimer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 60 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: "#aaa",
  },
  picker: {
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#aaa",
  },
});
