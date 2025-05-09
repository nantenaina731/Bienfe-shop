import { formatDate } from "@/services/services";
import useHttps from "@/services/useHttps";
import * as React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Button, Modal, Portal, Text, useTheme } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";

interface props {
  userSelected: any;
  visible: boolean;
  setVisible: any;
  setSuccess: any;
  getData: any;
}

const ShowModal = ({
  userSelected,
  visible,
  setVisible,
  setSuccess,
  getData,
}: props) => {
  const theme = useTheme();
  const { https } = useHttps();
  const { primary } = theme.colors;
  const hideModal = () => setVisible(false);
  const [isDelete, setIsDelete] = React.useState(false);
  const [sendloading, setSendLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    setIsDelete(false)
  }, [userSelected])

  const handleDelete = async () => {
    try {
      setSendLoading(true);
      const response = await https.delete(`/users/${userSelected.id}`);
      if (response) {
        setVisible(false);
        setSuccess(true);
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
          Information sur le vendeur
        </Text>
        {userSelected && (
          <View>
            <Text
              style={{ color: "#000", fontWeight: "bold" }}
              variant="titleMedium"
            >
              Nom: <Text variant="titleMedium"> {userSelected.name}</Text>
            </Text>
            <Text
              style={{ color: "#000", fontWeight: "bold" }}
              variant="titleMedium"
            >
              Prenom:{" "}
              <Text variant="titleMedium"> {userSelected.last_name}</Text>
            </Text>
            <Text
              style={{ color: "#000", fontWeight: "bold" }}
              variant="titleMedium"
            >
              Email: <Text variant="titleMedium"> {userSelected.email}</Text>
            </Text>
            <Text
              style={{ color: "#000", fontWeight: "bold" }}
              variant="titleMedium"
            >
              Créer le :{" "}
              <Text variant="titleMedium">
                {" "}
                {formatDate(userSelected.createdAt)}
              </Text>
            </Text>
            <View style={styles.hr}></View>
            <Pressable
              onPress={() => setIsDelete(!isDelete)}
              style={styles.flexView}
            >
              <Text
                style={{ color: "red", textDecorationLine: "underline" }}
                variant="titleMedium"
              >
                Supprimer vendeur
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
                  Êtes-vous certain de vouloir supprimer cet employé ? Cette
                  action est irréversible et entraînera la suppression de tous
                  les droits d’accès associés à ce compte
                </Text>
                <Button
                  onPress={handleDelete}
                  disabled={sendloading}
                  uppercase={false}
                  mode="outlined"
                  style={{
                    width: "100%",
                    borderColor: "red",
                    borderRadius: 5,
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
