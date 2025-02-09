import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import { View, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";


export default function RootLayout() {

  const [loaded, error] = useFonts({
  });

  if(!loaded || error) return null;


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
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="index"/>
      <Stack.Screen name="(app)"/>
    </Stack>
  );
}
