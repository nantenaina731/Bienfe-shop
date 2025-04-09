import React, { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Menu, Divider, Text } from "react-native-paper";


interface props {
  setter: Dispatch<SetStateAction<any>>;
  defaultValue: any;
  title: string;
  options: any;
  color?: string;
  borderRadius?: number;
}

const SelectInput = ({ defaultValue, setter, title, options, color = 'black', borderRadius = 5 }: props) => {
  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const showMenu = () => setVisible(true);
  const hideMenu = () => setVisible(false);

  const handleSelect = (value: any) => {
    setSelectedValue(value);
    setter(value);
    hideMenu();
  };

  const styles = StyleSheet.create({
    button: {
      borderRadius,
      height: 40,
    },
  });

  return (
    <View style={{ padding: 5 }}>
      <Menu
        visible={visible}
        onDismiss={hideMenu}
        anchor={
          <Button mode="outlined" style={styles.button} onPress={showMenu}>
            <Text style={{color: color}}>{selectedValue ?? defaultValue}</Text>
          </Button>
        }
      >
        {options &&
          options.map((option: any, idx: any) => (
            <Menu.Item
              key={idx}
              onPress={() => handleSelect(option)}
              title={option}
            />
          ))}
      </Menu>
    </View>
  );
};

export default SelectInput;
