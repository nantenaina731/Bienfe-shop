import React, { useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import Loading from "@/common/Loading";
import ShopCard from "../Home/shopCard/shopCard";
import Layout from "@/common/Layout";
import useHttps from "@/services/useHttps";
import Header from "../Home/Header/Header";
import { useFocusEffect } from "@react-navigation/native";
import Carts from "../Carts/Carts";
import Ionicons from "react-native-vector-icons/Ionicons";

const Shop = ({ setSuccess }: { setSuccess: any }) => {
  const [loading, setLoading] = React.useState(false);
  const [shops, setShops] = React.useState([] as any[]);
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null); // ← nouveau
  const { https } = useHttps();

  const getData = async () => {
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

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      padding: 10,
      paddingBottom: 100,
    },
    noShopsText: {
      color: "red",
      marginTop: 200,
      textAlign: "center",
    },
    textLabel: {
      color: "#64B244",
      fontWeight: "bold",
      marginTop: 10,
      marginBottom: 10,
    },
    returnText: {
      color: "#007aff",
      textAlign: "right",
      marginBottom: 10,
    },
    header:{
      backgroundColor:"white",
    },
    icon:{
      top:20,
      left:10
    },
    shopIcon:{
      marginLeft:"70%",
      marginTop:"-8%"
    }
  });

  if (selectedShopId !== null) {
    const selectedShopName =
    shops.find((shop) => shop.id === selectedShopId)?.name || "";
    return (
      <>
      <View style={styles.header} >
       <Ionicons style={styles.icon} name="arrow-back" size={28} color="black" onPress={() => setSelectedShopId(null)} />
       <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft:"79%" }}>
          {selectedShopName}
        </Text>
        <Ionicons style={styles.shopIcon} name="storefront" size={28} color="#64B244"/>
       </View>    
        <Carts setSuccess={setSuccess} shopId={selectedShopId} />
      </>
    );
  }

  return (
    <Layout fullBody={true} isScroll={false}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {loading && <Loading />}
        {!loading && shops.length === 0 && (
          <Text style={styles.noShopsText} variant="labelSmall">
            Aucune boutique créer pour le moment .
          </Text>
        )}
        {!loading && shops.length > 0 && (
          <>
            <Text style={styles.textLabel} variant="titleLarge">
              Votre boutique :
            </Text>
            {shops.map((shopItem: any) => (
             
                <ShopCard
                  key={shopItem.id}    
                  shop={shopItem}
                  setSuccess={setSuccess}
                  getData={getData}
                  onPress={() => {
                    setSelectedShopId(shopItem.id);
                  }}
                  
                />
                
            ))}
          </>
        )}
      </ScrollView>
    </Layout>
  );
};

export default Shop;
