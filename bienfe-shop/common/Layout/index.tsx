import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

interface props {
  children: any;
  title?: string;
  barDark?: boolean;
  isScroll?: boolean | null;
  fullBody?: boolean | null;
}

function Layout({
  children,
  barDark = true,
  isScroll,
  fullBody,
}: props) {
  return (
    <SafeAreaView style={styles.body}>
      <StatusBar
        animated={true}
        backgroundColor="#000"
        barStyle={"light-content"}
      />
      {isScroll ? (
        <ScrollView style={fullBody ? styles.containerFull : styles.container}>
          {children}
        </ScrollView>
      ) : (
        <View style={fullBody ? styles.containerFull : styles.container}>
          {children}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    padding: 20,
  },
  containerFull: {
    padding: 0,
  },
});

export default Layout;
