import SelectInput from "@/common/SelectInput/SelectInput";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

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

const dates = ["Tout", ...Array.from({ length: 31 }, (_, i) => i + 1)];

const Filters = ({
  selectedDate,
  setSelectedDate,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear
}: any) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.flexView}>
        <View style={{ width: "33.333%" }}>
          <SelectInput
            defaultValue={selectedDate}
            setter={setSelectedDate}
            title="Choisir une date"
            options={dates}
          />
        </View>
        <View style={{ width: "33.333%" }}>
          <SelectInput
            defaultValue={selectedMonth}
            setter={setSelectedMonth}
            title="Choisir un mois"
            options={months}
          />
        </View>
        <View style={{ width: "33.333%" }}>
          <SelectInput
            defaultValue={selectedYear}
            setter={setSelectedYear}
            title="Choisir une année"
            options={years}
          />
        </View>
      </View>
      {/*
        <View style={{ marginTop: 5, marginHorizontal: 5 }}>
            <CustomButton
            disabled={loading}
            rounded={false}
            width={"100%"}
            height={40}
            text={loading ? "Chargement..." : "Filtrer"}
            onPress={() => {}}
            />
        </View> 
      */}
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    flexView: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    container: {
      padding: 5,
      marginTop: 5,
      marginBottom: 0,
    },
  });

export default Filters;
