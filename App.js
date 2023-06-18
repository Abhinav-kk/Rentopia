import { StatusBar } from 'expo-status-bar';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import Navigator from './navigator/navigator';
export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <Navigator />
  );
}

const styles = StyleSheet.create({
});
