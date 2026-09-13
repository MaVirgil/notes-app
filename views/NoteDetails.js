import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import PageWrapper from '../components/PageWrapper';
import Button from '../components/Button';
import { useState } from 'react';

export default function NoteDetails({ route }) {
  const [ inputValue, setInputValue ] = useState(route.params.note);
  const navigation = useNavigation();

  return (
    <PageWrapper>
      <View>
        <TextInput
          multiline={true}
          onChangeText={(value) => setInputValue(value)}
          value={inputValue}

        >
        </TextInput>
      </View>
      <Button title="save" onPress={() => {
        console.log("Saving note...");
        route.params.onSave(inputValue);
        navigation.goBack();
      }}/>
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  noteEditField: {

  }
});