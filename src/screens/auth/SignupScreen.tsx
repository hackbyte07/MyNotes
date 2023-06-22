import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AuthTextInput from '../../components/AuthTextInput';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ErrorText from '../../components/ErrorText';
import {createAccountWithEmail} from '../../firebase/auth/basicAuth';
import {createUser} from '../../firebase/firestore/userDb';
import {StackScreenProps} from '@react-navigation/stack';
import {RootScreens} from '../../navigation/RootNavigation';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(3).label('Name'),
  email: Yup.string().required().email().label('Email'),

  password: Yup.string().required().min(6).label('Password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required()
    .min(6)
    .label('Confirm Password'),
});

const SignupScreen = ({navigation}: StackScreenProps<RootScreens>) => {
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
          createAccountWithEmail(value.email, value.password).then(result => {
            setLoading(false)
            if (result) {
              createUser(value.name, value.email);
              Alert.alert(
                'Signup',
                'An Email has been sent to your mail. Please Verify',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('LoginScreen'),
                  },
                ],
              );
            } else {
              setLoading(false)
              Alert.alert('Failed', 'User registration failed!');
            }
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
              placeholder="Name"
              onValueChange={handleChange('name')}
              isSecure={false}
              onBlur={() => setFieldTouched('name', true)}
            />
            <ErrorText visible={touched.name} text={errors.name} />
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
            <ErrorText visible={touched.password} text={errors.password} />
            <AuthTextInput
              placeholder="Confirm password"
              onValueChange={handleChange('confirmPassword')}
              isSecure={true}
              onBlur={() => setFieldTouched('confirmPassword', true)}
            />
            <ErrorText
              visible={touched.confirmPassword}
              text={errors.confirmPassword}
            />

            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <Pressable
              onPress={() => {
                navigation.navigate('LoginScreen');
              }}>
              <Text style={styles.buttonTextLogin}>Back to login</Text>
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

export default SignupScreen;

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
