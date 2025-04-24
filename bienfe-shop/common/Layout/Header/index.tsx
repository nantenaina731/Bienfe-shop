import { router, useNavigation } from "expo-router";
import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

interface props {
  title?: string;
  showBackBtn?: boolean;
  hideProfile?: boolean;
}

const AppHeader = ({
  title,
  showBackBtn = true,
  hideProfile = false,
}: props) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { primary } = theme.colors;

  const styles = StyleSheet.create({
    header: {
      backgroundColor: "transparent",
      display: "flex",
      justifyContent: "space-between",
      paddingLeft: hideProfile ? 0 : 10,
      paddingRight: 10,
    },
    image: {
      width: 120,
      height: 55,
      resizeMode: "contain",
    },
  });

  const goBack = () => {
    navigation.goBack();
  };

  const goProfile = () => {
    router.push("/profile");
  };

//  const goUsers = () => {
  //  router.push("/users");
 // };

  return (
    <Appbar.Header style={styles.header}>
      {showBackBtn && <Appbar.BackAction color={"#000"} onPress={goBack} />}
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.image}
      />
      {/* <Appbar.Content color={"white"}  title="Title" /> */}
      {!hideProfile && (
         <View style={{display: "flex", flexDirection: "row", gap: 0}}>
          <Appbar.Action
            color={"#000"}
            style={{marginLeft: 0}}
            size={28}
            icon={() => (
              <FontAwesome5 name="users" size={22} color={"#000"} />
            )}
           // onPress={goUsers}
          />
          <Appbar.Action
            color={"#000"}
            style={{marginLeft: 0}}
            size={25}
            icon={() => (
              <FontAwesome name="user-circle" size={25} color={"#000"} />
            )}
            onPress={goProfile}
          />
         </View>
      )}
    </Appbar.Header>
  );
};

export default AppHeader;
