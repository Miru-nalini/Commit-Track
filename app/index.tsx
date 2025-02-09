import { useEffect, useState } from "react";
import { Text, View, StyleSheet, KeyboardAvoidingView, TextInput, ActivityIndicator, Pressable } from "react-native";
import auth from '@react-native-firebase/auth';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {useFonts,Kanit_400Regular,Kanit_400Regular_Italic,Kanit_100Thin,Kanit_100Thin_Italic,Kanit_600SemiBold,Kanit_600SemiBold_Italic, Kanit_200ExtraLight,Kanit_200ExtraLight_Italic} from '@expo-google-fonts/kanit'
import * as SplashScreen from 'expo-splash-screen';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
SplashScreen.preventAutoHideAsync();

export default function Index() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [fontsLoaded,fontsError] = useFonts({
    'bold': Kanit_600SemiBold,
    'boldItalic': Kanit_600SemiBold_Italic,
    'regular': Kanit_400Regular,
    'regularItalic': Kanit_400Regular_Italic,
    'thin': Kanit_100Thin,
    'thinItalic': Kanit_100Thin_Italic,
    'extraLight': Kanit_200ExtraLight,
    'extraLightItalic': Kanit_200ExtraLight_Italic
  });

  useEffect(() => {
    if(fontsLoaded || fontsError){
      SplashScreen.hideAsync();
    }
  },[fontsLoaded,fontsError]);
  
  const SignUp = async () => {
    setLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      alert("User account created & signed in!");
    } catch (e: any) {
      const err = e as FirebaseAuthTypes.NativeFirebaseAuthError;
      alert("Registration failed: "+err.message);
    }finally {
      setLoading(false);
    }
  }

  const SignIn = async () => {
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      alert("User signed in!");
    } catch (e: any) {
      const err = e as FirebaseAuthTypes.NativeFirebaseAuthError;
      alert("Sign in failed: "+err.message);
    } finally{
      setLoading(false);
    }
  }

  return (
    <View style={[styles.container,{padding:40}]}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={{marginVertical:40,width:240,alignSelf:'flex-start'}}>
          <Text style={styles.heading}>Lets</Text>
          <Text style={styles.heading}>get</Text>
          <Text style={styles.heading}>Started!</Text>
        </View>
        <View style={{alignItems:'center'}}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          cursorColor={'gray'}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          cursorColor={'gray'}
          secureTextEntry
        />
        
        {loading ? (
          <ActivityIndicator size={48} color="black" />
        ):(
          <View style={styles.buttonView}>
            <Pressable onPress={SignUp}> 
              <Text style={styles.buttonText}>Register</Text>
            </Pressable>
            <Pressable onPress={SignIn}>
              <Text style={styles.buttonText}>Sign In</Text>
            </Pressable>
          </View>
        )}
        <View style={{width:windowWidth-120, marginVertical:20,justifyContent:'space-evenly',alignItems:'center',flexDirection:'row'}}>
          <View style={{height:1,backgroundColor:'gray',width:(windowWidth/2)-100}}/>
          <Text style={{fontFamily:'thin',fontSize:16,color:'black'}}> or </Text>
          <View style={{height:1,backgroundColor:'gray',width:(windowWidth/2)-100}}/>
        </View>
        <Pressable style={styles.button} onPress={()=>{}}>
          <Text style={{fontFamily:'boldItalic',fontSize:20}}>SignIn with Google</Text>
        </Pressable>
      </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  heading:{
    fontFamily: 'boldItalic',
    fontSize: 48,
  },
  input:{
    width: windowWidth-80,
    height: 50,
    padding: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderStyle:'solid',
    borderColor: 'black',
    borderRadius:16,
    marginBottom: 10,
    fontFamily:'semiBold',
    fontSize: 16,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',    

  },
  buttonView:{
    width: 240,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button:{
    borderWidth: 1,
    width: windowWidth-80,
    marginTop:10,
    borderStyle:'solid',
    borderColor: 'black',
    borderRadius:16,
    paddingHorizontal:20,
    paddingVertical:10,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',    
  },
  buttonText:{
    fontFamily: 'boldItalic',
    fontSize:20,
  }
})