import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import Button from "../components/Button";

export default function Note({ note, onSave, onDelete }) {
  const NOTE_PREVIEW_LENGTH_LIMIT = 25;
  const navigation = useNavigation();

  return (
    <View style={styles.noteContainer}>
      <Text style={{ fontSize: 17 }}>● {
        note.length <= NOTE_PREVIEW_LENGTH_LIMIT 
          ? note 
          : `${note.substring(0, NOTE_PREVIEW_LENGTH_LIMIT)}...`
      }</Text>
      <Button
        title="Edit"
        onPress={() => {
          navigation.navigate("Details", {
            note,
            onSave,
          });
        }}
      />
      <Button
        title="delete"
        onPress={() => onDelete()}
      />
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
