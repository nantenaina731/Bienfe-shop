import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface props {
  text: string;
  onPress: any;
  rounded: boolean;
  mt?: number;
  disabled?: boolean;
  width?: any;
  height?: any
}

const CustomButton = ({ mt, text, rounded,disabled ,width, height,onPress}: props) => {
  const theme = useTheme();
  const { primary } = theme.colors;
  
  const styles = StyleSheet.create({
    button: {
      borderRadius: rounded ? 50 : 7,
      width: width ?? "80%",
      paddingTop: 5,
      paddingBottom: 5,
      display: "flex",
      marginTop: mt ?? 5,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:  "#64B244",
      height: height ?? 50,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    connexion: {
      color: "white",
      fontWeight: "bold",
    },
  });

  return (
    <Pressable style={styles.button} onPress={disabled ? () => console.log('No press') : onPress}>
      <Text variant="titleMedium" style={styles.connexion}>
        {text}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
