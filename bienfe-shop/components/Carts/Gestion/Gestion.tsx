import Loading from "@/common/Loading";
import { formatDateMinim, formatMoney } from "@/services/services";
import useHttps from "@/services/useHttps";
import useToken from "@/services/useToken";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { DataTable, Text, useTheme } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AddModal from "./AddModal/AddModal";
import ShowModal from "./ShowModal/ShowModal";
import ErrorView from "@/common/ErrorView/ErrorView";

interface props {
  setSuccess: any;
}

const Gestion = ({ setSuccess }: props) => {
  const theme = useTheme();
  const { primary } = theme.colors;
  const [data, setData] = useState([] as any);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userSelected, setUserSelected] = useState<any>(null);
  const { token } = useToken();
  const { https } = useHttps();
  const styles = createStyles(theme);

  const getData = async () => {
    try {
      setErrorMessage(null);
      setLoading(true);
      let response = await https.get('/products');
      if (response) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Une erreur c'est produite");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getData();
    }
  }, []);

  const show = (id: any) => {
    setShowModal(true);
    setUserSelected(id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.flexView}>
        <Text
          style={{ color: "#000", fontWeight: "bold" }}
          variant="titleMedium"
        >
          Liste des produits
        </Text>
        <Pressable style={styles.add} onPress={() => setAddModal(true)}>
          <MaterialIcons name="add-box" size={20} color={"white"} />
        </Pressable>
      </View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Nom </DataTable.Title>
          <DataTable.Title>PU</DataTable.Title>
          <DataTable.Title>Stock</DataTable.Title>
        </DataTable.Header>
        {loading && <Loading />}
        {!loading && data.length == 0 && (
          <DataTable.Row>
            <DataTable.Cell>Aucun données</DataTable.Cell>
          </DataTable.Row>
        )}
        {!loading &&
          data &&
          data.map((item: any, idx: number) => (
            <DataTable.Row key={idx} onPress={() => show(item)}>
              <DataTable.Cell>
                {item.name}
              </DataTable.Cell>
              <DataTable.Cell>{formatMoney(item.price)} MGA</DataTable.Cell>
              <DataTable.Cell>{item.quantity}</DataTable.Cell>
            </DataTable.Row>
          ))}
      </DataTable>
      {errorMessage && <ErrorView errorMessage={errorMessage} />}
      <ShowModal
        selected={userSelected}
        visible={showModal}
        setVisible={setShowModal}
        setSuccess={setSuccess}
        getData={getData}
      />
      <AddModal
        setSuccess={setSuccess}
        visible={addModal}
        setVisible={setAddModal}
        getData={getData}
      />
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      marginTop: 25,
    },
    flexView: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    button: {
      height: 30,
    },
    add: {
      backgroundColor: theme.colors.primary,
      padding: 5,
      borderRadius: 3,
    },
  });

export default Gestion;
