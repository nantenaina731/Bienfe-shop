import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { BaseUrl } from "@/services/useHttps";
import { Image } from "expo-image";

interface Props {
  shop: any;
}

const ShopCard = ({ shop }: Props) => {
  const theme = useTheme();
  const { primary } = theme.colors;
  const [visible, setVisible] = React.useState(false);
  const [selected, setSelected] = React.useState<any>(null);

  const handleView = () => {
    setSelected(shop);
    setVisible(true);
  };

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: "#000",
      borderRadius: 7,
      padding: 10,
      marginBottom: 10,
    },
    badge: {
      backgroundColor: "#ffffff94",
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 5,
    },
    content: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    imageWrapper: {
      width: "40%",
      marginRight: 10,
    },
    image: {
      width: "100%",
      height: 100,
      borderRadius: 5,
    },
  });

  return (
    <Pressable onPress={handleView} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageWrapper}>
          {shop.logo && shop.logo.data && shop.logo.data[0] ? (
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
          <View style={styles.badge}>
            <Text style={{ color: "#333" }} variant="labelSmall">
              Nom: {shop.name}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ShopCard;
