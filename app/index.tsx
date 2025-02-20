import { useEffect, useState } from "react";
import { Text, View, StyleSheet, KeyboardAvoidingView, TextInput, ActivityIndicator, Pressable } from "react-native";
import auth from '@react-native-firebase/auth';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {useFonts,Kanit_400Regular,Kanit_400Regular_Italic,Kanit_200ExtraLight,Kanit_200ExtraLight_Italic,Kanit_500Medium,Kanit_500Medium_Italic,Kanit_700Bold,Kanit_700Bold_Italic

} from '@expo-google-fonts/kanit'
import * as SplashScreen from 'expo-splash-screen';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
SplashScreen.preventAutoHideAsync();

export default function Index() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [fontsLoaded,fontsError] = useFonts({
    'bold': Kanit_700Bold,
    'boldItalic': Kanit_700Bold_Italic,
    'medium' : Kanit_500Medium,
    'mediumItalic' : Kanit_500Medium_Italic,
    'regular': Kanit_400Regular,
    'regularItalic': Kanit_400Regular_Italic,
    'thin': Kanit_200ExtraLight,
    'thinItalic': Kanit_200ExtraLight_Italic
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
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <View style={{marginBottom:40,width:windowWidth-80}}>
        <Text style={styles.heading}>Let's</Text>
        <Text style={styles.heading}>get</Text>
        <Text style={styles.heading}>started!</Text>

        </View>
        <View style={{alignItems:'center'}}>
        <TextInput
          style={styles.input}
          placeholder="Your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          cursorColor={'gray'}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Your password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          cursorColor={'gray'}
          secureTextEntry
        />
        <Text style={{fontFamily:'thin',fontSize:12,color:'darkBlue',alignSelf:'flex-end',textDecorationLine:'underline'}}>Forgot Password?</Text>
        
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

        <View style={{width:'100%', marginVertical:40,justifyContent:'space-evenly',alignItems:'center',flexDirection:'row'}}>
          <View style={{height:1,backgroundColor:'gray',width:'45%'}}/>
          <Text style={{fontFamily:'thin',fontSize:16,color:'black'}}> or </Text>
          <View style={{height:1,backgroundColor:'gray',width:'45%'}}/>
        </View>

        <Pressable style={styles.button} onPress={()=>{}}>
          <Text style={{fontFamily:'medium',fontSize:16}}>SignIn with Google</Text>
        </Pressable>
      </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding:40
  },
  heading:{
    fontFamily: 'bold',
    fontSize: 48,
  },
  input:{
    width: '100%',
    height: 50,
    paddingHorizontal: 16,
    paddingVertical:10,
    borderWidth: 1,
    borderStyle:'solid',
    borderColor: 'black',
    borderRadius:16,
    marginBottom: 10,
    fontFamily:'regular',
    fontSize: 16,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',    

  },
  buttonView:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button:{
    borderWidth: 1,
    width: '100%',
    marginTop:10,
    borderStyle:'solid',
    borderColor: 'black',
    borderRadius:16,
    paddingHorizontal:16,
    paddingVertical:10,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',    
  },
  buttonText:{
    fontFamily: 'medium',
    fontSize:16,
  }
})