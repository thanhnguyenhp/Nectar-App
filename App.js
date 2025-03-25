// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PaperProvider, Button, Text, TextInput } from 'react-native-paper';
import { View, Image, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => navigation.replace('Onboarding'), 2000);
  }, []);
  return (
    <View style={styles.splashContainer}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
    </View>
  );
};

const OnboardingScreen = ({ navigation }) => (
  <View style={styles.onboardingContainer}>
    <Image source={require('../assets/onboarding.jpg')} style={styles.onboardingImage} />
    <Text style={styles.onboardingText}>Welcome to our store</Text>
    <Button mode="contained" onPress={() => navigation.navigate('SignIn')}>Get Started</Button>
  </View>
);

const SignInScreen = ({ navigation }) => (
  <View style={styles.signInContainer}>
    <Image source={require('../assets/signin_bg.jpg')} style={styles.signInImage} />
    <Text style={styles.signInText}>Get your groceries with nectar</Text>
    <View style={styles.phoneInputContainer}>
      <Image source={require('../assets/Flag.png')} style={styles.flag} />
      <Text style={styles.countryCode}>+84</Text>
    </View>
    <Text style={styles.orText}>Or connect with social media</Text>
    <Button mode="contained" style={styles.signInButton} onPress={() => navigation.navigate('EnterNumber')}>Continue with Google</Button>
    <Button mode="contained" style={styles.signInButton} onPress={() => navigation.navigate('EnterNumber')}>Continue with Facebook</Button>
  </View>
);

const EnterNumberScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.enterNumberContainer}>
      <Text style={styles.enterNumberText}>Enter your mobile number</Text>
      <View style={styles.phoneInputContainer}>
        <Image source={require('../assets/Flag.png')} style={styles.flag} />
        <Text style={styles.countryCode}>+84</Text>
        <TextInput
          label="Mobile Number"
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          keyboardType="phone-pad"
          style={styles.phoneInput}
        />
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Verification')}>
        <Text style={styles.nextButtonText}>→</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const VerificationScreen = () => (
  <View style={styles.verificationContainer}>
    <Text style={styles.verificationText}>Enter your 4-digit code</Text>
    <TextInput keyboardType="number-pad" style={styles.codeInput} maxLength={4} placeholder="- - - -" textAlign="center" />
    <TouchableOpacity style={styles.nextButton}>
      <Text style={styles.nextButtonText}>→</Text>
    </TouchableOpacity>
    <TouchableOpacity>
      <Text style={styles.resendText}>Resend Code</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  splashContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#6AB04A' },
  logo: { width: 150, height: 150 },
  onboardingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  onboardingImage: { width: '100%', height: 300, marginBottom: 20 },
  onboardingText: { fontSize: 18, marginBottom: 10 },
  signInContainer: { flex: 1, alignItems: 'center', padding: 20 },
  signInImage: { width: '100%', height: 250, marginBottom: 20 },
  signInText: { fontSize: 18, marginBottom: 20 },
  phoneInputContainer: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, width: '80%', paddingBottom: 5 },
  flag: { width: 24, height: 16, marginRight: 5 },
  countryCode: { fontSize: 16, marginRight: 10 },
  orText: { marginTop: 20, marginBottom: 10 },
  signInButton: { marginTop: 10, width: '80%' },
  enterNumberContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  enterNumberText: { fontSize: 18, marginBottom: 10 },
  nextButton: { marginTop: 20, backgroundColor: '#6AB04A', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  nextButtonText: { color: '#fff', fontSize: 24 },
  verificationContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  verificationText: { fontSize: 18, marginBottom: 10 },
  codeInput: { width: '50%', textAlign: 'center', fontSize: 24, letterSpacing: 10, borderBottomWidth: 1 },
  resendText: { color: '#6AB04A', marginTop: 10 }
});

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="EnterNumber" component={EnterNumberScreen} />
          <Stack.Screen name="Verification" component={VerificationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}