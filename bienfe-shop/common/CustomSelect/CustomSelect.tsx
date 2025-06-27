import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Menu, TextInput, Button, useTheme } from "react-native-paper";

type dataForm = { _id: string; value: string }[];

interface props {
  data: dataForm;
  setSelectedValue: Dispatch<SetStateAction<any>>;
  defaultValue:
    | {
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
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(defaultValue ?? null);

  useEffect(() => {
    setSelected(defaultValue ?? null);
  }, [data]);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const onSelect = (item: any) => {
    setSelected(item);
    setSelectedValue(item);
    closeMenu();
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TextInput
            label={label ?? "Sélectionner"}
            value={selected ? selected.value : ""}
            style={styles.input}
            onFocus={openMenu}
            mode="flat"
            right={<TextInput.Icon icon="menu-down"/>}
            theme={{
              colors: {
                primary: "#64B244", 
                text: "#000",
              },
            }}
          />
        }
      >
        {data.map((item) => (
          <Menu.Item
            key={item._id}
            onPress={() => onSelect(item)}
            title={item.value}
          />
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    zIndex: 100, 
  },
  input: {
    backgroundColor: "#fff",
    height: 45,
    borderRadius:5,
  },
});

export default CustomSelect;
