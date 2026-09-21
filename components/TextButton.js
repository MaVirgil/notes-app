import { Pressable, Text } from "react-native";

export default function TextButton({ title, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Text style={{ color: "#e25159", textDecorationLine: "underline" }}>{title}</Text>
    </Pressable>
  );
}