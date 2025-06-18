import CustomButton from "@/common/CustomButton/CustomButton";
import CustomInput from "@/common/CustomInput/CustomInput";
import ErrorView from "@/common/ErrorView/ErrorView";
import { formatDate } from "@/services/services";
import useHttps from "@/services/useHttps";
import * as React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Button, Modal, Portal, Text, useTheme } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";

interface props {
  selected: any;
  visible: boolean;
  setVisible: any;
  setSuccess: any;
  getData: any;
}

const ShowModal = ({
  selected,
  visible,
  setVisible,
  setSuccess,
  getData,
}: props) => {
  const initialData = {
    name: "",
    price: "",
    quantity: "",
  };

  const theme = useTheme();
  const { https } = useHttps();
  const { primary } = theme.colors;
  const hideModal = () => setVisible(false);
  const [isDelete, setIsDelete] = React.useState(false);
  const [sendloading, setSendLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [data, setData] = React.useState(initialData);

  React.useEffect(() => {
    setIsDelete(false);
    if (selected) {
      setData({
        name: selected.name,
        price: selected.price,
        quantity: selected.quantity,
      });
    }
  }, [selected]);

  const handleDelete = async () => {
    try {
      setSendLoading(true);
      const response = await https.delete(`/products/${selected.id}`);
      if (response) {
        setVisible(false);
        setSuccess(true);
        getData();
      }
    } catch (error: any) {
      if (error.response) {
        setErrorMessage("Une érreur s'est produite");
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
  };

  const handleChange = (name: string, value: string) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setErrorMessage(null);
    if(data.name.trim() != "" ) {
      try {
        setLoading(true);
        const toSend: any = {
          id: selected.id,
          ...data
        };
        const response = await https.put("/products", toSend);
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
        setLoading(false);
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
          style={{ color: primary, fontWeight: "bold", textAlign: "center" }}
          variant="titleMedium"
        >
          Information sur le produit
        </Text>
        {selected && (
          <View>
            <Text
              style={{ color: "#000", fontWeight: "bold" }}
              variant="titleMedium"
            >
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

            <Text
              style={{ color: "#000", fontWeight: "bold" }}
              variant="titleMedium"
            >
              Prix Unitaire
            </Text>
            <CustomInput
              name="price"
              label={""}
              value={String(data.price)}
              handleChange={handleChange}
              type={"numeric"}
              height={45}
              fontSize={14}
              mt={0}
            />

            <Text
              style={{ color: "#000", fontWeight: "bold" }}
              variant="titleMedium"
            >
              Quantité en stock
            </Text>
            <CustomInput
              name="quantity"
              label={""}
              value={String(data.quantity)}
              type={"numeric"}
              handleChange={handleChange}
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
            <Pressable
              onPress={() => setIsDelete(!isDelete)}
              style={styles.flexView}
            >
              <Text
                style={{ color: "red", textDecorationLine: "underline" }}
                variant="titleMedium"
              >
                Supprimer le produit
              </Text>
              {isDelete ? (
                <AntDesign name="up" color={"red"} size={15} />
              ) : (
                <AntDesign name="down" color={"red"} size={15} />
              )}
            </Pressable>
            {isDelete && (
              <View>
                <Text style={{ color: "red" }} variant="titleSmall">
                  Êtes-vous certain de vouloir supprimer ce produit ? Cette
                  action est irréversible mais les ventes associés a ce produit
                  resterons dans la Base de données
                </Text>
                <Button
                  onPress={handleDelete}
                  disabled={sendloading}
                  uppercase={false}
                  mode="outlined"
                  style={{
                    width: "100%",
                    borderColor: "red",
                    borderRadius: 6,
                    marginTop: 10,
                  }}
                >
                  <Text style={{ color: "red" }}>
                    {sendloading ? "Suppression..." : "Confirmer"}
                  </Text>
                </Button>
              </View>
            )}
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

export default ShowModal;
