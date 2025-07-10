import Layout from "@/common/Layout";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import AddCard from "./AddCard/AddCard";
import { Snackbar, Text, useTheme } from "react-native-paper";
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
import ChiffreAffaire from "./chiffre d'affaire/chiffreAffaire";

interface props {
  setSuccess: (value: boolean) => void;
  shopId?: number;
}

const months = [
  "Janvier", "Février", "Mars", "Avril", "Mais", "Juin",
  "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre",
];

const years = [
  "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032",
];

const Carts = ({ setSuccess, shopId }: props) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [data, setData] = useState([] as any[]);
  const [loading, setLoading] = useState(false);
  const [showModify, setShowModify] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const { https } = useHttps();
  const actualDate = new Date();
  const [selectedDate, setSelectedDate] = useState<number | string | null>("Tout");
  const [selectedMonth, setSelectedMonth] = useState<string | null>(
    months[actualDate.getMonth()]
  );
  const [selectedYear, setSelectedYear] = useState<string | null>(
    String(actualDate.getFullYear())
  );
  const [activePage, setActivePage] = useState<productPage>("Vente de produit");
  const { token } = useToken();
  const isAdmin = token.type === "admin";

  const toggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const getData = async () => {
    try {
      setErrorMessage(null);
      setLoading(true);
      const response = await https.post(`/vente/filter`, {
        day: selectedDate,
        month: months.indexOf(String(selectedMonth)),
        year: selectedYear,
        shopId: shopId,
      });
      // EXTRACTION CORRECTE DU TABLEAU DE VENTES
      const ventes = response.data?.data || [];
      setData(ventes);
    } catch (error) {
      console.log(error);
      setErrorMessage("Erreur de récupération des données");
      setData([]); // vide pour éviter crash
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedMonth, selectedDate, selectedYear, shopId]);

  // On filtre par boutique pour plus de sécurité
  const filteredData = data.filter((item: any) => item.shopId === shopId);

  // Regroupement par produit
  const groupedData = filteredData.reduce((acc: any[], item: any) => {
    const existing = acc.find(i => i.product_id === item.product_id);
    if (existing) {
      existing.quantity += item.quantity;
      existing.totalAmount += item.totalAmount;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  const total = groupedData.reduce((sum, item) => sum + item.totalAmount, 0);

  const show = (id: any) => {
    if (isAdmin) {
      setShowModify(true);
      setSelectedProduct(id);
    }
  };

  return (
    <>
      <Layout fullBody={true} barDark={true} isScroll={true}>
        <View style={{ padding: 16, marginTop: 16 }}>
          {isAdmin && (
            <Menus activePage={activePage} setActivePage={setActivePage} />
          )}

          {activePage === "Vente de produit" ? (
            <>
              <AddCard
                setDailyData={setData}
                toggleSnackBar={toggleSnackBar}
                getDailySpent={getData}
                shopId={shopId}
              />

              <View style={{ marginTop: 5, paddingLeft: 25 }}>
                <Text style={{ fontWeight: "bold" }} variant="titleLarge">
                  Vente enregistrées
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
                  Vente total: {formatMoney(total)} MGA
                </Text>
              </View>

              {errorMessage && <ErrorView errorMessage={errorMessage} />}

              <View style={{ marginTop: 10, marginBottom: 100 }}>
                {!loading && groupedData.length === 0 && (
                  <Nodata color="#000" text="Pas de données" />
                )}

                {!loading &&
                  groupedData.length > 0 &&
                  groupedData.map((item: any) => (
                    <TouchableOpacity
                      key={`${item.product_id}-${item.createdAt}`}
                      onPress={() => show(item)}
                    >
                      <CartsItem type={item} />
                    </TouchableOpacity>
                  ))}

                {loading && <Loading />}
              </View>
            </>
          ) : activePage === "Gestion de produit" ? (
            <Gestion setSuccess={setVisible} shopId={shopId!} />
          ) : (
            <ChiffreAffaire shopId={shopId!} />
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
        style={{ backgroundColor: "#52977e", marginBottom: 80 }}
        elevation={0}
        action={{
          label: "Valider",
          onPress: () => {
            onDismissSnackBar();
          },
        }}
      >
        L'information a bien été enregistrée
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
