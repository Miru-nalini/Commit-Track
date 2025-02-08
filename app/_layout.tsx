import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const router = useRouter();
  const segments = useSegments();

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log("onAuthStateChanged", user);
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  },[]);


  useEffect(() => {
    if (initializing) return;

    const inApp = segments[0] === '(app)';

    if (user && !inApp) {
      router.replace('/(app)/home');
    } else if (!user && inApp) {
      router.replace("/");  
    }

  },[user, initializing]);

  if (initializing)
    return (
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );


  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown:false}}/>
      <Stack.Screen name="(app)" options={{headerShown:false}}/>
    </Stack>
  );
}
