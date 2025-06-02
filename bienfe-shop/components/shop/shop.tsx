import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import Loading from "@/common/Loading";
import ShopCard from "../Home/shopCard/shopCard";
import Layout from "@/common/Layout";
import useHttps from "@/services/useHttps";
import Header from "../Home/Header/Header";
import { useFocusEffect } from "@react-navigation/native";

const Shop = () => {
  const [loading, setLoading] = React.useState(false);
  const [shops, setShops] = React.useState([] as any[]);
  const { https } = useHttps();

  useFocusEffect(
    React.useCallback(() => {
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
    }, [])
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      padding: 10,
    },
    noShopsText: {
      color: "red",
      marginTop: 20,
      textAlign: "center",
    },
    textLabel: {
      color: "#64B244",
      fontWeight: "bold",
      marginTop: 10,
      marginBottom: 10,
    },
  });

  return (
    <Layout fullBody={true} isScroll={false}>
      {/* Header FIXED */}
      <Header />

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {loading && <Loading />}

        {!loading && shops.length === 0 && (
          <Text style={styles.noShopsText} variant="labelSmall">
            Aucune boutique créée pour le moment
          </Text>
        )}

        {!loading && shops.length > 0 && (
          <>
            <Text style={styles.textLabel} variant="titleLarge">
              Votre boutique :
            </Text>

            {shops.map((shopItem: any) => (
              <ShopCard key={shopItem.id} shop={shopItem} />
            ))}
          </>
        )}
      </ScrollView>
    </Layout>
  );
};

export default Shop;
