import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header>Home</Header>
      <Text>Welcome to the Home Screen</Text>
    </View>
  );
}

export default HomeScreen;

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
