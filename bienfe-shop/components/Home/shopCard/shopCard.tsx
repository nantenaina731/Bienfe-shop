import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Text, useTheme, IconButton, Provider } from "react-native-paper";
import { BaseUrl } from "@/services/useHttps";
import { Image } from "expo-image";
import ShopModify from "./shopModify/shopModify";
import useToken from "@/services/useToken";

interface Props {
  shop: any;
  getData: () => void;
  setSuccess: () => void;
}

const ShopCard = ({ shop, getData, setSuccess }: Props) => {
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [shopModify, setshopModify] = React.useState(false);

  const handleView = () => {
    setVisible(true);
  };

  const { token } = useToken();
  const isAdmin = token.type == "admin";

  const show = () => {
    if (isAdmin) {
      setshopModify(true);
    }
  };

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      borderRadius: 7,
      padding: 10,
      marginBottom: 5,
    },
    name: {
      marginTop: "-19%",
      marginLeft: "55%",
    },
    content: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    imageWrapper: {
      width: "30%",
      marginRight: 10,
    },
    image: {
      width: "100%",
      height: 100,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    card: {
      flex: 1,
      marginHorizontal: 1,
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 10,
      elevation: 2,
    },
    dots: {
      position: "absolute",
      right: 0,
      top: -75,
    },
  });

  return (
    <>
      <Pressable onPress={handleView} style={styles.container}>
        <View style={styles.content}>
          <View style={styles.card}>
            <View style={styles.imageWrapper}>
              {shop.logo?.data?.[0] ? (
                <Image
                  source={{ uri: BaseUrl + "/logo/" + shop.logo.data[0] }}
                  style={styles.image}
                />
              ) : (
                <View
                  style={[
                    styles.image,
                    { backgroundColor: "#444", justifyContent: "center", alignItems: "center" },
                  ]}
                >
                  <Text style={{ color: "white" }}>Pas de logo</Text>
                </View>
              )}
            </View>

            <View style={{ flex: 1 }}>
              <View style={styles.name}>
                <Text style={{ color: "#333", fontWeight: "bold" }} variant={"bodyMedium"}>
                  {shop.name}
                </Text>
              </View>
              <View style={styles.dots}>
                <IconButton
                  icon="dots-vertical"
                  size={24}
                  onPress={show}
                />
              </View>
            </View>
          </View>
        </View>
      </Pressable>

      <ShopModify
        selected={shop}
        visible={shopModify}
        setVisible={setshopModify}
        getData={getData}
        setSuccess={setSuccess}
      />
    </>
  );
};

export default ShopCard;
