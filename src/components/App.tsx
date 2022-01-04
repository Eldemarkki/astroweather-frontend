import { createStyles, Group, Modal, Text, Title } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { HamburgerMenuIcon, PlusIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import Particles from 'react-tsparticles';
import { AstroLocation } from '../data/AstroLocation';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useMantineModal } from '../hooks/useMantineModal';
import { CurrentTime } from './CurrentTime';
import { Dashboard } from './Dashboard';
import { EditLocationsModal } from './EditLocationsModal';
import { NewLocationForm } from './NewLocationForm';

const useStyles = createStyles(theme => ({
  container: {
    display: "flex",
    minHeight: "100vh",
    background: `linear-gradient(45deg, hsl(${theme.other.backgroundHue}, 47%, 26%) 0%, HSL(${theme.other.backgroundHue}, 50%, 16%) 100%)`,
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
    marginBottom: 5,
    backdropFilter: "blur(3px)",
  },
  tabContainer: {
    display: "flex",
    gap: 20,
    height: 40,
    zIndex: 10,
    backdropFilter: "blur(3px)",
    width: "fit-content",
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
  
  // TODO: Make the location list reorderable also from the top-panel
  const [locations, setLocations] = useLocalStorage<AstroLocation[]>("locations", [{
    name: "Helsinki",
    location: {
      latitude: 60.161950104862655,
      longitude: 24.951679653697312
    }
  }]);

  const [activeAstroLocationIndex, setActiveAstroLocationIndex] = useState<number>(0);
  const activeAstroLocation = locations[activeAstroLocationIndex];

  useDocumentTitle("Astroweather: " + activeAstroLocation.name);

  const [newLocationModalProps, openNewLocationModal, closeNewLocationModal] = useMantineModal({
    title: <Title order={2}>New location</Title>,
    size: 800,
    overflow: "inside"
  })
  
  const [editLocationsModalProps, openEditLocationsModal] = useMantineModal({
    title: <Title order={2}>Edit locations</Title>,
    size: 800,
    overflow: "inside"
  })
  
  const onCreateLocation = (newLocation: AstroLocation) => {
    if (!locations.some(l => l.name === newLocation.name)) {
      setLocations([...locations, newLocation])
      closeNewLocationModal();
      setActiveAstroLocationIndex(locations.length - 1);
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
      <Modal {...newLocationModalProps}>
        <NewLocationForm locationNames={locations.map(l => l.name)} onSubmit={onCreateLocation} />
      </Modal>
      <Modal {...editLocationsModalProps}>
        <EditLocationsModal locations={locations} setLocations={setLocations} activeLocationIndex={activeAstroLocationIndex} setActiveLocationIndex={setActiveAstroLocationIndex} />
      </Modal>
      <div className={classes.tabContainer}>
        <div className={classes.tabSection}>
          {locations.map((loc, index) => {
            const classNames = classes.tab + (loc.name === activeAstroLocation.name ? " " + classes.selectedTab : "")
            return <div key={loc.name} className={classNames} onClick={() => setActiveAstroLocationIndex(index)}><Text>{loc.name}</Text></div>
          })}
          <div className={classes.tab} onClick={openNewLocationModal}>
            <PlusIcon color="white" />
          </div>
          <div className={classes.tab} onClick={openEditLocationsModal}>
            <HamburgerMenuIcon color="white" />
          </div>
        </div>
      </div>
      <div className={classes.innerContainer}>
        <Group position="apart" mb={20} noWrap>
          <Title order={1} style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }} title={activeAstroLocation.name}>Astroweather: {activeAstroLocation.name}</Title>
          <CurrentTime />
        </Group>
        <Dashboard location={activeAstroLocation} />
      </div>
    </div>
  );
}

export default App;
