import CustomButton from "@/common/CustomButton/CustomButton";
import CustomInput from "@/common/CustomInput/CustomInput";
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import SuccessSnackBar from "@/common/SuccessSnackBar/SuccessSnackBar";
import { Button, Text, useTheme } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { ShopInfo} from "@/types/types";
import { Image } from "expo-image";
import ErrorView from "@/common/ErrorView/ErrorView";
import useHttps from "@/services/useHttps";
import { useFocusEffect } from "expo-router";
let initialValue = {
  
  name: "",
  logo:"",
};

const CreateShop=( {fileData,setFileData, getShop}:any)=>{
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sendloading, setSendLoading] = useState(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState(initialValue);

  const { https } = useHttps();

  const handleChange = (name: string, value: string) => {
    setData( ({
      ...data,
      [name]: value,
    }));
  };
  
  const handleSubmit = async () => {
    setErrorMessage(null);
  
    if ((data.name ?? "").trim() !== "") {
      try {
        setSendLoading(true);
        
        const formData = new FormData();
        formData.append("name", data.name);
  
        if (fileData) {
          formData.append("logo", {
            uri: fileData.uri,
            name: fileData.name,
            type: fileData.type,
          } as any); // TypeScript peut râler ici, mais `as any` contourne l'erreur
        }
  
        const response = await https.post("/createshop", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        if (response) {
          setSuccess(true);
          setData(initialValue);
          setFileData(null);
        }
      } catch (error: any) {
        if (error.response) {
          setErrorMessage(error.response.data);
        } else if (error.request) {
          setErrorMessage("Request error");
          console.log("Error request:", error.request);
        } else {
          setErrorMessage("Une erreur s'est produite");
          console.log("Error message:", error.message);
        }
      } finally {
        setSendLoading(false);
      }
    } else {
      setErrorMessage("Compléter les champs");
    }
  };
    const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (!permissionResult.granted) {
      Alert.alert("Permission pour accéder à la galerie a été refusée !");
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
  
    if (!result.canceled) {
      const file = result.assets[0];
  
      const fileToUpload = {
        uri: file.uri,
        name: Date.now().toString() + ".jpeg",
        type: file.mimeType || "image/jpeg",
      };
  
      // Stocke seulement le fichier dans fileData
      setFileData(fileToUpload);
  
      // Mets à jour localement le champ logo (juste pour affichage si tu veux)
      setData((prev) => ({
        ...prev,
        logo: file.uri,
      }));
    }
  };
  
return(
<View style={styles.container}>
      <View>
        <Text style={styles.textLabel} variant="titleLarge">
        Création 
        </Text>
      </View>

      <View style={{ marginTop: 15 }}>
        <Text style={{color:'white',fontWeight:"bold"}} variant="titleMedium">
          Nom du boutique
        </Text>
        <CustomInput
           name="name"
           label="Nom du boutique"
           handleChange={handleChange}
           value={data.name}
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
         
        </View>
      
      <View style={{ marginTop: 15 }}>
      
            <View style={{ marginTop: 15 }}>
          <CustomButton
            rounded
            width={"70%"}
            height={50}
            text="Creer boutique"
            onPress={handleSubmit}
            disabled={sendloading}
          />
           {errorMessage && <ErrorView errorMessage={errorMessage} />}
  
        </View>
        <SuccessSnackBar mb={10} visible={success} setVisible={setSuccess} />
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
      marginTop: 3,
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

  

