import CustomButton from "@/common/CustomButton/CustomButton";
import CustomInput from "@/common/CustomInput/CustomInput";
import ErrorView from "@/common/ErrorView/ErrorView";
import useHttps from "@/services/useHttps";
import useToken from "@/services/useToken";
import React, { useState } from "react";
import { StyleSheet, Alert } from "react-native";
import { Modal, Portal, Text, useTheme } from "react-native-paper";
//import * as DocumentPicker from "expo-document-picker";
import Papa from "papaparse";
interface props {
  visible: boolean;
  setVisible: any;
  setSuccess: any;
  getData: any;
  shopId: number;
}

const initialData = {
  name: "",
  price: "",
  quantity: "",
};

const AddModal = ({ setSuccess, visible, setVisible, getData, shopId }: props) => {
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
    if (
      data.name.trim() != "" &&
      data.price.trim() != "" &&
      data.quantity.trim() != ""
    ) {
      try {
        setSendLoading(true);
        const toSend: any = {
          ...data,
          shopId,
        };

        const response = await https.post("/products", toSend);
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
          setErrorMessage("Une erreur s'est produite");
          console.log("Error message:", error.response);
        }
      } finally {
        setSendLoading(false);
      }
    } else {
      setErrorMessage("Complétez tous les champs");
    }
  };

 /* const handleImportCsv = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "text/csv",
      });

      if (result.canceled) return;

      const fileUri = result.assets[0].uri;
      const response = await fetch(fileUri);
      const csvText = await response.text();

      const parsed = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
      });

      const products = parsed.data.map((row: any) => ({
        name: row.name,
        price: row.price,
        quantity: row.quantity,
        shopId,
      }));

      setSendLoading(true);
      const res = await https.post("/products/import", { products });
      setSendLoading(false);

      if (res.status === 200) {
        setVisible(false);
        setSuccess(true);
        getData();
      } else {
        Alert.alert("Erreur", "Importation échouée.");
      }
    } catch (error) {
      setSendLoading(false);
      console.error("Erreur CSV :", error);
      Alert.alert("Erreur", "Le fichier est invalide ou corrompu.");
    }
    
  };
*/
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.container}
      >
        <Text style={{ color: "#000", fontWeight: "bold" }} variant="titleMedium">
          Nom
        </Text>
        <CustomInput
          name="name"
          label={""}
          value={data.name}
          handleChange={handleChange}
          height={45}
          fontSize={14}
          mt={0}
        />

        <Text style={{ color: "#000", fontWeight: "bold" }} variant="titleMedium">
          Prix Unitaire
        </Text>
        <CustomInput
          name="price"
          label={""}
          value={data.price}
          handleChange={handleChange}
          type={"numeric"}
          height={45}
          fontSize={14}
          mt={0}
        />

        <Text style={{ color: "#000", fontWeight: "bold" }} variant="titleMedium">
          Quantité en stock
        </Text>
        <CustomInput
          name="quantity"
          label={""}
          type={"numeric"}
          value={data.quantity}
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
