
import React from "react";
import { StyleSheet, View,Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { BaseUrl } from "@/services/useHttps";
import { Image } from "expo-image";

interface props {
  shop: any;
}


const ShopCard = ({ shop }: props) => {
  const theme = useTheme();
  const { primary } = theme.colors;
  const [visible, setVisible] = React.useState(false);
  const [selected, setSelected] = React.useState(null as any);
  const handleView = () => { 
    setSelected(shop)
    setVisible(true)
  }

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
    <Pressable onPress={handleView} style={styles.content}>

      <View>
        {shop.logo && shop.logo.data && shop.logo.data[0] && (
          <View style={{ width: "40%", padding: 0 }}>
            <Image
              source={{ uri: BaseUrl + "/logo/" + shop.logo.data[0] }}
              style={{
                width: "100%",
                height: 100,
                borderRadius: 5,
                marginBottom: 5,
              }}
            />
            
          </View>
      
        )}
           <View style={styles.badge}>
                <Text style={{ color: "#333" }} variant="labelSmall">
                  Nom {shop.name}
                </Text>
              </View>
           
          </View>
        </Pressable>
   );

};

export default ShopCard;
