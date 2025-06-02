import React from "react";
import { View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";

interface props {
  top?: number
}

const Loading = ({ top }: props) => {
  const theme = useTheme();
  const { primary } = theme.colors;

  return (
    <View style={{marginTop: top ?? 25, marginBottom: 10}}>
      <ActivityIndicator size={"small"} animating={true} color={"#64B244"} />
    </View>
  );
};

export default Loading;
