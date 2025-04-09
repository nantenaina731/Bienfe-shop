import { theme } from "@/constants/Theme";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
  
      <PaperProvider theme={theme}>
        <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
          
          
          </Stack>
      </PaperProvider>
    
  
  );
}