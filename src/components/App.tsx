import { createStyles, Group, Text, Title } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { useState } from 'react';
import { CurrentTime } from './CurrentTime';
import { Dashboard } from './Dashboard';

const useStyles = createStyles(theme => ({
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "linear-gradient(45deg, #2c5074 0%, rgba(30,54,78,1) 100%)",
    padding: "50px 100px",
    flexDirection: "column"
  },
  innerContainer: {
    backgroundColor: theme.fn.rgba("#000000", 0.55),
    borderRadius: "0px 20px 20px 20px",
    padding: 30,
    display: "flex",
    flexGrow: 1,
    flexDirection: "column"
  },
  tabContainer: {
    display: "flex"
  },
  tab: {
    backgroundColor: theme.fn.rgba("#333333", 0.55),
    userSelect: "none",
    padding: "5px 10px",
    ":hover": {
      cursor: "pointer",
      filter: "brightness(1.4)",
    },
    ":first-child": {
      borderTopLeftRadius: 20
    },
    ":last-child": {
      borderTopRightRadius: 20
    }
  },
  selectedTab: {
    filter: "brightness(1.4)",
    backgroundColor: theme.fn.rgba("#000000", 0.55),
  }
}))

const App = () => {
  // TODO: Sunrise/sunset, moonrise/moonset
  // TODO: Auroras, https://services.swpc.noaa.gov/json/ovation_aurora_latest.json

  // TODO: Allow the user to use their own cities here
  const locations = ["Helsinki", "Stockholm", "Oslo", "London", "Berlin", "Paris", "Rome"]
  const [weatherLocation, setWeatherLocation] = useState(locations[0]);
  useDocumentTitle("Astroweather: " + weatherLocation);

  const { classes } = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.tabContainer}>
        {locations.map(loc => {
          const classNames = classes.tab + (loc === weatherLocation ? " " + classes.selectedTab : "")
          return <div className={classNames} onClick={() => setWeatherLocation(loc)}><Text>{loc}</Text></div>
        })}
      </div>
      <div className={classes.innerContainer}>
        <Group position="apart" mb={20}>
          <Title order={1}>Astroweather: {weatherLocation}</Title>
          <CurrentTime />
        </Group>
        <Dashboard location={weatherLocation} />
      </div>
    </div>
  );
}

export default App;
