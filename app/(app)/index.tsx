import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router';
import CircularProgressBar from '@/components/circularProgressBar';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { useFonts,Kanit_200ExtraLight_Italic } from '@expo-google-fonts/kanit';
import { useFont } from '@shopify/react-native-skia';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const suffixes: { [key: number]: string } = {
  1: 'st',
  2: 'nd',
  3: 'rd',
  21: 'st',
  22: 'nd',
  23: 'rd',
  31: 'st'
};
const totalTasks = 9;
const completedTasks = 4;
const radius = 40, strokeWidth = 8;

const home = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const percentage = useSharedValue(0);
  const end = useSharedValue(0);
  const font = useFont(require('../../assets/fonts/Kanit-LightItalic.ttf'),20);
  const loadProgressBar = () => {
    const calPercentage = (completedTasks / totalTasks) * 100;
    percentage.value = withTiming(calPercentage, { duration: 2500 });
    end.value = withTiming(calPercentage / 100, { duration: 2500 });
    console.log(totalTasks, completedTasks, calPercentage, percentage.value, end.value);
  }

  const getDayWithSuffix = (day: number) => {
    if (suffixes[day]) {
      return `${day}${suffixes[day]}`;
    }
    return `${day}th`;
  };

  const dayWithSuffix = getDayWithSuffix(day);

  if (!font) {
    return  <View/>
  }
  loadProgressBar();

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.heading}>My Commitments</Text>
          <TouchableOpacity onPress={() => router.push('/(app)/add')}>
            <Ionicons name='add' size={48} color='black' />
          </TouchableOpacity>
        </View>
        <Text style={styles.small}>{dayWithSuffix} {months[month]} {year}</Text>
      </View>
      <View style={styles.banner}>
        <View>
          <Text style={styles.medium}>You are almost there!</Text>
          <Text style={styles.small}>Keep up the good work!</Text>
        </View>
        <CircularProgressBar radius={radius} strokeWidth={strokeWidth} percentage={percentage} end={end} font={font}/>
      </View>
      
    </KeyboardAvoidingView>
  )
}

export default home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  headerContainer: {
    width: '100%',
    padding:20,
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
  banner: {
    width: '90%',
    backgroundColor: '#323232',
    marginTop: 10,
    padding: 20,
    borderRadius: 25,
    elevation: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  medium: {
    fontFamily: 'medium',
    fontSize: 20,
    color: 'white'
  }
})
