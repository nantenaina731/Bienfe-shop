import CustomButton from "@/common/CustomButton/CustomButton";
import CustomInput from "@/common/CustomInput/CustomInput";
import ErrorView from "@/common/ErrorView/ErrorView";
import Loading from "@/common/Loading";
import useHttps from "@/services/useHttps";
import useToken from "@/services/useToken";
import { router } from "expo-router";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

interface props {
  setSuccess: Dispatch<SetStateAction<boolean>>;
}

const MonCompte = ({ setSuccess }: props) => {
  const theme = useTheme();
  const { primary } = theme.colors;
  const [data, setData] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sendloading, setSendLoading] = useState(false);
  const { token, deleteToken } = useToken();
  const { https } = useHttps();

  const handleChange = (name: string, value: string) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const getData = async () => {
    try {
      setLoading(true);
      let response = await https.get(`/users/${token.id}`);
      if (response) {
        setData({
          ...response.data,
          password: "",
          confirm_password: "",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getData();
    }
  }, []);

  const handleSubmit = async () => {
    setErrorMessage(null);
    if (data.password.trim() != "" && data.password !== data.confirm_password) {
      setErrorMessage("Mot de passe et confirmation invalide");
      return;
    }
    if (data.name.trim() != "" && data.last_name.trim() != "") {
      try {
        setSendLoading(true);
        const toSend: any = data;
        toSend.id = token.id;
        let url = "/no-password";

        if (data.password.trim() != "") url = "/";
        console.log(url);
        const response = await https.put(`/users${url}`, toSend);
        if (response) {
          getData();
          setSuccess(true);
        }
      } catch (error: any) {
        if (error.response) {
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
        setSendLoading(false);
      }
    } else {
      setErrorMessage("Compléter les champs");
    }
  };

  return (
    <View>
      <View style={styles.container}>
        {loading && <Loading />}
        <View style={{ marginBottom: 10 }}>
          {!loading && (
            <>
              <Text
                style={{ color: "#fff", fontWeight: "bold" }}
                variant="titleMedium"
              >
                Nom
              </Text>
              <CustomInput
                name="name"
                label={"Nom..."}
                value={data.name}
                handleChange={handleChange}
                height={45}
                fontSize={14}
                mt={0}
              />
              <Text
                style={{ color: "#fff", fontWeight: "bold" }}
                variant="titleMedium"
              >
                Prenom
              </Text>
              <CustomInput
                name="last_name"
                value={data.last_name}
                type="text"
                label={"Prenom..."}
                handleChange={handleChange}
                height={45}
                fontSize={14}
                mt={0}
              />
              <Text
                style={{ color: "#fff", fontWeight: "bold" }}
                variant="titleMedium"
              >
                Email{" "}
                <Text style={{ color: primary, fontSize: 13 }}>
                  (non modifiable)
                </Text>
              </Text>
              <CustomInput
                name="email"
                value={data.email}
                type="text"
                editable={false}
                label={"Prenom..."}
                handleChange={handleChange}
                height={45}
                fontSize={14}
                mt={0}
              />
              <Text
                style={{ color: "#fff", fontWeight: "bold" }}
                variant="titleMedium"
              >
                Nouveau mot de passe{" "}
                <Text style={{ color: primary, fontSize: 13 }}>
                  (non obligatoire)
                </Text>
              </Text>
              <CustomInput
                name="password"
                type="text"
                label={"Mot de passe"}
                handleChange={handleChange}
                height={45}
                fontSize={14}
                mt={0}
              />
              <Text
                style={{ color: "#fff", fontWeight: "bold" }}
                variant="titleMedium"
              >
                Confirmation{" "}
                <Text style={{ color: primary, fontSize: 13 }}>
                  (non obligatoire)
                </Text>
              </Text>
              <CustomInput
                name="confirm_password"
                type="text"
                label={"Confirmation"}
                handleChange={handleChange}
                height={45}
                fontSize={14}
                mt={0}
              />
              <CustomButton
                mt={15}
                rounded={false}
                text={sendloading ? "Chargement..." : "Valider"}
                disabled={sendloading}
                onPress={handleSubmit}
                height={45}
              />
            </>
          )}
          {errorMessage && <ErrorView errorMessage={errorMessage} />}
        </View>
      </View>
      <Button
        onPress={() => {
          deleteToken();
          router.dismissAll();
          router.replace("/");
        }}
        uppercase={false}
        mode="outlined"
        style={{
          width: "100%",
          marginTop: 20,
          borderRadius: 5,
          borderColor: "red",
        }}
      >
        <Text style={{ color: "red" }}>Deconnexion</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#000",
    borderRadius: 10,
    color: "white",
    padding: 10,
    marginTop: 15,
  },
  textLabel: {
    color: "white",
    fontWeight: "bold",
  },
  flexView: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  divide: {
    width: "50%",
    paddingRight: 2,
  },
});

export default MonCompte;
