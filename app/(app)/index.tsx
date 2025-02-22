import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router';
import CircularProgressBar from '@/components/circularProgressBar';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { useFont } from '@shopify/react-native-skia';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const suffixes: { [key: number]: string } = {
  1: 'st',
  2: 'nd',
  3: 'rd'
};

const totalTasks = 9;
const completedTasks = 4;
const radius = 40, strokeWidth = 8;

const home = () => {
  const fullDate = new Date();
  const date = fullDate.getDate();
  const month = fullDate.getMonth();
  const year = fullDate.getFullYear();
  const pickerDates = [
    { date: date - 6, day: daysOfWeek[(fullDate.getDay() - 3) % 7] },
    { date: date - 2, day: daysOfWeek[(fullDate.getDay() - 2) % 7] },
    { date: date - 1, day: daysOfWeek[(fullDate.getDay() - 1) % 7] },
    { date: date, day: daysOfWeek[fullDate.getDay()] },
    { date: date + 1, day: daysOfWeek[(fullDate.getDay() + 1) % 7] },
    { date: date + 2, day: daysOfWeek[(fullDate.getDay() + 2) % 7] },
    { date: date + 3, day: daysOfWeek[(fullDate.getDay() + 3) % 7] },
  ]
  const percentage = useSharedValue(0);
  const end = useSharedValue(0);
  const font = useFont(require('../../assets/fonts/Kanit-LightItalic.ttf'), 20);
  const loadProgressBar = () => {
    const calPercentage = (completedTasks / totalTasks) * 100;
    percentage.value = withTiming(calPercentage, { duration: 2500 });
    end.value = withTiming(calPercentage / 100, { duration: 2500 });
    console.log(totalTasks, completedTasks, calPercentage, percentage.value, end.value);
  }

  const getDayWithSuffix = (date: number) => {

    if (suffixes[date]) {
      return `${date}${suffixes[date]}`;
    }
    return `${date}th`;
  };

  const dayWithSuffix = getDayWithSuffix(date);

  if (!font) {
    return <View />
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


      <View style={styles.picker}>

        {pickerDates.map((item, index) => (
          <TouchableWithoutFeedback key={index}>
            <View style={[styles.pickerItem,{backgroundColor:item.date===date?'#323232':'#ffffff'}]}>
              <Text style={[styles.small, { color: item.date===date?'white':'black' }]}>{item.day}</Text>
              <Text style={[styles.medium, { color: item.date===date?'white':'black' }]}>{item.date}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>




      <View style={styles.banner}>
        <View>
          <Text style={styles.medium}>You are almost there!</Text>
          <Text style={styles.small}>Keep up the good work!</Text>
        </View>
        <CircularProgressBar radius={radius} strokeWidth={strokeWidth} percentage={percentage} end={end} font={font} />
      </View>
      <Text style={[styles.medium, { marginTop: 20, color: 'black' }]}>Today's Tasks</Text>
      <View style={styles.itemContainer}>
        <Text style={[styles.medium, { color: 'black' }]}>Task 1</Text>
        <Pressable>
          <Text style={[styles.medium, { color: 'black' }]}>Done</Text>
        </Pressable>
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
  },
  itemContainer: {
    width: '90%',
    marginTop: 20,
    padding: 20,
    borderRadius: 25,
    elevation: 25,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  picker: {
    width: '100%',
    marginBottom: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row'
  },
  pickerItem: {
    padding: 10,
    borderWidth: 0.8,
    borderColor: 'gray',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
