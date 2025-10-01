import CustomButton from "@/common/CustomButton/CustomButton";
import CustomInput from "@/common/CustomInput/CustomInput";
import ErrorView from "@/common/ErrorView/ErrorView";
import useHttps from "@/services/useHttps";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Modal, Portal, Text, useTheme } from "react-native-paper";

interface props {
  visible: boolean;
  setVisible: any;
  setSuccess: any;
  getData: any;
}

const initialData = {
  name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: null,
 
};

const AddModal = ({ setSuccess, visible, setVisible, getData }: props) => {
  const hideModal = () => setVisible(false);
  const theme = useTheme();
  const { primary } = theme.colors;
  const [data, setData] = useState(initialData);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sendloading, setSendLoading] = useState(false);
  const { https } = useHttps();

  const handleChange = (name: string, value: string) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setErrorMessage(null);
    if (data.password.trim() != "" && data.password !== data.confirm_password) {
      setErrorMessage("Mot de passe et confirmation invalide");
      return;
    }
    if (
      data.name.trim() != "" &&
      data.last_name.trim() != "" &&
      data.email.trim() != "" &&
      data.password.trim() != ""
  

    ) {
      try {
        setSendLoading(true);
        const toSend: any = data;
        toSend.email = data.email.trim();
        toSend.type = "admin";
        const response = await https.post("/users", toSend);
        if (response) {
          setVisible(false);
          setSuccess(true);
          setData(initialData);
          getData();
        }
      } catch (error: any) {
        if (error.response) {
          setErrorMessage(error.response.data);
        } else if (error.request) {
          console.log(error.request);
          setErrorMessage("Request error");
          console.log("Error request:", error.request);
        } else {
          setErrorMessage("Une érreur c'est produite");
          console.log("Error message:", error.response);
        }
      } finally {
        setSendLoading(false);
      }
    } else {
      setErrorMessage("Compléter les champs");
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.container}
      >
        <Text
          style={{ color:  "#64B244" , fontWeight: "bold", textAlign: "center" }}
          variant="titleMedium"
        >
          Ajouter un administrateur
        </Text>
        <Text
          style={{ color: "#000", fontWeight: "bold" }}
          variant="titleMedium"
        >
          Nom
        </Text>
        <CustomInput
          name="name"
          label={"Nom..."}
          value={data.name}
          handleChange={handleChange}
          height={45}
          fontSize={14}
          mt={0}
        />
        <Text
          style={{ color: "#000", fontWeight: "bold" }}
          variant="titleMedium"
        >
          Prenom
        </Text>
        <CustomInput
          name="last_name"
          value={data.last_name}
          label={"Prenom..."}
          handleChange={handleChange}
          height={45}
          fontSize={14}
          mt={0}
        />
        <Text
          style={{ color: "#000", fontWeight: "bold" }}
          variant="titleMedium"
        >
          Email{" "}
        </Text>
        <CustomInput
          name="email"
          value={data.email}
          label={"Email..."}
          handleChange={handleChange}
          height={45}
          fontSize={14}
          mt={0}
        />
        <Text
          style={{ color: "#000", fontWeight: "bold" }}
          variant="titleMedium"
        >
          Nouveau mot de passe{" "}
        </Text>
        <CustomInput
          name="password"
          type={"text"}
          label={"Mot de passe"}
          handleChange={handleChange}
          height={45}
          fontSize={14}
          mt={0}
        />
        <Text
          style={{ color: "#000", fontWeight: "bold" }}
          variant="titleMedium"
        >
          Confirmation{" "}
        </Text>
        <CustomInput
          name="confirm_password"
          type={"text"}
          label={"Confirmation"}
          handleChange={handleChange}
          height={45}
          fontSize={14}
          mt={0}
        />
        <CustomButton
          mt={15}
          rounded={false}
          text={sendloading ? "Chargement..." : "Valider"}
          disabled={sendloading}
          onPress={handleSubmit}
          height={45}
        />
        {errorMessage && <ErrorView errorMessage={errorMessage} />}
      </Modal>
    </Portal>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    margin: 10,
    borderRadius: 5,
  },
});

export default AddModal;
