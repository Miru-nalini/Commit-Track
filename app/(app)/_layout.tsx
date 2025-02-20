import { Tabs } from 'expo-router';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle:{
          backgroundColor:'#ffffff',
          height:70,
          paddingTop:15,
          borderTopColor:'#cecece',
          borderWidth:0.5
        },
        tabBarShowLabel:false,
      }}>
      <Tabs.Screen
        name="user"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <Ionicons name={focused?"person":"person-outline"} size={24} color="black" />,
        }}
      />

      <Tabs.Screen
        name="add"
        options={{
          title: 'Add',
          tabBarIcon: ({ focused }) => <Ionicons name={focused?"add-circle":"add-circle-outline"} size={26} color="black" />,
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <Ionicons name={focused?"home-sharp":"home-outline"} size={24} color="black" />,
        }}
      />


      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ focused }) =><Ionicons name={focused?"calendar-clear":"calendar-clear-outline"} size={24} color="black" />,
        }}
      />


      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => <Ionicons name={focused?"settings":"settings-outline"} size={24} color="black" />,
        }}
      />

    </Tabs>
  );
}
