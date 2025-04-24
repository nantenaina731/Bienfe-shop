import { StyleSheet, View, Image } from "react-native";
import { IconButton, Text } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { router } from "expo-router";
const goProfile = () => {
  router.push("/profile");
};
const Header = () => {
  return (
    <View style={styles.container}>
     <View style={styles.flexEnd}>
      <Image
        source={require("../../../assets/images/logo.png")}
        style={styles.logo}
      />

          <IconButton
            icon={() => (
              <FontAwesome name="user-circle" size={30} color={"black"} />
            )}
            iconColor={"white"}
            size={20}
            onPress={goProfile}
          />
      </View>
    </View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 210,
    position: "relative",
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginLeft: 12,
  },
  flexEnd: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

});

export default Header;
