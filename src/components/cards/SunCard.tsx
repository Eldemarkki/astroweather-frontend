import { Center, Text, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { endOfToday, format, startOfToday } from "date-fns";
import { remap } from "../../utils/numberUtils";
import { FunctionDiagram } from "../FunctionDiagram";
import { CardProps } from "./CardProps";
import { WeatherCard } from "./WeatherCard";
import SunCalc from "suncalc";

const isValidDate = (date: unknown) => date instanceof Date && !isNaN(date.valueOf());

export const SunCard = ({ location }: CardProps) => {
  const suntimes = SunCalc.getTimes(new Date(), location.latitude, location.longitude);
  const progress = remap(startOfToday().getTime(), endOfToday().getTime(), 0, 1, new Date().getTime());

  const calculateY = (x: number) => Math.sin(2 * Math.PI * x - Math.PI / 2) / 3.5 + 0.5;

  const sunriseY = calculateY(remap(startOfToday().getTime(), endOfToday().getTime(), 0, 1, suntimes.sunrise.getTime()));
  const sunsetY = calculateY(remap(startOfToday().getTime(), endOfToday().getTime(), 0, 1, suntimes.sunset.getTime()));

  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return <WeatherCard title="Sun">
    {(isValidDate(suntimes.sunrise) && isValidDate(suntimes.sunset)) ? <div>
      <Text color="yellow">Sunrise at {format(suntimes.sunrise, "H:mm")}</Text>
      <Text color="yellow">Sunset at {format(suntimes.sunset, "H:mm")}</Text>
      <Center sx={{ width: "100%" }}>
        <div style={{ width: "180px", aspectRatio: "1" }}>
          <FunctionDiagram
            aria-label="Diagram of sun position in the sky currently"
            progress={progress}
            showHorizontalLine
            horizontalLineY={(sunsetY + sunriseY) / 2}
            calculateY={calculateY}
            styles={{
              circleColor: colorScheme === "light" ? theme.colors.gray[7] : theme.colors.gray[0],
              circleRadius: 8,
              graphColor: colorScheme === "light" ? theme.colors.gray[7] : theme.colors.gray[0],
              graphStrokeWidth: 2,
              horizontalLineColor: colorScheme === "light" ? theme.colors.gray[7] : theme.colors.gray[0],
              horizontalLineThickness: 2
            }}
          />
        </div>
      </Center>
    </div> : <Text>Couldn&apos;t calculate sunrise and sunset times</Text>}
  </WeatherCard>;
};
