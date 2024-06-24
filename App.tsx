import { SafeAreaView, StatusBar } from "react-native";
import Navigation from "./src/navigation/Navigation";
import { styles } from "./src/assets/styles";

export default function App() {
  return (
    <SafeAreaView style={styles.white_container}>
      <StatusBar />
      <Navigation />
    </SafeAreaView>
  );
}
