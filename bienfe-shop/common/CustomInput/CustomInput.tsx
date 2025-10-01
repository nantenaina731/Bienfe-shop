import React, { useState } from "react";
import { StyleSheet, KeyboardTypeOptions } from "react-native";
import { TextInput, useTheme } from "react-native-paper";

interface props {
  label: string;
  name: string;
  value?: string | undefined;
  handleChange: (name: string, value: string) => void;
  editable?: boolean;
  height?: number;
  fontSize?: number;
  type?: any;
  mt?: number;

  // Props optionnelles pour champ mot de passe
  secureTextEntry?: boolean;
  rightIcon?: string;
  onIconPress?: () => void;
}

const CustomInput = ({
  label,
  name="",
  value = undefined,
  handleChange,
  editable = true,
  height,
  fontSize,
  type = "default",
  mt,
  rightIcon,
  onIconPress
}: props) => {
  const theme = useTheme();
  const [isFocus, setIsFocus] = useState(false);

  const styles = StyleSheet.create({
    input: {
      fontSize: fontSize ?? 13,
      backgroundColor: "white",
      borderColor: isFocus ? "#64B244" : "#98A0A3",
      borderWidth: 1,
      borderRadius: 10,
      padding: 0,
      marginBottom: 10,
      marginTop: mt ?? 10,
      height: height ?? 55,
      color: "#000",
      paddingHorizontal: 10,
    },
  });

  return (
    <TextInput
      secureTextEntry={name == "password" || name == "confirm_password"}
      placeholder={label}
      style={styles.input}
      theme={{
        roundness: 10,
        colors: { primary: "#98A0A3" },
      }}
      editable={editable}
      keyboardType={type}
      value={value}
      mode="flat"
      activeUnderlineColor="transparent"
      underlineColor="transparent"
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChangeText={(text) => handleChange(name, text)}
      right={
        rightIcon ? (
          <TextInput.Icon icon={rightIcon} onPress={onIconPress} />
        ) : undefined
      }
    />
  );
};

export default CustomInput;
