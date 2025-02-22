import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'

const add = () => {
  const [showAddTextInput, setShowAddTextInput] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Make New Commitment</Text>
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.question}>What do you want to commit to?</Text>
        <TextInput
          style={styles.input}
          textAlign='left'
          placeholder='Name of your commitment'
        />


        <TouchableOpacity onPressIn={() => { setShowAddTextInput(true) }}>
          <Text style={styles.question}>Add additional note for yourself?</Text>
        </TouchableOpacity>
        {showAddTextInput &&
          <TextInput
            style={styles.input}
            textAlign='left'
            placeholder='Your note'
            multiline={true}
            numberOfLines={5}
          />
        }

        <TouchableOpacity onPress={() => { setShowDatePicker(true) }}>
          <Text style={styles.question}>Do you have a deadline?</Text>
        </TouchableOpacity>
        {showDatePicker &&
          <Text>DatePicker</Text>
        }
      </View>
    </KeyboardAvoidingView>
  )
}

export default add

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  headerContainer: {
    width: '100%',
    padding: 20,
    justifyContent: 'space-between'
  },
  heading: {
    fontFamily: 'bold',
    fontSize: 32,
  },
  small: {
    fontFamily: 'regular',
    fontSize: 12,
    color: 'gray'
  },
  mainContainer: {
    padding: 20,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  question: {
    fontFamily: 'medium',
    fontSize: 20,
    marginTop: 20,

  },
  input: {
    width: '100%',
    height: 54,
    padding: 16,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 16,
    marginVertical: 10,
    fontFamily: 'regular',
    fontSize: 16,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
  }
})