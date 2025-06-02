import Layout from "@/common/Layout";
import Header from "./Header/Header";
import CreateShop from "./CreateShop/CreateShop";
import React, { useState } from "react";
import { Snackbar } from "react-native-paper";
import { View } from "react-native";
import { ShopInfo } from "@/types/types";
const initialShopInfoData = {
  name: "",
};

const Home = () => {
  const [fileData, setFileData] = useState(null as any);
  const [shopInfo, setShopInfo] = useState<ShopInfo>(
    initialShopInfoData
  );
  const toggleSnackBar = () => setVisible(!visible);
  const [visible, setVisible] = React.useState(false);
  const onDismissSnackBar = () => setVisible(false);
  return (
    <>
    <Layout
     fullBody={true}
     barDark={true}
    // isScroll={step == 2 ? false : true}
      >
           <Header />
           <CreateShop setFileData={setFileData}
            fileData={fileData} 
            toggleSnackBar={toggleSnackBar}
            setShopInfo={setShopInfo} 
            shopInfo={shopInfo}
           />
      </Layout>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={{
          backgroundColor: "#52977e",
          marginBottom: 80,
        }}
        elevation={0}
        action={{
          label: "Valider",
          onPress: () => {
            onDismissSnackBar();
          },
        }}
      >
       Votre boutique a bien été enregistrée.
      </Snackbar>
  
    </>
  );
};

export default Home;
