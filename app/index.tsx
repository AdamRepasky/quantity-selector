import { StyleSheet, View } from "react-native";
import FoodProductDemo from "../components/FoodProductDemo";

export default function Index() {
  return (
    <View style={styles.container}>
      {/* TODO: Replace with actual demo data */}
      <FoodProductDemo
        name="Sample Food Product"
        price={9.99}
        initialQuantity={55}
        onSave={(quantity) => console.log("Saved quantity:", quantity)}
        onCancel={() => console.log("Cancelled")}
      />
    </View>
  );
}

// TODO: Implement proper styling for the main screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
