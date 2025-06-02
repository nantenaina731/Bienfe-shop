import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Text, useTheme ,IconButton} from "react-native-paper";
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
      backgroundColor: "",
      borderRadius: 7,
      padding: 10,
      marginBottom: 10,
    },
    name: {
      backgroundColor: "#ffffff94",
      paddingVertical: 5,
      paddingHorizontal:5,
      borderRadius: 10,
      marginTop:"-21%",
      marginLeft:'45%',
      fontWeight:"bold"
    
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
      alignItems:"center",
      justifyContent:"center"

    },
    card:{
      flex:1,
      marginHorizontal:1,
      backgroundColor:"#fff",
      borderRadius:10,
      padding:4,
      elevation:2,
    },
    dots:{
      position:"fixed",
      left:"80%",
      bottom:30
    }
  });

  return (
    <Pressable onPress={handleView} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.card}>
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
          <View style={styles.name}>
            <Text style={{ color: "#333",fontWeight:"bold" }} variant={"bodyMedium"}>
               {shop.name}
            </Text>
           
          </View>
          <View style={styles.dots}>
            <IconButton
  icon="dots-vertical"
  size={24}
  onPress={() => console.log("Menu options pressed")}
/>
</View>
        </View>
      </View>
      </View>
    </Pressable>
  );
};

export default ShopCard;
