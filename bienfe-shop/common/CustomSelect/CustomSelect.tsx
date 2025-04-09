import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { PaperSelect } from "react-native-paper-select";

type dataForm = { _id: string; value: string }[];

interface props {
  data: dataForm;
  setSelectedValue: Dispatch<SetStateAction<any>>;
  defaultValue: {
        _id: string;
        value: string;
      }
  | undefined;
  label?: string;
}

const CustomSelect = ({
  data,
  setSelectedValue,
  defaultValue,
  label,
}: props) => {
  const [gender, setGender] = useState({
    value: defaultValue ? defaultValue.value : "",
    list: data,
    selectedList: defaultValue ? [defaultValue] : [],
    error: "",
  });

  useEffect(() => {
    setGender({
      value: defaultValue ? defaultValue.value : "",
      list: data,
      selectedList: defaultValue ? [defaultValue] : [],
      error: "",
    });
  }, [data]);

  return (
    <View style={styles.selectContainer}>
      <PaperSelect
        label={label ?? "Type de voiture"}
        value={label ? gender.value.split('(')[0] : gender.value}
        onSelection={(value: any) => {
          setGender({
            ...gender,
            value: value.text,
            selectedList: value.selectedList,
            error: "",
          });
          setSelectedValue(value.selectedList[0]);
        }}
        arrayList={[...gender.list]}
        selectedArrayList={gender.selectedList}
        errorText={gender.error}
        multiEnable={false}
        dialogTitleStyle={{ color: "black" }}
        dialogStyle={styles.dialogStyle}
        hideSearchBox={true}
        textInputStyle={styles.textInputStyle}
        theme={{
          colors: {
            placeholder: "black",
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  selectContainer: {
    backgroundColor: "#fff",
    height: 45,
    borderRadius: 7,
    overflow: "hidden",
  },
  textInputStyle: {
    height: 45,
    backgroundColor: "#fff",
  },
  dialogStyle: {
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
});

export default CustomSelect;
