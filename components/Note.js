import { Pressable, StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";

export default function Note({ textValue }) {
  return (
    <View style={styles.noteContainer}>
      <Text style={{ fontSize: 17 }}>● {textValue}</Text>
            <Button title="Edit" />
    </View>
  );
}

const styles = StyleSheet.create({
  noteContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
