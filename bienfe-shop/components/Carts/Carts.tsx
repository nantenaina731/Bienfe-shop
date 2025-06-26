import Layout from "@/common/Layout";
import React, { useCallback, useEffect,useState } from "react";
import { StyleSheet, View,TouchableOpacity } from "react-native";
import AddCard from "./AddCard/AddCard";
import AppHeader from "@/common/Layout/Header";
import { Snackbar, Text ,useTheme} from "react-native-paper";
import useHttps from "@/services/useHttps";
import Loading from "@/common/Loading";
import ErrorView from "@/common/ErrorView/ErrorView";
import Nodata from "@/common/Nodata/Nodata";
import { formatMoney } from "@/services/services";
import Filters from "./Filters/Filters";
import CartsItem from "./CartsItem/CartsItem";
import useToken from "@/services/useToken";
import Menus from "./Menus/Menus";
import { productPage } from "@/types/types";
import Gestion from "./Gestion/Gestion";

import ShowModify from "./modify/ShowModify";
import { useFocusEffect } from "expo-router";

interface props {
  setSuccess: (value: boolean) => void;
  shopId?: number;
}

const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mais",
  "Juin",
  "Juillet",
  "Aout",
  "Septembre",
  "Octobre",
  "Novembre",
  "Decembre",
];

const years = [
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
  "2029",
  "2030",
  "2031",
  "2032",
];


const Carts = ({ setSuccess ,shopId}: props) => {
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [data, setData] = React.useState([] as any);
  const [totalAmount, setTotalAmount] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(false);
  const [showModify, setShowModify] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  const { https } = useHttps();
  let actualDate = new Date();
  const [selectedDate, setSelectedDate] = React.useState<
    number | string | null
  >("Tout");
  const [selectedMonth, setSelectedMonth] = React.useState<string | null>(
    months[actualDate.getMonth()]
  );
  const [selectedYear, setSelectedYear] = React.useState<string | null>(
    String(actualDate.getFullYear())
  );
  const [activePage, setActivePage] =
    React.useState<productPage>("Vente de produit");
  const { token } = useToken();
  const isAdmin = token.type == "admin";

  const toggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  //recue des donner
  const getData = async () => {
    try {
      setErrorMessage(null);
      setLoading(true);
      let response = await https.post(`/vente/filter`, {
        day: selectedDate,
        month: months.indexOf(String(selectedMonth)),
        year: selectedYear,
        shopId,
      });
      if (response) {
        const res = response.data;
        let total = 0;
        res.map((daily: any) => (total += daily.totalAmount));
        setTotalAmount(total);
        setData(res);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Erreur de récupération des données");
    } finally {
      setLoading(false);
    }
  };
 

  useEffect(() => {
    getData();// appel de la fonctions  getData
  }, [selectedMonth, selectedDate, selectedYear,shopId]);

  const show = (id: any) => {
    if(isAdmin) {
      setShowModify(true);
      setSelectedProduct(id);
    }
  };

 

  return (
    <>
      <Layout fullBody={true} barDark={true} isScroll={true}>
        <View
          style={{
            padding: 10,
            marginTop: 15,
          }}
        >
          {isAdmin && (
            <Menus activePage={activePage} setActivePage={setActivePage} />
          )}
          {activePage == "Vente de produit" ? (
            <>
              <AddCard
                setDailyData={setData}
                toggleSnackBar={toggleSnackBar}
                getDailySpent={getData}
              />

              <View style={{ marginTop: 5, paddingLeft: 25 }}>
                <Text style={{ fontWeight: "bold" }} variant="titleLarge">
                  Vente enregistrés
                </Text>
              </View>

              <Filters
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
              />

              <View style={{ paddingLeft: 5, margin: 5 }}>
                <Text variant="titleMedium">
                  Vente total: {formatMoney(totalAmount) + " MGA"}
                </Text>
              </View>

              {errorMessage && <ErrorView errorMessage={errorMessage} />}

              <View style={{ marginTop: 10, marginBottom: 100 }}>
                
                {!loading && data.length == 0 && (
                  <Nodata color="#000" text="Pas de données" />
                )}
               
                {!loading &&
                  data &&
                  
                  data.map((item: any) => (
                    <TouchableOpacity key={item.id} onPress={() => show(item)} >
                      <CartsItem type={item} />
                    </TouchableOpacity>
                  ))
                  }
                {loading && <Loading />}
              
              </View>
            </>
          ) : (
            <Gestion setSuccess={setVisible} />
          )}
        </View>
      </Layout>
      <ShowModify
        selected={selectedProduct}
        visible={showModify}
        setVisible={setShowModify}
        setSuccess={setSuccess}
        getData={getData}
      />
        
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
        L'information a bien été enregistré
      </Snackbar>
    </>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    flexView: {
      display: "flex",
      flexDirection: "row",
    },
  });

export default Carts;
