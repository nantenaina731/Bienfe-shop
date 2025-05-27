
import React from "react";
import { StyleSheet, View,Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";
import Loading from "@/common/Loading";
import ShopCard from "../Home/shopCard/shopCard";
import Layout from "@/common/Layout";
const Shop = () => {
  const theme = useTheme();
  const { primary } = theme.colors;
  const [loading, setLoading] = React.useState(false);
  const [lavages, setLavages] = React.useState([] as any);
 
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: "#000",
      borderRadius: 7,
      padding: 3,
      marginBottom: 5,
    },
    badge: {
      backgroundColor: "#ffffff94",
      paddingTop: 5,
      paddingLeft: 5,
      paddingRight: 5,
      borderRadius: 10,
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
      marginBottom: 5,
    },
    content: {
      borderWidth: 1,
      borderColor: "white",
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 5,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
  return (
    <Layout fullBody={true} isScroll={true}>
    {loading && <Loading />}
    {!loading && lavages.length == 0 && (
      <Text
        style={{ color: "#fff", marginTop: 15, textAlign: "center" }}
        variant="labelSmall"
      >
        Aucune boutique creer pour le moment
      </Text>
    )}
    <View>
      {!loading &&
        lavages &&
        lavages.map((shop: any, idx: any) => (
          <ShopCard key={idx} shop={shop}/>
        ))}
    </View>
 
</Layout>

   );

};

export default Shop;
