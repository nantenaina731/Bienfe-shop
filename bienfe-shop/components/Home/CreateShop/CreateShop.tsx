import CustomButton from "@/common/CustomButton/CustomButton";
import CustomInput from "@/common/CustomInput/CustomInput";
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Text} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { ShopInfo} from "@/types/types";
import { Image } from "expo-image";
import ErrorView from "@/common/ErrorView/ErrorView";
import useHttps from "@/services/useHttps";
import { useFocusEffect } from "expo-router";
const initialLavageInfoData = {
  name:"",
};
interface props {
  setShopInfo: Dispatch<SetStateAction<ShopInfo>>;
  shopInfo: any;
  toggleSnackBar: any;
  fileData: any;
  setFileData: any;
}


const CreateShop=( {fileData,setFileData, setShopInfo,toggleSnackBar,shopInfo}:props)=>{
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const {httpsFile } = useHttps();

  const handleChange = (name: string, value: string) => {
    setShopInfo( ({
      ...shopInfo,
      [name]: value,
    }));
  };
  
  const handleValidate = async () => {
     {
      try {
        setErrorMessage(null);
        setLoading(true);
        const formData = new FormData();       
        formData.append("name", shopInfo.name);
        if (fileData) {
          formData.append("logo", fileData, fileData.name+".jpg");
        }
        let response = await httpsFile.post("/createshop", formData);
        if (response) {
          toggleSnackBar();
          setShopInfo(initialLavageInfoData);
          setFileData(null);
        }
      } catch (error: any) {
        console.log(error);
        if (error.response) {
          console.log(error.response);
          setErrorMessage(error.response.data);
        } else if (error.request) {
          console.log(error.request);
          setErrorMessage("Request error");
          console.log("Error request:", error.request);
        } else {
          setErrorMessage("Une érreur c'est produite");
          console.log("Error message:", error.response);
        }
      } finally {
        setLoading(false);
      }
  };
};
const handleTakePhoto = async () => {
  const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  if (permissionResult.granted === false) {
    Alert.alert("Permission pour accéder à l'appareil photo a été refusée !");
    return;
  }

  let result : any = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    quality: 0.7
  });

  if (!result.cancelled) {
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
           value={shopInfo.name}
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
                marginBottom: 5,
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
            onPress={handleValidate}
            disabled={loading}
          />
           {errorMessage && <ErrorView errorMessage={errorMessage} />}
  
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

  

