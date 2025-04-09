import CustomButton from "@/common/CustomButton/CustomButton";
import CustomInput from "@/common/CustomInput/CustomInput";
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
//import * as ImagePicker from "expo-image-picker";
//import { Image } from "expo-image";
import { useFocusEffect } from "expo-router";
const CreateShop=()=>{
const handleValidate=()=>{
    console.log('click')
}
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
         // handleChange={handleChange}
          //value={lavageInfo.carMatricul}
          height={45}
          fontSize={14}
        />
      </View>
      <Button
          //  onPress={handleTakePhoto}
            uppercase={false}
            mode="outlined"
            style={{borderRadius: 10,borderColor:"#64B244",}}
            textColor="#64B244"
          >
            Choisir logo
          </Button>

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

  

