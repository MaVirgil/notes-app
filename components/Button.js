import { StyleSheet, Pressable, Text } from "react-native";

export default function Button({ title, onPress }) {
  return (
    <Pressable
      style={styles.button}
      onPress={() => onPress()}
    >
      <Text>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#e25159",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  }
});