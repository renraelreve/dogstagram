import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  FlatList,
  Alert,
  ImageBackground,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import uuid from "react-native-uuid";
import Ionicons from "@expo/vector-icons/Ionicons";

// For using custom fonts
import {
  Rubik_400Regular,
  Rubik_700Bold,
  useFonts,
} from "@expo-google-fonts/rubik";
import * as SplashScreen from "expo-splash-screen";

import axios from "axios";

import Button from "./components/Button";
import { Colors } from "./styles/colors";

const API_URL = "https://dog.ceo/api/breeds/image/random";

const deviceWidth = Dimensions.get("window").width;

// const test = 1;

const renderDogItem = ({ item }) => (
  <Image source={{ uri: item.url }} style={styles.dogImage} />
);

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [dogs, setDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);

  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  const getDog = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL);
      setDogs((prevDogs) => [
        ...prevDogs,
        { id: uuid.v4(), url: response.data.message },
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToEnd = () => flatListRef.current.scrollToEnd({ animated: true });

  const handleClearDogs = () => {
    if (dogs.length === 0) {
      Alert.alert("Clear Dogs", "No dogs to clear!", [
        {
          text: "Ok",
        },
      ]);

      return;
    }

    Alert.alert("Clear Dogs", "Are you sure you want to clear all dogs?", [
      {
        text: "Cancel",
      },
      {
        text: "Ok",
        // style: "destructive",
        onPress: () => setDogs([]),
      },
    ]);
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <LinearGradient
        colors={[Colors.PRIMARY_LIGHT_2, Colors.PRIMARY_LIGHT_1]}
        style={{ flex: 1 }}
      >
        <ImageBackground
          source={require("./assets/images/wallpaper.jpg")}
          style={{ flex: 1 }}
          imageStyle={{ opacity: 0.05 }}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
              <Text style={styles.appHeader}>
                🐶 Dogstagram{" "}
                <Ionicons name="checkmark-circle" size={32} color="green" />
              </Text>
              <Text style={styles.welcomeText}>Welcome! Get a dog!</Text>
              <View style={styles.buttonsContainer}>
                <Button onPress={getDog}>Get Dog</Button>
                <Button onPress={handleClearDogs}>Clear</Button>
              </View>
              <View style={styles.dogsContainer}>
                {/* <ScrollView ref={scrollViewRef} onContentSizeChange={scrollToEnd}>
                {dogs.map((dog) => (
                  <Image
                    key={dog.id}
                    source={{ uri: dog.url }}
                    style={styles.dogImage}
                  />
                ))}
              </ScrollView> */}
                <FlatList
                  ref={flatListRef}
                  onContentSizeChange={scrollToEnd}
                  data={dogs}
                  renderItem={renderDogItem}
                  // To tell FlatList use id as the key
                  keyExtractor={(dog) => dog.id}
                  numColumns={3}
                />

                {isLoading && (
                  <ActivityIndicator size="large" color={Colors.PRIMARY} />
                )}
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appHeader: {
    fontFamily: "Rubik_700Bold",
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: Colors.PRIMARY,
  },
  welcomeText: {
    fontFamily: "Rubik_400Regular",
    textAlign: "center",
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 20,
    justifyContent: "center",
  },
  dogsContainer: {
    flex: 1,
    // alignItems: "center",
  },
  dogImage: {
    // width: "100%",
    // aspectRatio: 1,
    width: deviceWidth / 3,
    height: deviceWidth / 3,
    // width: deviceWidth * 0.95,
    // height: deviceWidth * 0.95,
    // borderRadius: 10,
    // marginBottom: 10,
    borderWidth: 1,
    borderColor: "white",
  },
});
