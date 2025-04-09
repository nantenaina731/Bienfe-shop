import React from "react";
import { Text } from "react-native-paper";

interface props {
  errorMessage: string;
}

const ErrorView = ({ errorMessage }: props) => {
  return (
    <Text
      style={{
        width: "100%",
        marginTop: 10,
        color: "black",
        textAlign: "center",
        backgroundColor: "#FFB2B2",
        borderRadius: 5,
        paddingTop: 8,
        paddingBottom: 8,
      }}
    >
      {errorMessage}
    </Text>
  );
};

export default ErrorView;
