import CustomButton from "@/common/CustomButton/CustomButton";
import CustomInput from "@/common/CustomInput/CustomInput";
import ErrorView from "@/common/ErrorView/ErrorView";
import useHttps from "@/services/useHttps";
import * as React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { StyleSheet, View,Pressable } from "react-native";
import { Modal, Portal, Text, useTheme, Button } from "react-native-paper";
// Création d'interface
interface Props {
  selected: any;
  visible: boolean;
  setVisible: any;
  setSuccess: any;
  getData: any;
}

const ShopModify = ({
  selected,
  visible,
  setVisible,
  setSuccess,
  getData,
}: Props) => {
  const initialData = {
    name: '',
  
    
  };

  const theme = useTheme();
  const { https } = useHttps();
  const { primary } = theme.colors;
  const hideModal = () => setVisible(false);
  const [loading, setLoading] = React.useState(false);
  const [sendloading, setSendLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [data, setData] = React.useState(initialData);
  const [isDelete, setIsDelete] = React.useState(false);
  const handleChange = (name: string, value: string) => {
    setData({
      ...data,
      [name]: value,
    });
  };
  React.useEffect(() => {
    if (visible && selected) {
      setData({
        name: selected.name || '',
      });
    }
  }, [visible, selected]);
  
  React.useEffect(() => {
    setIsDelete(false);
    if (selected) {
      setData({
        name: selected.name,
      });
    }
  }, [selected]);

  const handleDelete = async () => {
    try {
      setSendLoading(true);
      const response = await https.delete(`/createshop/${selected.id}`);
      if (response) {
        await getData();
        setVisible(false);
        setSuccess(true);
             }
    } catch (error: any) {
      if (error.response) {
        setErrorMessage("Une érreur s'est produite");
      } else if (error.request) {
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
//for edit
  const handleSubmit = async () => {
    setErrorMessage(null);
    if (data.name) {
      try {
        setLoading(true);
           
        const toSend: any = {
          id: selected.id,
          ...data,
         
        };
        
        const response = await https.put("/createshop", toSend);
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
        {selected && (
          <View>
            
            <Pressable
              onPress={() => setIsDelete(!isDelete)}
              style={styles.flexView}
            >
              <Text
                style={{ color: "red", textDecorationLine: "underline" }}
                variant="titleMedium"
              >
                Supprimer le boutique
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
                  Êtes-vous certain de vouloir supprimer ce boutique? 
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
                    {sendloading ? "Supression..." : "Confirmer"}
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
    borderRadius: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: "50%",
    alignSelf: "center",
    top: "-30%",
    left:"20%"
  },
  flexView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  hr: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    margin: 15,
  },
});

export default ShopModify;
