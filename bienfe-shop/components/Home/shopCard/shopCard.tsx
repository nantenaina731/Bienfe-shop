
import React from "react";
import { StyleSheet, View,Image } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface Props {
  type: {
    name: string;
    logo: string;
  };
  active?: boolean;
}


const ShopCard = ({ type, active = false }: Props) => {
  const theme = useTheme();
  const { primary } = theme.colors;

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: active ? primary : "#000",
      borderRadius: 7,
      padding: 3,
      marginBottom: 5,
    },
    content: {
      borderWidth: 1,
      borderColor: "white",
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 5,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={{ color: active ? "#000" : "#fff" }} variant="bodySmall">
          {type.name}
        </Text>
        <Image source={{ uri: type.logo }}  />

     </View>
    </View>
  );
};

export default ShopCard;
