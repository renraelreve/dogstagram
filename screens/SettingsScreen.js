import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Header>Settings</Header>
      <Text>Welcome to the Settings Screen</Text>
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
