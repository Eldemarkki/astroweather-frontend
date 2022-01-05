import { Anchor, Text } from "@mantine/core";
import { LatitudeLongitude } from "../../data/LatitudeLongitude";
import { SmartWeatherCard } from "./WeatherCard";

interface LightPollutionCardProps {
  location: LatitudeLongitude
}

interface LightPollutionResponse {
  totalBrightness: number;
  skyMagnitude: number
  bortleClass: number
}

export const LightPollutionCard = ({ location }: LightPollutionCardProps) => {
  // TODO: Show lightpollutionmap link if an error happened
  return <SmartWeatherCard<LightPollutionResponse> title="Light pollution" url="/lightpollution" location={location}>
    {({ skyMagnitude, bortleClass }) => (<div>
      <Text>Bortle class: {bortleClass}</Text>
      <Text>Magnitude (mag/arcsec²): {skyMagnitude.toFixed(2)}</Text>
      <Anchor target="_blank" href={`https://www.lightpollutionmap.info/#zoom=12&lat=${location.latitude}&lon=${location.longitude}&layers=B0FFFFFFFTFFFFFFFFFF`}>Open in lightpollutionmap.info</Anchor>
    </div>)}
  </SmartWeatherCard>;
};
