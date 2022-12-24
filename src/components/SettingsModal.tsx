import { ColorScheme, HueSlider, SegmentedControl, Title, useMantineColorScheme } from "@mantine/core";
import { useContext } from "react";
import { SettingsContext } from "../contexts/SettingsContext";


export const SettingsModal = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const context = useContext(SettingsContext);
  if (!context) return <div>No settings context found</div>;

  return <div>
    <Title mb={5} order={3}>Color scheme</Title>
    <SegmentedControl
      data={[
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" }
      ]}
      value={colorScheme}
      onChange={newScheme => toggleColorScheme(newScheme as ColorScheme)}
    />

    <Title mt={20} mb={5} order={3}>Background color</Title>
    <HueSlider
      sx={{ maxWidth: 500 }}
      value={context.backgroundHue}
      onChangeEnd={value => context.setBackgroundHue(value)}
      onChange={value => context.setBackgroundHue(value)}
    />
  </div>;
};