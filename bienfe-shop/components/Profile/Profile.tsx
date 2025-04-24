import Layout from "@/common/Layout";
import AppHeader from "@/common/Layout/Header";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Menus from "./Menus/Menus";
import { profilePage } from "@/types/types";
import { Text, useTheme } from "react-native-paper";
import MonCompte from "./MonCompte/MonCompte";
import SuccessSnackBar from "@/common/SuccessSnackBar/SuccessSnackBar";
import Users from "./Users/Users";
import Admin from "./Admin/Admin";
import useToken from "@/services/useToken";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";


const Profile = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  const theme = useTheme();
  const { primary } = theme.colors;
  const [activePage, setActivePage] = useState<profilePage>("Mon compte");
  const [success, setSuccess] = useState<boolean>(false);
  const { token } = useToken();
  const isAdmin = token.type == "admin";
  console.log("Token:", token);

  const displayPage = () => {
    switch (activePage) {
      case "Vendeur":
        return <Users setSuccess={setSuccess} />;
      case "Administrateurs":
        return <Admin setSuccess={setSuccess} />;
      default:
        return <MonCompte setSuccess={setSuccess} />;
    }
  };

  return (
    <>
      <Layout fullBody isScroll>
        <AppHeader hideProfile />
        <View
          style={{
            padding: 10,
          }}
        >
          <Text style={styles.textLabel} variant="titleLarge">
            Gestion de{" "}
            <Text style={{ color: primary }} variant="titleLarge">
              compte
            </Text>
          </Text>
          {isAdmin && (
            <Menus activePage={activePage} setActivePage={setActivePage} />
          )}
          {displayPage()}
          
        </View>
      </Layout>
      <SuccessSnackBar mb={10} visible={success} setVisible={setSuccess} />
    </>
  );
};

const styles = StyleSheet.create({
  textLabel: {
    color: "#000",
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default Profile;
