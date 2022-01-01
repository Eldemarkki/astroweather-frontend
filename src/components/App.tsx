import { createStyles, Group, Modal, Text, Title } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { HamburgerMenuIcon, PlusIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import Particles from 'react-tsparticles';
import { AstroLocation } from '../data/AstroLocation';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { CurrentTime } from './CurrentTime';
import { Dashboard } from './Dashboard';
import { EditLocationsModal } from './EditLocationsModal';
import { NewLocationForm } from './NewLocationForm';

const useStyles = createStyles(theme => ({
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "linear-gradient(45deg, #232a60 0%, rgb(20, 24, 60) 100%)",
    padding: "50px 100px",
    flexDirection: "column"
  },
  innerContainer: {
    backgroundColor: theme.fn.rgba("#000000", 0.55),
    borderRadius: "0px 20px 20px 20px",
    padding: 30,
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    zIndex: 10,
    marginBottom: 5
  },
  tabContainer: {
    display: "flex",
    gap: 20,
    height: 40,
    zIndex: 10,
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
    backgroundColor: theme.fn.rgba("#000000", 0.55),
  }
}))

const App = () => {
  // TODO: Auroras, https://services.swpc.noaa.gov/json/ovation_aurora_latest.json

  const [locations, setLocations] = useLocalStorage<AstroLocation[]>("locations", [{
    name: "Helsinki",
    location: {
      latitude: 60.161950104862655,
      longitude: 24.951679653697312
    }
  }]);

  const [astroLocation, setAstroLocation] = useState(locations[0]);
  useDocumentTitle("Astroweather: " + astroLocation.name);

  const [createNewLocationModalOpen, setCreateNewLocationModalOpen] = useState(false)
  const [editLocationsModalOpen, setEditLocationsModalOpen] = useState(false)

  const onCreateLocation = (newLocation: AstroLocation) => {
    if (!locations.some(l => l.name === newLocation.name)) {
      setLocations([...locations, newLocation])
      setCreateNewLocationModalOpen(false);
      setAstroLocation(newLocation);
    }
  }

  const { classes } = useStyles();
  return (
    <div className={classes.container}>
      <div style={{ zIndex: 5, opacity: 0.15 }} >
        <Particles id="tsparticles" options={{
          fpsLimit: 60,
          particles: {
            move: {
              enable: true,
              speed: 0.3,
            },
            number: {
              value: 30,
            },
            size: {
              value: {
                min: 3,
                max: 6
              }
            }
          }
        }} />
      </div>
      <Modal
        opened={createNewLocationModalOpen}
        onClose={() => setCreateNewLocationModalOpen(false)}
        title={<Title order={2}>New location</Title>}
        size={800}
        overflow="inside">
        <NewLocationForm locationNames={locations.map(l => l.name)} onSubmit={onCreateLocation} />
      </Modal>
      <Modal
        opened={editLocationsModalOpen}
        onClose={() => setEditLocationsModalOpen(false)}
        title={<Title order={2}>Edit locations</Title>}
        size={800}
        overflow="inside">
        <EditLocationsModal locations={locations} setLocations={setLocations} setActiveLocation={setAstroLocation}/>
      </Modal>
      <div className={classes.tabContainer}>
        <div className={classes.tabSection}>
          {locations.map(loc => {
            const classNames = classes.tab + (loc.name === astroLocation.name ? " " + classes.selectedTab : "")
            return <div key={loc.name} className={classNames} onClick={() => setAstroLocation(loc)}><Text>{loc.name}</Text></div>
          })}
          <div className={classes.tab} onClick={() => setCreateNewLocationModalOpen(true)}>
            <PlusIcon color="white" />
          </div>
          <div className={classes.tab} onClick={() => setEditLocationsModalOpen(true)}>
            <HamburgerMenuIcon color="white" />
          </div>
        </div>
      </div>
      <div className={classes.innerContainer}>
        <Group position="apart" mb={20} noWrap>
          <Title order={1} style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }} title={astroLocation.name}>Astroweather: {astroLocation.name}</Title>
          <CurrentTime />
        </Group>
        <Dashboard location={astroLocation} />
      </div>
    </div>
  );
}

export default App;
