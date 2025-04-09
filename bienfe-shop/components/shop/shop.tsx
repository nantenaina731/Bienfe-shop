import Layout from "@/common/Layout";
import Header from "../Home/Header/Header";
import { Text } from "react-native-paper";
import { View } from "react-native";
const Shop = () => {
    return (
      <>

      <Layout
       fullBody={true}
       barDark={true}
      // isScroll={step == 2 ? false : true}
        >
             <Header/>
             
             <View>
              <Text style={{color:"#64B244", marginLeft:15,fontSize:20,marginTop:-70}} variant="titleMedium">Votre boutique :</Text>
             </View>
             <Text style={{color:"green",textAlign:"center",marginTop:100}}>Aucune boutique creer pour le moment.</Text>
        </Layout>
      </>
    );
  };
  
  export default Shop;
  