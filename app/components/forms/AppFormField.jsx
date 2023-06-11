import React from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";
import ErrorMessage from "./ErrorMessage";
import { View } from "react-native-animatable";
export default function AppFormField({ name, ...otherProps }) {
  const { handleChange, errors, setFieldTouched, touched } = useFormikContext();

  return (
    <View style={{ paddingHorizontal: 10, paddingBottom: 5, width: "100%" }}>
      <AppTextInput onBlur={() => setFieldTouched(name)} onChangeText={handleChange(name)} {...otherProps} />
      <ErrorMessage visible={touched[name]} error={errors[name] ? "تأكد من المعلومات" : ""} />
    </View>
  );
}
