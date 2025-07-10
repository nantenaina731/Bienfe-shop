import { productPage } from "@/types/types";
import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
interface props {
  styles?: any;
  active?: boolean;
  title: string;
  changePage: any;
}

interface menuPops {
  activePage: productPage;
  setActivePage: Dispatch<SetStateAction<productPage>>;
}

const pages = ["Vente de produit", "Gestion de produit","Chiffre d'affaire"];

const Menus = ({ activePage, setActivePage }: menuPops) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const changePage = (page: productPage) => {
    setActivePage(page);
  };

  return (
    <View style={styles.container}>
      {pages.map((page: string, idx: number) => (
        <MenuItem
          key={idx}
          changePage={changePage}
          title={page}
          active={activePage == page}
        />
      ))}
    </View>
  );
};

const MenuItem = ({ title, active, changePage }: props) => {
  const theme = useTheme();
  const styles = createStyles(theme, active);

  return (
    <Text onPress={() => changePage(title)} style={styles.badge}>
      {title}
    </Text>
  );
};

const createStyles = (theme: any, active?: boolean) =>
  StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      gap: 10,
      marginBottom: 10,
      flexWrap:"wrap"
    },
    textLabel: {
      color: "white",
      fontWeight: "bold",
    },
    badge: {
      color: active? "white": "#64B244" ,
      padding:6,
      borderWidth: 1,
      backgroundColor: active ? "#64B244" : "white",
      paddingTop: 5,
      borderRadius: 5,
      justifyContent: "center",
      display: "flex",
      borderColor: "#64B244",
    },
  });

export default Menus;
