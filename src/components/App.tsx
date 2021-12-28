import { createStyles, Group, Modal, Text, Title } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { PlusIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { CurrentTime } from './CurrentTime';
import { Dashboard } from './Dashboard';
import { NewLocationForm } from './NewLocationForm';

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
    display: "flex",
    gap: 20,
    height: 40
  },
  tabSection: {
    display: 'flex'
  },
  tab: {
    backgroundColor: theme.fn.rgba("#333333", 0.55),
    userSelect: "none",
    padding: "5px 10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ":hover": {
      cursor: "pointer",
      filter: "brightness(1.4)",
    },
    ":first-of-type": {
      borderTopLeftRadius: 20
    },
    ":last-of-type": {
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

  const [locations, setLocations] = useState(["Helsinki", "Stockholm", "Oslo", "London", "Berlin", "Paris", "Rome"])
  const [weatherLocation, setWeatherLocation] = useState(locations[0]);
  const [createNewLocationModalOpen, setCreateNewLocationModalOpen] = useState(false)
  useDocumentTitle("Astroweather: " + weatherLocation);

  const onCreateLocation = (name: string, longitudeLatitude: [number, number]) => {
    if (!locations.includes(name)) {
      setLocations([...locations, name])
      setCreateNewLocationModalOpen(false);
      setWeatherLocation(name);
    }
  }

  const { classes } = useStyles();
  return (
    <div className={classes.container}>
      <Modal
        opened={createNewLocationModalOpen}
        onClose={() => setCreateNewLocationModalOpen(false)}
        title={<Title order={2}>New location</Title>}
        size={800}
        overflow="inside">
        <NewLocationForm locations={locations} onSubmit={onCreateLocation} />
      </Modal>
      <div className={classes.tabContainer}>
        <div className={classes.tabSection}>
          {locations.map(loc => {
            const classNames = classes.tab + (loc === weatherLocation ? " " + classes.selectedTab : "")
            return <div key={loc} className={classNames} onClick={() => setWeatherLocation(loc)}><Text>{loc}</Text></div>
          })}
          <div className={classes.tab} onClick={() => setCreateNewLocationModalOpen(true)}>
            <PlusIcon color="white" />
          </div>
        </div>
      </div>
      <div className={classes.innerContainer}>
        <Group position="apart" mb={20} noWrap>
          <Title order={1} style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }} title={weatherLocation}>Astroweather: {weatherLocation}</Title>
          <CurrentTime />
        </Group>
        <Dashboard location={weatherLocation} />
      </div>
    </div>
  );
}

export default App;
