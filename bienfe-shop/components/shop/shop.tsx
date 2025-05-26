import Layout from "@/common/Layout";
import Header from "../Home/Header/Header";
import Loading from "@/common/Loading";
import React, { useCallback, useEffect } from "react";
import ShopCard from "../Home/shopCard/shopCard"
import { Text } from "react-native-paper";
import { View,TouchableOpacity } from "react-native";
import ErrorView from "@/common/ErrorView/ErrorView";
import Nodata from "@/common/Nodata/Nodata";
const [errorMessage] = React.useState<string | null>(null);
const [loading] = React.useState(false);
const [data] = React.useState([] as any);
const Shop = () => {
    return (
      <>

      <Layout
     >
             <Header/>
             
            <View style={{ paddingLeft: 5, margin: 5 }}>
            <Text variant="titleMedium">
              Votre boutique:
            </Text>
           
          </View>
          {errorMessage && <ErrorView errorMessage={errorMessage} />}
          <View style={{ marginTop: 10, marginBottom: 100 }}>
            {!loading && data.length == 0 && (
              <Nodata color="#000" text="Aucune boutique creer pour le moment" />
            )}
           {!loading && data &&
          data.map((item: any) => (
           <TouchableOpacity key={item.id}>
           <ShopCard type={item} />
           </TouchableOpacity>
  ))
}
{loading && <Loading />}
         </View>
         
        </Layout>
      </>
    );
  };
  
  export default Shop;
  