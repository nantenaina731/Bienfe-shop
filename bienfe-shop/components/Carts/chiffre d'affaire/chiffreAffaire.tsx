import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import SelectInput from "@/common/SelectInput/SelectInput";
import Loading from "@/common/Loading";
import Nodata from "@/common/Nodata/Nodata";
import { formatMoney } from "@/services/services";
import useHttps from "@/services/useHttps";
import { useTheme } from "react-native-paper";

const months = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre",
];

const years = [
  "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032",
];

interface Props {
  shopId: number;
}

const ChiffreAffaireSansSVG = ({ shopId }: Props) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { https } = useHttps();

  const [selectedMonth, setSelectedMonth] = useState(months[new Date().getMonth()]);
  const [selectedYear, setSelectedYear] = useState(String(new Date().getFullYear()));
  const [dailyData, setDailyData] = useState<any[]>([]);
  const [monthlyTotals, setMonthlyTotals] = useState<{ [key: string]: number }>({});
  const [dailyTotal, setDailyTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchDailyData = async () => {
    try {
      const response = await https.post("/vente/filter", {
        day: "Tout",
        month: months.indexOf(selectedMonth),
        year: parseInt(selectedYear),
        shopId,
      });

      const ventes = Array.isArray(response.data?.data) ? response.data.data : [];

      const grouped = ventes.reduce((acc: any, item: any) => {
        const day = new Date(item.createdAt).getDate();
        acc[day] = (acc[day] || 0) + item.totalAmount;
        return acc;
      }, {});

      const transformed = Object.keys(grouped).map((key) => ({
        label: key,
        value: grouped[key],
      }));

      const total = transformed.reduce((sum, item) => sum + item.value, 0);
      setDailyData(transformed);
      setDailyTotal(total);
    } catch (e) {
      console.log("Erreur daily:", e);
      setDailyData([]);
      setDailyTotal(0);
    }
  };

  const fetchMonthlyTotals = async () => {
    const results: { [key: string]: number } = {};
    try {
      await Promise.all(
        months.map(async (monthName, i) => {
          try {
            const res = await https.post("/vente/filter", {
              day: "Tout",
              month: i,
              year: parseInt(selectedYear),
              shopId,
            });

            const ventes = Array.isArray(res.data?.data) ? res.data.data : [];
            const total = ventes.reduce((sum: number, item: any) => sum + item.totalAmount, 0);
            results[monthName] = total;
          } catch {
            results[monthName] = 0;
          }
        })
      );
    } catch (e) {
      console.log("Erreur mois:", e);
    }
    setMonthlyTotals(results);
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchDailyData(), fetchMonthlyTotals()]).finally(() => setLoading(false));
  }, [selectedMonth, selectedYear]);

  const maxValue = Math.max(...dailyData.map((d) => d.value), 1);

  const yearlyTotal = Object.values(monthlyTotals).reduce((sum, val) => sum + val, 0);

  return (
    <ScrollView contentContainerStyle={{ padding: 10 }}>
      <Text style={styles.title}>Chiffre d'affaires</Text>

      <View style={styles.selectRow}>
        <View style={{ width: "50%" }}>
          <SelectInput
            defaultValue={selectedMonth}
            setter={setSelectedMonth}
            title="Mois"
            options={months}
          />
        </View>
        <View style={{ width: "50%" }}>
          <SelectInput
            defaultValue={selectedYear}
            setter={setSelectedYear}
            title="Année"
            options={years}
          />
        </View>
      </View>

      <Text style={{ marginBottom: 10 }}>
        Total pour {selectedMonth} : {formatMoney(dailyTotal)} MGA
      </Text>
      <Text style={[styles.totalYear]}>
        Total annuel : {formatMoney(yearlyTotal)} MGA
      </Text>
      {loading && <Loading />}
      {!loading && dailyData.length === 0 && (
        <Nodata color="#000" text="Pas de ventes ce mois" />
      )}

      {!loading && dailyData.length > 0 && (
        <ScrollView horizontal style={{ marginBottom: 20 }}>
          <View style={styles.chartContainer}>
            {dailyData.map((item) => {
              const barHeight = (item.value / maxValue) * 150;
              return (
                <View key={item.label} style={styles.barItem}>
                  <View style={[styles.bar, { height: barHeight, backgroundColor: theme.colors.primary }]} />
                  <Text style={styles.barLabel}>{item.label}</Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}
    <View style={styles.resume}>
      <Text style={styles.subtitle}>Résumé de l'année {selectedYear}</Text>
      {Object.entries(monthlyTotals).map(([month, value]) => (
        <Text key={month}>
          • {month} : {formatMoney(value)} MGA
        </Text>
        
      ))}
     </View>
    </ScrollView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    title: {
      fontWeight: "bold",
      fontSize: 20,
      marginBottom: 10,
    },
    subtitle: {
      fontWeight: "bold",
      marginTop: 20,
      marginBottom: 10,
    },
    selectRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    chartContainer: {
      flexDirection: "row",
      alignItems: "flex-end",
      height: 180,
      paddingBottom: 10,
    },
    barItem: {
      alignItems: "center",
      marginHorizontal: 5,
    },
    bar: {
      width: 20,
      borderRadius: 4,
    },
    barLabel: {
      marginTop: 4,
      fontSize: 12,
    },
    totalYear: {
      fontWeight: "bold",
      marginTop: 15,
      padding:4,
    },
    resume:{
      top:2
    }
  });

export default ChiffreAffaireSansSVG;
