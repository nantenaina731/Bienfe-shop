import React, { useState } from "react";
import { KeyboardTypeOptions, StyleSheet } from "react-native";
import { TextInput, useTheme } from "react-native-paper";


interface props {
  label: string;
  name: string;
  value?: string | undefined;
 handleChange: any;
  editable?: boolean;
  height?: number;
  fontSize?: number;
  type?: any;
  mt?: number;
}

const CustomInput = ({
  label,
  name = "email",
  value = undefined,
  handleChange,
  editable = true,
  height,
  fontSize,
  type = "text",
  mt
}: props) => {
  const theme = useTheme();
  const { secondary, primary } = theme.colors;
  const [isFocus, setIsFocus] = useState(false);
  const styles = StyleSheet.create({
    input: {
      fontSize: fontSize ?? 13,
      backgroundColor: 'white',
      borderColor: isFocus ? "#64B244": "#98A0A3",
      borderWidth: 1,
      borderRadius: 10,
      padding: 0,
      marginBottom: 10,
      marginTop: mt ?? 10,
      height: height ?? 55,
      color: "#98A0A3",
    
    },
  });
  return (
    <TextInput
      secureTextEntry={name == "password" || name == "confirm_password"}
      placeholder={label}
      style={styles.input}
      theme={{ 
        roundness: 10,
        colors:{primary:"#98A0A3"}


      }}
      editable={editable}
      keyboardType={type}
      // outlineStyle={{borderRadius: 20}}
      value={value}
      mode="flat"
      activeUnderlineColor="transparent"
      underlineColor="transparent"
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChangeText={(text) => handleChange(name, text)}
    />
  );
};
export default CustomInput;
