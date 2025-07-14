import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const [emailFocused, setEmailFocused] = useState(false);
  const [codeFocused, setCodeFocused] = useState(false);

  return (
    <>
      <View style={styles.container}>
        {/* Верхний фон с кругом */}
        <View style={styles.header}>
          <Text style={styles.title}>Login</Text>
        </View>

        {/* Форма */}
        <View style={styles.form}>
          {/* Email */}
          <View style={styles.inputWrapper}>
            <FontAwesome
              name="envelope"
              size={20}
              color="#5A321F"
              style={styles.icon}
            />

            <View
  style={[
    styles.floatingLabelBackground,
    (emailFocused || email) && { top: -8 },
  ]}
>
  <Text
    style={[
      styles.floatingLabel,
      (emailFocused || email) && styles.floatingLabelActiveEmail,
    ]}
  >
    Email
  </Text>

  {/* {(emailFocused || email) && (
  <Text style={styles.helperExample}>example@mail.com</Text>
)} */}

</View>


            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              keyboardType="email-address"
            />
          </View>

          {/* Code */}
          <View style={styles.inputWrapper}>
            <FontAwesome
              name="lock"
              size={20}
              color="#5A321F"
              style={styles.icon}
            />

<View
  style={[
    styles.floatingLabelBackground,
    (codeFocused || code) && { top: -8 },
  ]}
>
  <Text
    style={[
      styles.floatingLabel,
      (codeFocused || code) && styles.floatingLabelActive,
    ]}
  >
    Code
  </Text>
</View>


            <TextInput
              style={styles.input}
              value={code}
              onChangeText={setCode}
              onFocus={() => setCodeFocused(true)}
              onBlur={() => setCodeFocused(false)}
              keyboardType="number-pad"
            />

            <TouchableOpacity>
              <Text style={styles.getCode}>Get Code</Text>
            </TouchableOpacity>
          </View>

          {/* Кнопка входа */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6EF',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 450,
    backgroundColor: '#FCDDCB',
    borderBottomLeftRadius: 300,
    borderBottomRightRadius: 300,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -150,
  },
  title: {
    fontFamily: 'PoppinsBold',
    fontSize: 55,
    color: '#5A321F',
    marginTop: 200,
  },
  form: {
    marginTop: 250,
    width: '80%',
  },
  inputWrapper: {
    marginBottom: 30,
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    left: 15,
    top: 12,
    zIndex: 1,
  },
  floatingLabel: {
    position: 'absolute',
    top: 12,
    color: '#999',
    fontSize: 16,
    zIndex: 1,
    
    paddingHorizontal: 4,
  },
  floatingLabelActive: {
    top: 0,
    fontSize: 12,
    color: '#5A321F',
    backgroundColor: '#FFF6EF',
  },
    floatingLabelActiveEmail: {
    top: 0,
    fontSize: 12,
    color: '#5A321F',
    backgroundColor: '#FCDDCB',
  },
  input: {
  borderWidth: 1,
  borderColor: '#5A321F', // цвет контура
  borderRadius: 30,
  paddingVertical: 12,
  paddingLeft: 45,
  paddingRight: 80,
  backgroundColor: 'transparent', // ключевой момент
  color: '#333',
},
floatingLabelBackground: {
  position: 'absolute',
  left: 40,
  top: 0,
  paddingHorizontal: 4,
  backgroundColor: '#FFF6EF',
},
helperExample: {
  marginLeft: 1,
  marginTop: 20,
  fontSize: 16,
  color: '#AAA',
  backgroundColor: 'transparent'

},

  getCode: {
    position: 'absolute',
    right: 20,
    top: 20,
    color: '#5A321F',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FCDDCB',
    borderRadius: 50,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#5A321F',
    fontSize: 16,
  },
});
