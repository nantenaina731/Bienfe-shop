import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import CustomButton from "@/common/CustomButton/CustomButton";
import CustomInput from "@/common/CustomInput/CustomInput";
import ErrorView from "@/common/ErrorView/ErrorView";
import useHttps from "@/services/useHttps";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Modal, Portal, Text, useTheme, Button } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";

// Création d'interface
interface Props {
  selected: any;
  visible: boolean;
  setVisible: any;
  setSuccess: any;
  getData: any;
}

const ShowModify = ({
  selected,
  visible,
  setVisible,
  getData,
}: Props) => {
  const initialData = {
    quantity: '',
    totalAmount: '',
    createdAt: new Date(),
  };

  const theme = useTheme();
  const { https } = useHttps();
  const { primary } = theme.colors;
  const hideModal = () => setVisible(false);
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [data, setData] = React.useState(initialData);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (selected) {
      setData({
        quantity: selected.quantity,
        totalAmount: selected.totalAmount,
        createdAt: selected.createdAt ? new Date(selected.createdAt) : new Date(),
      });
    }
  }, [selected]);


  const handleChange = (name: string, value: string) => {
    setData({
      ...data,
      [name]: value,
    });
  };

 

  const handleSubmit = async () => {
    setErrorMessage(null);
    if (data.createdAt) {
      try {
        setLoading(true);
           
        const toSend: any = {
          id: selected.id,
          ...data,
         
        };
        
        const response = await https.put("/vente", toSend);
        if (response) {
          setVisible(false);
          setData(initialData);
          getData();
        }
      } catch (error: any) {
        if (error.response) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("Une erreur s'est produite");
        }
      } finally {
        setLoading(false);
      }
    } else {
      setErrorMessage("Compléter les champs");
    }
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.container}>
        <Text style={{ color:"#64B244", fontWeight: "bold", textAlign: "center" }} variant="titleMedium">
          Information sur le produit
        </Text>
        {selected && (
          <View>
            <Text style={{ color: "#000", fontWeight: "bold" }} variant="titleMedium">
              quantiter
            </Text>
            <CustomInput
              name="quantity"
              label={""}
              value={String(data.quantity)}
              handleChange={handleChange}
              height={45}
              fontSize={14}
              mt={0}
            />

            <Text style={{ color: "#000", fontWeight: "bold" }} variant="titleMedium">
              Prix
            </Text>
            <CustomInput
              name="totalAmount"
              label={""}
              value={String(data.totalAmount)}
              handleChange={handleChange}
              type={"numeric"}
              height={45}
              fontSize={14}
              mt={0}
            />

            {errorMessage && <ErrorView errorMessage={errorMessage} />}

            <CustomButton
              mt={15}
              rounded={false}
              text={loading ? "Chargement..." : "Modifier"}
              disabled={loading}
              onPress={handleSubmit}
              height={45}
            />

            <View style={styles.hr}></View>
          </View>
        )}
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
  flexView: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  hr: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    margin: 15,
  },
});

export default ShowModify;
