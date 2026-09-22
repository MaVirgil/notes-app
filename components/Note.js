import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import TextButton from "./TextButton";
import { NOTE_PREVIEW_LENGTH_LIMIT } from "../lib/constants";

export default function Note({ note, onSave, onDelete }) {
  const navigation = useNavigation();

  return (
    <View style={styles.noteContainer}>
      <Text style={{ fontSize: 17 }}>
        ●{" "}
        {note.text.length <= NOTE_PREVIEW_LENGTH_LIMIT
          ? note.text
          : `${note.text.substring(0, NOTE_PREVIEW_LENGTH_LIMIT)}...`}
      </Text>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <TextButton
          title="Edit"
          onPress={() => {
            navigation.navigate("Details", {
              note,
              onSave,
            });
          }}
        />
        <TextButton title="Delete" onPress={onDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  noteContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
});
