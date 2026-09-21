import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import PageWrapper from '../components/PageWrapper';
import Button from '../components/Button';
import { NOTE_MAX_LENGTH } from '../lib/constants';
import { useState } from 'react';

export default function NoteDetails({ route }) {
  const [ note, setNote ] = useState(route.params.note);
  const navigation = useNavigation();

  return (
    <PageWrapper>
      <View style={{ marginVertical: 20 }}>
        <TextInput
          style={styles.noteEditField}
          multiline={true}
          maxLength={NOTE_MAX_LENGTH}
          onChangeText={(value) => setNote((prev) => ({...prev, text: value}))}
          value={note.text}
        >
        </TextInput>
      </View>
      <Button title="save" onPress={() => {
        route.params.onSave(note);
        navigation.goBack();
      }}/>
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
  }
});