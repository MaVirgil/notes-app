import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import * as ImagePicker from 'expo-image-picker';
import { storage } from "../lib/firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import PageWrapper from '../components/PageWrapper';
import Button from '../components/Button';
import { NOTE_MAX_LENGTH } from '../lib/constants';

export default function NoteDetails({ route }) {
  const [ note, setNote ] = useState(route.params.note);
  const [imagePath, setImagePath] = useState(null);
  const [imageEdited, setImageEdited] = useState(false);
  const navigation = useNavigation();

  const storageRef = ref(storage, `/note_attachments/${note.id}.png`);

  useEffect(() => {

    if (!note.imageStoragePath) {
      return;
    }

    let active = true;
    async function fetchImage() {
      try {
        const result = await getDownloadURL(ref(storage, note.imageStoragePath));

        if (active) {
          setImagePath(result);
        }

      } catch (error) {
        console.log('An error occured when fetching image: ', error);
      }
    }

    fetchImage();

    return () => {
      active = false;
    }
  },[]);

  async function handleAddImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
    });

    if (result.canceled) {
      return;
    }

    setImagePath(result.assets[0].uri);
    setImageEdited(true);
  }

  async function handleSave() {

    if (imageEdited) {
      const newImagePath = `note_attachments/${note.id}`;
      note.imageStoragePath = newImagePath;
      console.log('uploading image to firebase...');
      await uploadImage(newImagePath);
    }

    route.params.onSave(note);
    navigation.goBack();
  }

  async function uploadImage(toUploadPath) {
    const result = await fetch(imagePath);
    const blob = await result.blob();

    const storageRef = ref(storage, toUploadPath);
    uploadBytes(storageRef, blob)
    .then((snapshot) => {
      console.log("Image uploaded");
      setImagePath(null);
    }).catch((error) => {
      console.log('An error occured while uploading image: ', error);
    });
  }

  return (
    <PageWrapper>
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSave} />
        <Button
          title={imagePath ? "Replace image" : "Add image"}
          onPress={handleAddImage}
        />
      </View>
      <View style={{ marginVertical: 20 }}>
        <TextInput
          style={styles.noteEditField}
          multiline={true}
          maxLength={NOTE_MAX_LENGTH}
          onChangeText={(value) =>
            setNote((prev) => ({ ...prev, text: value }))
          }
          value={note.text}
        ></TextInput>
      </View>
      {true && (
        <Image
          style={{ width: 150, height: 150 }}
          source={{ uri: imagePath }}
        />
      )}
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  noteEditField: {
    backgroundColor: "#ebf9ff",
    borderRadius: 15,
    paddingHorizontal: 30,
    paddingVertical: 15,
    width: 300,
    height: 190,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 30
  }
});