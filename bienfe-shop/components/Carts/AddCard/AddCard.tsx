import CustomButton from "@/common/CustomButton/CustomButton";
import CustomInput from "@/common/CustomInput/CustomInput";
import CustomSelect from "@/common/CustomSelect/CustomSelect";
import ErrorView from "@/common/ErrorView/ErrorView";
import Loading from "@/common/Loading";
import { capitalize, formatMoney } from "@/services/services";
import useHttps from "@/services/useHttps";
import useToken from "@/services/useToken";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

let initialValue = {
  quantity: null,
};

const AddCard = ({ setDailyData, toggleSnackBar, getDailySpent,shopId }: any) => {
  const theme = useTheme();
  const { primary } = theme.colors;
  const [data, setData] = useState(initialValue);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [products, setProducts] = useState<Array<any>>([]);
  const [selectedValue, setSelectedValue] = useState<{
    _id: string;
    value: string;
    price: number;
    quantity: number;
  }>();
  const [loading, setLoading] = useState(false);
  const [sendloading, setSendLoading] = useState(false);
  const { https } = useHttps();

  const handleChange = (name: string, value: string) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const getProducts = async () => {
    try {
      setLoading(true);
      let response = await https.get(`/products?shopId=${shopId}`);
      if (response) {
        const allProduct: [] = response.data;
        const dataSelect = allProduct.map(({ id, name, price, quantity }) => ({
          _id: String(id),
          value: capitalize(name) + ` (${quantity} x ${formatMoney(price)}ar)`,
          price: price,
          quantity: quantity,
        }));
        setProducts(dataSelect);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getProducts();
      setData(initialValue);
    }, [])
  );

  const handleValidate = async () => {
    if (selectedValue && data.quantity && data.quantity != "0") {
      setSendLoading(true);
      const promiseActualQty = await https.get(
        `/products/get-actual-qty/${selectedValue._id}`
      );
      if (promiseActualQty) {
        const actualQty = promiseActualQty.data.actualQty;
        if (actualQty == 0) {
          setSendLoading(false);
          setErrorMessage("Stock vide");
          return;
        }
        if (data.quantity > actualQty) {
          setSendLoading(false);
          setErrorMessage("La quantité est supérieur au stock");
          return;
        }
        try {
          setErrorMessage(null);
          const toSend = {
            product_id: selectedValue._id,
            oldQuantity: selectedValue.quantity,
            quantity: parseInt(data.quantity),
            amount: selectedValue.price,
            shopId:shopId
          };
          let response = await https.post("/vente", toSend);
          if (response) {
            // setDailyData((prev:any) => [response.data, ...prev] )
            toggleSnackBar();
            setData(initialValue);
            getProducts();
            getDailySpent();
          }
        } catch (error) {
          console.log(error);
          setErrorMessage("Une érreur s'est produite");
        } finally {
          setSendLoading(false);
        }
      } else {
        setSendLoading(false);
        setErrorMessage("Une érreur s'est produite");
      }
    } else {
      setSendLoading(false);
      setErrorMessage("Compléter tout les champs");
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textLabel} variant="titleLarge">
          Vente{" "}
          <Text style={{ color: "#64B244"  }} variant="titleLarge">
            de produit
          </Text>
        </Text>

        {loading && <Loading />}

        {!loading && (
          <>
            <View style={styles.flexView}>
              <View style={{ width: "50%", paddingRight: 3 }}>
                <View style={{ marginTop: 10 }}>
                  <CustomSelect
                    label={"Produit"}
                    defaultValue={selectedValue}
                    data={products}
                    setSelectedValue={setSelectedValue}
                  />
                </View>
              </View>
              <View style={{ width: "50%", paddingLeft: 2 }}>
                <CustomInput
                  name="quantity"
                  type="numeric"
                  value={data.quantity ?? ""}
                  label={"Quantité"}
                  handleChange={handleChange}
                  height={45}
                  fontSize={14}
                />
              </View>
            </View>
            {errorMessage && <ErrorView errorMessage={errorMessage} />}
            <View style={{ marginTop: 10 }}>
              <CustomButton
                disabled={sendloading}
                rounded={false}
                width={"100%"}
                height={40}
                text={sendloading ? "Chargement..." : "Enregistrer"}
                onPress={handleValidate}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#000",
    borderRadius: 17,
    color: "white",
    padding: 25,
    marginBottom: 10,
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
    marginTop: 10,
  },
});

export default AddCard;
