import CustomButton from "@/common/CustomButton/CustomButton";
import CustomInput from "@/common/CustomInput/CustomInput";
import ErrorView from "@/common/ErrorView/ErrorView";
import Layout from "@/common/Layout";
import useHttps from "@/services/useHttps";
import useToken from "@/services/useToken";
import { userToSend } from "@/types/types";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View,Image,TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

const Login = () => {
  const[loading,setloading]=useState(false)
  
  const [data, setData] = useState<userToSend>({
    email: "",
    password: "",
  });
  
  const [error, setError] = useState<null | string>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { https } = useHttps();
  const { setAuthToken } = useToken();

  const handleChange = (name: string, value: string) => {
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit =async( ) => {
   
    if(data.email.trim() && data.password.trim()) {
      try {
        setloading(true);
        setError(null);
        let toSend: userToSend = data;
        toSend.email = toSend.email.trim();
        let response = await https.post("/users/login", toSend);
        if (response) {
          let res = response.data
          setAuthToken({
            ...res.user,
            token: res.token
          })
        
          router.replace('/tabs')
         
        }
        
      } catch (error: any) {
        setError(error);
        if (error.response) {
           setErrorMessage(error.response.data);
        } else if (error.request) {
          console.log(error.request)
          setErrorMessage("Request error")
          console.log("Error request:", error.request);
        } else {
          setErrorMessage("Une érreur c'est produite")
          console.log("Error message:", error.response);
        }
      } finally {
        setloading(false);
      }
    }
    else {
      setError("error");
      setErrorMessage("Vous devez completer les champs");
    }
  };

  return (
    <Layout isScroll={true}>
      <View style={styles.container}>
        <Image  
        source={require("../assets/images/logo.png")}
        style={{top:-95,marginLeft:"31%", width: 120,
        height: 22,}}
        />
        <Text style={styles.firstTitle} variant="titleMedium">
          Bonjour et Bienvenue!
        </Text>
        <Text style={styles.secondTitle} >
          Pour commencer votre journées,veuillez vous-connectez
        </Text>
        
        <View style={styles.formContainer}>
          <View style={styles.allInput}>
          <View>
            
            <CustomInput
              name="email"
              label={" Email"}
              handleChange={handleChange}
              value={data.email}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <CustomInput
              name="password"
              label={" Mots de passe"}
              value={data.password}
              handleChange={handleChange}
            />
          </View>
          </View>
          <CustomButton
            mt={27}
            rounded={false}
            text={ loading ? " Chargement...":"connexion"}
            onPress={handleSubmit}
            disabled={loading}
          />
           {error && <ErrorView errorMessage={errorMessage} />}
          </View>
            </View>
            
    </Layout>
    
  );
  };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "50%",
  },
  firstTitle: {
    fontWeight: "500",
    fontSize: 16,
    top: '-7%',
    color:"#64B244",
    textAlign:"center"
  },
  secondTitle: {
    marginTop: 0,
    fontSize: 12,
    color:"#000000",
    top:"2%",
    textAlign:"center"
  },
  formContainer: {
    marginTop: "25%",
  },
  inputLabel: {
    fontWeight: "bold",
    fontSize: 18,
  },
  first:{
    color:"red",
  },
  logo:{
    width:"100%",
    height:"13%",
    top:"-9%",
    left:"31%",
    fontSize:19,
    color:"#0C1D32",
  },
  allInput:{
    top:"-12%"
  },
  text:{
    padding:13,
    fontSize:13,
    
  },
  one:{
    textAlign:"center",
    fontSize:13,
    paddingTop:"10%"
  },
  inscrire:{
  textDecorationLine:"underline",
  bottom:"-20%",
  color:"#0C1D32"
  },
 
  g:{
    color:"#007AAD",

  }
 
});

export default Login;
