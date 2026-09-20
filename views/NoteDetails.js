import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import PageWrapper from '../components/PageWrapper';
import Button from '../components/Button';
import { useState } from 'react';

export default function NoteDetails({ route }) {
  const [ note, setNote ] = useState(route.params.note);
  const navigation = useNavigation();

  return (
    <PageWrapper>
      <View>
        <TextInput
          multiline={true}
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

  }
});