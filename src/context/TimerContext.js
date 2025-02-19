import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timers, setTimers] = useState([]);

  useEffect(() => {
    const loadTimers = async () => {
      const storedTimers = await AsyncStorage.getItem("timers");
      if (storedTimers) {
        setTimers(JSON.parse(storedTimers));
      }
    };
    loadTimers();
  }, []);

  const saveTimers = async (newTimers) => {
    setTimers(newTimers);
    await AsyncStorage.setItem("timers", JSON.stringify(newTimers));
  };

  const addTimer = async (newTimer) => {
    const updatedTimers = [...timers, newTimer];
    setTimers(updatedTimers);
    await AsyncStorage.setItem("timers", JSON.stringify(updatedTimers));
  };

  const updateTimer = async (id, updatedFields) => {
    const updatedTimers = timers.map((timer) =>
      timer.id === id ? { ...timer, ...updatedFields } : timer
    );
    setTimers(updatedTimers);
    await AsyncStorage.setItem("timers", JSON.stringify(updatedTimers));
  };

  const deleteTimer = (id) => {
    saveTimers(timers.filter((t) => t.id !== id));
  };

  return (
    <TimerContext.Provider
      value={{ timers, addTimer, updateTimer, deleteTimer }}
    >
      {children}
    </TimerContext.Provider>
  );
};
