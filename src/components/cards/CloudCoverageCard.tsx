import { Text } from "@mantine/core";
import { greenRed } from "../../utils/gradients";
import { selectLower } from "../../utils/rangeSelect";
import { CardProps } from "./CardProps";
import { SmartWeatherCard } from "./WeatherCard";

interface CloudinessResponse {
  cloudiness: number;
}

export const CloudCoverageCard = ({ location }: CardProps) => {
  return <SmartWeatherCard<CloudinessResponse> title="Cloudiness" location={location} url="/cloudiness">
    {({ cloudiness }) => {
      const cloudinessDescription = selectLower({
        0: "None",
        10: "Very little",
        25: "Little",
        50: "Medium",
        75: "Dense",
        90: "Very dense"
      }, cloudiness);

      return (<Text sx={{ color: greenRed(cloudiness / 100) }}>
        {`${cloudiness}% (${cloudinessDescription})`}
      </Text>);
    }}
  </SmartWeatherCard>;
};
