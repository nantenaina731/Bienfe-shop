import React from "react";
import { View } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
//import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
//import Ionicons from "react-native-vector-icons/Ionicons";
//import MaterialIcons from "react-native-vector-icons/MaterialIcons";
//import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "../Home/Home";
import Shop from "../shop/shop";
const Tab = createBottomTabNavigator();

export default function TabScreen() {
 // const theme = useTheme();
   // const { primary, secondary } = theme.colors;
 // const { token } = useToken();
  //const isAdmin = token && token.type == "admin";

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <View
          style={{
            position: "absolute",
            left:  75,
            right: 75,
            bottom: 20,
            borderRadius: 50,
            overflow: "hidden",
            height: 50,
            justifyContent: "center",
          }}
        >
          <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            activeColor={"white"}
            labeled={false}
            inactiveColor="white"
            style={{
              backgroundColor: "black",
              
            }}
            theme={{
              colors: {
                secondaryContainer: "transparent",
              },
            }}
            onTabPress={({ route, preventDefault }) => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (event.defaultPrevented) {
                preventDefault();
              } else {
                navigation.dispatch({
                  ...CommonActions.navigate(route.name, route.params),
                  target: state.key,
                });
              }
            }}
            renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key];
              const iconBackgroundColor = focused ? "#64B244" : "transparent";

              if (options.tabBarIcon) {
                return (
                  <View
                    style={{
                      backgroundColor: iconBackgroundColor,
                      borderRadius: 25, // Adjust this value as needed for the roundness
                      alignItems: "center",
                      justifyContent: "center",
                      width: 33,
                      height: 33,
                    
                    }}
                  >
                    {options.tabBarIcon({ focused, color, size: 23 })}
                  </View>
                );
              }

              return null;
            }}
            getLabelText={({ route }: any) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.title;

              return label;
            }}
          />
        </View>
      )}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Shop"
        component={Shop}
        options={{
          tabBarLabel: "Shop",
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name="shopping-cart" size={size} color={color} />;
          },
        }}
      />
     </Tab.Navigator>

 )
 }