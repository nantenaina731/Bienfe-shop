import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import Loading from "@/common/Loading";
import ShopCard from "../Home/shopCard/shopCard";
import Layout from "@/common/Layout";
import useHttps from "@/services/useHttps";
import Header from "../Home/Header/Header";
const Shop = () => {
  const theme = useTheme();
  const { primary } = theme.colors;
  const [loading, setLoading] = React.useState(false);
  const [shops, setShops] = React.useState([] as any[]);
  const { https } = useHttps();

  React.useEffect(() => {
    const fetchShops = async () => {
      try {
        setLoading(true);
        const response = await https.get("/createshop");
        if (response?.data) {
          setShops(response.data);
        }
      } catch (error) {
        console.log("Erreur lors du chargement des shops :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: "#000",
      borderRadius: 7,
      padding: 3,
      marginBottom: 5,
    },
    noShopsText: {
      color: "red",
      marginTop: 20,
      textAlign: "center",
    },
  });

  return (
    <Layout fullBody={true} isScroll={true}>
       <Header /> 

      {loading && <Loading />}

      {!loading && shops.length === 0 && (
        <Text style={styles.noShopsText} variant="labelSmall">
          Aucune boutique créée pour le moment
        </Text>
      )}

      <View>
        {!loading &&
          shops.map((shopItem: any) => (
            <ShopCard key={shopItem.id} shop={shopItem} />
          ))}
      </View>
    </Layout>
  );
};

export default Shop;
