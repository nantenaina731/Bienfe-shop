import React from "react";
import { Text } from "react-native-paper";

interface props {
  color?: string;
  text: string;
}

const Nodata = ({ color, text }: props) => {
  return (
    <Text
      style={{ color: color ?? "#fff", marginTop: 15, textAlign: "center" }}
      variant="labelSmall"
    >
      {text}
    </Text>
  );
};

export default Nodata;
