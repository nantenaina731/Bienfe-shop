import * as React from "react";
import { Checkbox } from "react-native-paper";

interface CustomCheckboxProps {
  checked: boolean;
  onPress: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked, onPress }) => {
  return (
    <Checkbox status={checked ? "checked" : "unchecked"} onPress={onPress} />
  );
};

export default CustomCheckbox;
