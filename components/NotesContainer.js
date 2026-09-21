import { StyleSheet, View, Text, FlatList } from "react-native";
import Note from "./Note";

export default function NotesContainer({ notes, onSave, onDelete }) {
  console.log(`recieved notes: ${JSON.stringify(notes)}`);
  return (
    <View>
      <Text style={{ fontSize: 17, fontWeight: "bold", textAlign: "center"}}>Your Notes:</Text>
      <View style={styles.notesContainer}>
        <FlatList
          data={notes}
          renderItem={({ item }) => (
            <Note
              key={item.id}
              note={item}
              onSave={onSave}
              onDelete={() => onDelete(item.id)}
            />
          )}
          contentContainerStyle={styles.notesContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notesContainer: {
    marginTop: 10,
    gap: 10,
  },
});
