import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import AuthTextInput from '../../components/AuthTextInput';
import ErrorText from '../../components/ErrorText';
import {StackScreenProps} from '@react-navigation/stack';
import {RootScreens} from '../../navigation/RootNavigation';
import {
  createAccountWithEmail,
  loginAccountWithEmail,
} from '../../firebase/auth/basicAuth';
import {Alert} from 'react-native';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
});

const LoginScreen = ({navigation}: StackScreenProps<RootScreens>) => {
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={value => {
          setLoading(true)
          loginAccountWithEmail(value.email, value.password)
            .then(result => {
              setLoading(false);
              if (result) {
                navigation.navigate('BottomTabBarScreen');
              } else {
                Alert.alert('Failed', 'User login failed!');
              }
            })
            .catch(error => {
              setLoading(false);
            });
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          setFieldTouched,
          touched,
        }) => (
          <>
            <AuthTextInput
              placeholder="Email"
              onValueChange={handleChange('email')}
              isSecure={false}
              onBlur={() => setFieldTouched('email', true)}
            />
            <ErrorText visible={touched.email} text={errors.email} />

            <AuthTextInput
              placeholder="Password"
              onValueChange={handleChange('password')}
              isSecure={true}
              onBlur={() => setFieldTouched('password', true)}
            />

            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Pressable onPress={() => {navigation.navigate('SignupScreen')}}>
              <Text style={styles.buttonTextLogin}>New here? Register</Text>
            </Pressable>
            {loading && <ActivityIndicator 
             size={35}
             color={'dodgerblue'}
             style={styles.activityIndicator}
            />}
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: 'dodgerblue',
    borderRadius: 15,
    marginTop: 15,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  buttonTextLogin: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    marginTop: 15,
    backgroundColor: 'rgba(0,0,0, 0.8)',
    padding: 10,
    borderRadius: 5,
  },
  activityIndicator: {
    flex: 1,
    alignSelf: 'center',
    position: 'absolute'
  }
});
