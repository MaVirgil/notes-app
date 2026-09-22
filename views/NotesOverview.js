import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Pressable, FlatList, Image } from "react-native";
import { collection, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { database } from "../lib/firebase";
import PageWrapper from "../components/PageWrapper";
import Button from "../components/Button";
import NotesContainer from "../components/NotesContainer";

export default function NotesOverview() {
  const [inputValue, setInputValue] = useState("");
  const [values, loading, error] = useCollection(collection(database, "notes"));
  const [imagePath, setImagePath] = useState(null);

  const noteData = values?.docs.map((d) => ({ id: d.id, ...d.data() })) ?? [];

  async function handleAdd() {
    try {
      await addDoc(collection(database, "notes"), {
        text: inputValue,
      });
    } catch (error) {
      console.log(error);
    }
    setInputValue("");
  }

  async function handleUpdate(toSave) {
    await updateDoc(doc(database, "notes", toSave.id), {
      ...toSave,
    });
  }

  async function handleDelete(id) {
    await deleteDoc(doc(database, "notes", id));
  }

  return (
    <PageWrapper>
      <View style={styles.addNoteContainer}>
        <View style={styles.heroTitleContainer}>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Notes App</Text>
        </View>
        <TextInput
          onChangeText={(value) => setInputValue(value)}
          value={inputValue}
          placeholder="write a note..."
          maxLength={100}
          style={styles.noteInput}
        />
        <Button title="Add Note" onPress={handleAdd} />
        <NotesContainer
          notes={noteData}
          onSave={(editedNote) => handleUpdate(editedNote)}
          onDelete={(id) => handleDelete(id)}
        />
      </View>
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  addNoteContainer: {
    gap: 20,
    marginTop: 80,
    alignContent: "center",
  },
  heroTitleContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  noteInput: {
    backgroundColor: "#ebf9ff",
    borderRadius: 15,
    paddingHorizontal: 30,
    paddingVertical: 15,
    width: 300,
  },
  addButton: {
    alignItems: "center",
    backgroundColor: "#e25159",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
});
