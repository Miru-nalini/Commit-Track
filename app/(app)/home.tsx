import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth'
import { router } from 'expo-router';

const home = () => {
  const user = auth().currentUser;

  return (
    <View>
      <Text style={styles.heading}>WELCOME BACK!{user?.email}</Text>
      <Button title="Sign out" onPress={() => auth().signOut()} />
    </View>
  )
}

export default home

const styles = StyleSheet.create({
  heading:{
    fontFamily:'bold',
    fontSize:48,
  }
})