import CustomButton from "@/common/CustomButton/CustomButton";
import CustomInput from "@/common/CustomInput/CustomInput";
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { useFocusEffect } from "expo-router";
interface props {
  fileData: any;
  setFileData: any;
}

const CreateShop=( {fileData,setFileData}:props)=>{
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

const handleChange=()=>{
    console.log('change')
}
const handleValidate=()=>{
    console.log('click')
}

const handleTakePhoto = async () => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    Alert.alert("Permission pour accéder à la galerie a été refusée !");
    return;
  }

  let result: any = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    quality: 0.7,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
  });

  if (!result.canceled) {
    let file = result.assets[0];
    const fileToUpload = {
      uri: file.uri,
      name: Date.now().toString() + ".jpeg",
      type: file.mimeType || "application/octet-stream",
    };
    setFileData(fileToUpload);
  
    // setVisible(false)
  }
  
};

return(
<View style={styles.container}>
      <View>
        <Text style={styles.textLabel} variant="titleLarge">
          Creation
        </Text>
      </View>

      <View style={{ marginTop: 15 }}>
        <Text style={{color:'white',fontWeight:"bold"}} variant="titleMedium">
          Nom du boutique
        </Text>
        <CustomInput
         name="nom"
          label={"Nom du boutique"}
          handleChange={handleChange}
          //value={lavageInfo.carMatricul}
          height={45}
          fontSize={14}
        />
      </View>
      <View style={{ marginTop: 15, display: "flex" }}>
        
      <Button
           onPress={handleTakePhoto}
            uppercase={false}
            mode="outlined"
            style={{borderRadius: 10,borderColor:"#64B244",}}
            textColor="#64B244"
            
          >
            Choisir logo
          </Button>
          </View>
          <View style={{ marginTop: 15, display: "flex" }}>
          {fileData && (
            <Image
              source={{ uri: fileData.uri }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 5,
                marginBottom: 5
              }}
            />
          )}
         
          <Button
            onPress={handleTakePhoto}
            uppercase={false}
            mode="outlined"
            style={{borderRadius: 7}}
          >
            {fileData ? "Changer l'image" : "Prendre une photo"}
          </Button>
        </View>
        { /*errorMessage && <ErrorView errorMessage={errorMessage} />*/}
      
      <View style={{ marginTop: 15 }}>
      
            <View style={{ marginTop: 15 }}>
          <CustomButton
            rounded
            width={"70%"}
            height={50}
            text="Creer boutique"
            onPress={handleValidate}
          />
          
        </View>
      </View>
    </View>
    
);
};
const styles = StyleSheet.create({
    container: {
      width: "90%",
      backgroundColor: "#000",
      borderRadius: 15,
      color: "white",
      padding: 15,
      marginTop: -55,
      marginLeft:19
    },
    textLabel: {
      color: "white",
      fontWeight: "bold",
      textAlign:"center",
      marginBottom:20
    },
    flexView: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      flexWrap: "wrap",
    },
  });
  
  export default CreateShop;

  

