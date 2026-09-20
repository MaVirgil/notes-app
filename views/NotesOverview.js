import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { firebase, database } from "../lib/firebase";
import PageWrapper from "../components/PageWrapper";
import Note from "../components/Note";

export default function NotesOverview() {
  const [inputValue, setInputValue] = useState("");
  const [notes, setNotes] = useState([]);
  const [values, loading, error] = useCollection(collection(database, "notes"));

  const data = values?.docs.map((d) => ({ id: d.id, ...d.data() })) ?? [];
  console.log(data);

  async function handleAddBtnPress() {
    //setNotes([inputValue, ...notes]);
    try {
      await addDoc(collection(database, "notes"), {
        text: inputValue,
      });
    } catch (error) {
      console.log(error);
    }
    setInputValue("");
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
        <Pressable onPress={() => handleAddBtnPress()} style={styles.addButton}>
          <Text>Add Note</Text>
        </Pressable>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>Your Notes:</Text>
        <View style={styles.notesContainer}>
          {data.map((note) => {
            return (
              <Note
                key={note.id}
                note={note.text}
                onSave={(toSave) =>
                  setNotes((prev) =>
                    prev.map((item, noteIndex) => {
                      return noteIndex === index ? toSave : item;
                    }),
                  )
                }
              />
            );
          })}
        </View>
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
  notesContainer: {
    marginTop: 20,
    gap: 10,
  },
});
