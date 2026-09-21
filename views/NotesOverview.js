import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Pressable, FlatList, Image } from "react-native";
import { collection, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { firebase, database, storage } from "../lib/firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import PageWrapper from "../components/PageWrapper";
import Note from "../components/Note";
import Button from "../components/Button";

export default function NotesOverview() {
  const [inputValue, setInputValue] = useState("");
  const [values, loading, error] = useCollection(collection(database, "notes"));
  const [imagePath, setImagePath] = useState(null);

  const data = values?.docs.map((d) => ({ id: d.id, ...d.data() })) ?? [];

  async function handleAddBtnPress() {
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
      text: toSave.text,
    });
  }

  async function handleDelete(id) {
    await deleteDoc(doc(database, "notes", id));
  }

  async function handleImagePicker() {

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
    });

    if (result.canceled) {
      return;
    }

    setImagePath(result.assets[0].uri);
  }

  async function handleUploadPress() {
    const result = await fetch(imagePath);
    const blob = await result.blob();

    const storageRef = ref(storage, "screenshot.png");
    uploadBytes(storageRef, blob)
    .then((snapshot) => {
      console.log("Image uploaded");
      setImagePath(null);
    }).catch((error) => {
      console.log('An error occured while uploading image: ', error);
    });
  }

  async function handleFetchImage() {
    try {
      const result = await getDownloadURL(ref(storage, "screenshot.png"));
      setImagePath(result);
    } catch (error) {
      console.log('Couldn\'t fetch image', error);
    }
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
        <Button title="Add Note" onPress={handleAddBtnPress}/>
        {imagePath &&
          <>
            <Image style={{ width: 150, height: 150 }}source={{ uri: imagePath }} />
            <Button title="upload" onPress={handleUploadPress}/>
          </>
        }
        <Button onPress={handleFetchImage} title="Fetch Image"/>
        <Button title="Add Image" onPress={handleImagePicker}/>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>Your Notes:</Text>
        <View style={styles.notesContainer}>
          <FlatList
            data={data}
            renderItem={({ item }) => 
              <Note 
                key={item.id}
                note={item}
                onSave={(newNote) => handleUpdate(newNote)}
                onDelete={() => handleDelete(item.id)}
              />
            }
          />
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
