# Timer App

This is a React Native Timer App that allows users to create multiple timers and run them independently. It supports pausing, resuming, and restarting timers, while ensuring that each timer maintains its own state correctly.

---

## Setup Instructions

### 1. Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- [Android Studio](https://developer.android.com/studio) (for Android emulation)
- [Xcode](https://developer.apple.com/xcode/) (for iOS development, macOS only)

### 2. Clone the Repository
```sh
git clone https://github.com/your-username/timer-app.git
cd timer-app
```

### 3. Install Dependencies
```sh
npm install
```

### 4. Run the App
#### For Android:
```sh
npx react-native run-android
```
#### For iOS (Mac only):
```sh
cd ios && pod install && cd ..
npx react-native run-ios
```

---

## Features
- Add multiple timers with a name and duration.
- Start, pause, and restart timers independently.
- Persist timer data using AsyncStorage.
- Maintain independent states for each timer.
- Automatically update the UI based on timer status.

---

## Assumptions Made During Development
- **Timers should work independently**: Each timer should have its own interval and not affect other timers.
- **Timers should persist across app restarts**: Timers are saved in AsyncStorage and restored when the app is reopened.
- **Timers update every second**: The UI updates every second when a timer is running.
- **Paused timers should not reset**: When a timer is paused, it retains its remaining time.
- **Only one interval per timer**: Using `useRef` ensures each timer runs its own interval without affecting others.
- **Status handling should be consistent**: Timers have three states: `Running`, `Paused`, and `Completed`.

---

## Folder Structure
```
/timer-app
│── /src
│   ├── /components
│   │   ├── TimerItem.js   # Renders a single timer
│   ├── /context
│   │   ├── TimerContext.js # Manages global timer state
│   ├── App.js  # Main entry point
│── package.json
│── README.md
```

---

## Troubleshooting
- **Timers not updating?** Ensure the context is properly set up and `useRef` is used for intervals.
- **Timers resetting unexpectedly?** Check if AsyncStorage is properly storing timer data.
- **App not running on Android?** Run `npx react-native start` before `npx react-native run-android`.

---

## License
This project is licensed under the MIT License.

