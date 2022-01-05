import { Card, Group, Text, Title } from "@mantine/core";
import { ReactNode } from "react";
import { FunctionComponent } from "react";
import { LatitudeLongitude } from "../../data/LatitudeLongitude";
import { useAstroStatsValue } from "../../hooks/useAstroStats";

interface WeatherCardProps<T> {
  title: string,
  url: string,
  location: LatitudeLongitude,
  children: (value: T) => ReactNode | ReactNode[]
}

export const WeatherCard: FunctionComponent<Pick<WeatherCardProps<undefined>, "title">> = (props) => {
  return (
    <Card>
      <Group direction="column">
        <Title order={2}>{props.title}</Title>
        {props.children}
      </Group>
    </Card>
  );
};

export function SmartWeatherCard<T>(props: WeatherCardProps<T>) {
  const { value, success, error } = useAstroStatsValue<T>(props.url, props.location);

  if (error || !value || !success) {
    return <WeatherCard title={props.title}>
      <Text color="red">{error}</Text>
    </WeatherCard>;
  }

  return <WeatherCard title={props.title}>
    {props.children(value)}
  </WeatherCard>;
}