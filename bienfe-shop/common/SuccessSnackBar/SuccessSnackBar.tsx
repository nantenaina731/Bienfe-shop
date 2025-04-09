import React from "react";
import { Snackbar } from "react-native-paper";

interface props {
  title?: string;
  visible: boolean;
  setVisible: any;
  mb?: number;
}

const SuccessSnackBar = ({ title, visible, setVisible, mb }: props) => {
  const onDismissSnackBar = () => setVisible(false);

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismissSnackBar}
      style={{
        backgroundColor: "#52977e",
        marginBottom: mb ?? 80,
      }}
      elevation={0}
      action={{
        label: "Valider",
        onPress: () => {
          onDismissSnackBar();
        },
      }}
    >
      {title ?? "L'information a bien été enregistré"}
    </Snackbar>
  );
};

export default SuccessSnackBar;
