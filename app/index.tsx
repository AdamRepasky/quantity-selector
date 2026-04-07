import { StyleSheet, View } from "react-native";
import FoodProductDemo from "../components/FoodProductDemo";

export default function Index() {
  return (
    <View style={styles.container}>
      <FoodProductDemo
        name="Sample Food Product"
        price={9.99}
        initialQuantity={55}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
