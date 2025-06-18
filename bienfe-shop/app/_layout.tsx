
import { theme } from "@/constants/Theme";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import store from "@/store/store";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
     <Provider store={store}>
      <PaperProvider theme={theme}>
        <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="tabs" options={{ headerShown: false }} />      
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="carts" options={{ headerShown: false }} />
      
          </Stack>
      </PaperProvider>
      </Provider>
  );
}