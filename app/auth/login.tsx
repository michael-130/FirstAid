import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [codeFocused, setCodeFocused] = useState(false);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#2E7D5A" />
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header Background */}
        <LinearGradient
          colors={['#2E7D5A', '#4A9B6E']}
          style={styles.header}
        >
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <MaterialIcons name="local-hospital" size={48} color="#FFFFFF" />
            </View>
            <Text style={styles.appName}>护理助手</Text>
            <Text style={styles.appSubtitle}>专业护理服务平台</Text>
          </View>
        </LinearGradient>

        {/* Login Form */}
        <View style={styles.formContainer}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>欢迎回来</Text>
            <Text style={styles.welcomeSubtitle}>请输入手机号码登录您的账户</Text>
          </View>

          {/* Phone Input */}
          <View style={styles.inputWrapper}>
            <View style={styles.inputContainer}>
              <MaterialIcons
                name="phone"
                size={20}
                color="#2E7D5A"
                style={styles.inputIcon}
              />
              <View style={styles.inputContent}>
                <Text style={[
                  styles.inputLabel,
                  (phoneFocused || phone) && styles.inputLabelActive
                ]}>
                  手机号码
                </Text>
                <TextInput
                  style={styles.textInput}
                  value={phone}
                  onChangeText={setPhone}
                  onFocus={() => setPhoneFocused(true)}
                  onBlur={() => setPhoneFocused(false)}
                  keyboardType="phone-pad"
                  placeholder="请输入11位手机号"
                  placeholderTextColor="#C7C7CC"
                />
              </View>
            </View>
          </View>

          {/* Verification Code Input */}
          <View style={styles.inputWrapper}>
            <View style={styles.inputContainer}>
              <MaterialIcons
                name="security"
                size={20}
                color="#2E7D5A"
                style={styles.inputIcon}
              />
              <View style={styles.inputContent}>
                <Text style={[
                  styles.inputLabel,
                  (codeFocused || code) && styles.inputLabelActive
                ]}>
                  验证码
                </Text>
                <TextInput
                  style={styles.textInput}
                  value={code}
                  onChangeText={setCode}
                  onFocus={() => setCodeFocused(true)}
                  onBlur={() => setCodeFocused(false)}
                  keyboardType="number-pad"
                  placeholder="请输入验证码"
                  placeholderTextColor="#C7C7CC"
                />
              </View>
              <TouchableOpacity style={styles.codeButton}>
                <Text style={styles.codeButtonText}>获取验证码</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton}>
            <LinearGradient
              colors={['#2E7D5A', '#4A9B6E']}
              style={styles.loginGradient}
            >
              <MaterialIcons name="login" size={20} color="#FFFFFF" />
              <Text style={styles.loginButtonText}>登录</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Alternative Login */}
          <View style={styles.alternativeSection}>
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>其他登录方式</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton}>
                <MaterialIcons name="fingerprint" size={24} color="#2E7D5A" />
                <Text style={styles.socialButtonText}>指纹登录</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <MaterialIcons name="face" size={24} color="#2E7D5A" />
                <Text style={styles.socialButtonText}>面容登录</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms */}
          <View style={styles.termsSection}>
            <Text style={styles.termsText}>
              登录即表示您同意我们的
              <Text style={styles.termsLink}>《用户协议》</Text>
              和
              <Text style={styles.termsLink}>《隐私政策》</Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  appSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  welcomeSection: {
    marginBottom: 32,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  inputWrapper: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  inputIcon: {
    marginRight: 12,
  },
  inputContent: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },
  inputLabelActive: {
    color: '#2E7D5A',
    fontWeight: '600',
  },
  textInput: {
    fontSize: 16,
    color: '#333333',
    paddingVertical: 8,
  },
  codeButton: {
    backgroundColor: '#2E7D5A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  codeButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  loginButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 32,
  },
  loginGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  alternativeSection: {
    marginBottom: 32,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5EA',
  },
  dividerText: {
    fontSize: 12,
    color: '#999999',
    marginHorizontal: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  socialButtonText: {
    fontSize: 12,
    color: '#2E7D5A',
    fontWeight: '600',
    marginLeft: 8,
  },
  termsSection: {
    alignItems: 'center',
  },
  termsText: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: '#2E7D5A',
    fontWeight: '600',
  },
});