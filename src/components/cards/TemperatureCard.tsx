import { Text } from "@mantine/core";
import { CardProps } from "./CardProps";
import { SmartWeatherCard } from "./WeatherCard";

interface TemperatureResponse {
  currentTemperature: number;
  feelsLike: number;
}

export const TemperatureCard = ({ location }: CardProps) => {
  return (
    <SmartWeatherCard<TemperatureResponse> title="Temperature" url="/temperature" location={location}>
      {({ currentTemperature, feelsLike }) => <div>
        <Text color="blue">{currentTemperature.toFixed(1)}°C</Text>
        <Text color="blue">Feels like {feelsLike.toFixed(1)}°C</Text>
      </div>}
    </SmartWeatherCard>
  );
};
