import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  ImageBackground,
} from "react-native";
import * as Yup from "yup";

import {
  ErrorMessage,
  AppFormField,
  AppForm,
  SubmitButton,
} from "../components/forms";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import colors from "../config/colors";
import ActivityIndecator from "../components/ActivtyIndectors/ActivityIndecatorLoading";
import settings from "../config/settings";

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .required()
    .min(11)
    .max(11)
    .label("رقم الهاتف"),
  password: Yup.string()
    .required()
    .min(4)
    .label("كلمةالمرور"),
});
export default function LoginPage() {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const handleSubmit = async ({ phone, password }) => {
    setIsLoading(true);
    const results = await authApi.login(phone, password);
    if (!results.ok) {
      setIsLoading(false);
      return setLoginFailed(true);
    }
    if (!results.data.token) {
      setIsLoading(false);
      return setLoginFailed(true);
    }
    setLoginFailed(false);
    setIsLoading(false);
    auth.logIn(results.data);
  };
  return (
    <ImageBackground
      blurRadius={2}
      style={styles.background}
      source={require("../assets/background/welcomePage.png")}
    >
      {isLoading && <ActivityIndecator visible={isLoading} />}
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={settings.logo} />
      </View>
      <View style={{ flex: 1, paddingLeft: 20, alignContent: "center" }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, alignContent: "center" }}
        >
          <AppForm
            initialValues={{ phone: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <View style={styles.formContainer}>
              <Text style={styles.text}>أهلا وسهلا بك</Text>
              <ErrorMessage
                error="رقم الهاتف او كلمة المرور خطاْ"
                visible={loginFailed}
              />
              <AppFormField
                rightIcon="cellphone"
                name="phone"
                caption="رقم الموبايل"
                autoCapitalize="none"
                keyboardType="phone-pad"
                autoCorrect={false}
              />
              <AppFormField
                rightIcon="lock"
                leftIcon="eye"
                caption="كلمة المرور"
                name="password"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
              />
              <SubmitButton title="تسجيل دخول" />
            </View>
          </AppForm>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
  },
  main: {
    width: "100%",
    height: "100%",
    backgroundColor: "gold",
    flexGrow: 1,
    alignContent: "center",
  },
  logoContainer: {
    top: 20,
  },
  text: {
    fontSize: 20,
    paddingVertical: 5,
    marginTop: 20,
    fontFamily: "app_b",
    fontFamily: "app_l",
    alignSelf: "center",
  },
  logo: {
    width: 200,
    height: 200,
    margin: 20,
    borderRadius: 5,
  },

  formContainer: {
    top: 20,
    paddingHorizontal: 5,
    backgroundColor: colors.white,
    width: "95%",
    borderRadius: 15,
    elevation: 4,
  },
});
