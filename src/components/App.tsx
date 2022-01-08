import { Anchor, createStyles, Group, Modal, Text, Title, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { GearIcon, HamburgerMenuIcon, PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { AstroLocation } from "../data/AstroLocation";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useMantineModal } from "../hooks/useMantineModal";
import { CurrentTime } from "./CurrentTime";
import { Dashboard } from "./Dashboard";
import { EditLocationsModal } from "./EditLocationsModal";
import { NewLocationForm } from "./NewLocationForm";
import { SettingsModal } from "./SettingsModal";

const useStyles = createStyles(theme => ({
  container: {
    display: "flex",
    minHeight: "100vh",
    background: theme.colorScheme === "dark" ?
      `linear-gradient(45deg, hsl(${theme.other.backgroundHue}, 47%, 26%) 0%, HSL(${theme.other.backgroundHue}, 50%, 16%) 100%)` :
      `linear-gradient(45deg, hsl(${theme.other.backgroundHue}, 52%, 63%) 0%, HSL(${theme.other.backgroundHue}, 50%, 46%) 100%)`,
    padding: "50px 100px",
    flexDirection: "column"
  },
  innerContainer: {
    backgroundColor: theme.colorScheme === "dark" ? theme.fn.rgba("#000000", 0.55) : theme.fn.rgba("#FFFFFF", 0.25),
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
    zIndex: 15,
    backdropFilter: "blur(3px)",
    width: "fit-content",
  },
  tabSection: {
    display: "flex"
  },
  tab: {
    backgroundColor: theme.colorScheme === "dark" ? theme.fn.rgba("#333333", 0.55) : theme.fn.rgba("#FFFFFF", 0.1),
    userSelect: "none",
    padding: "5px 10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ":hover": {
      cursor: "pointer",
      ...(theme.colorScheme === "dark" ? {
        filter: "brightness(1.4)"
      } : {
        backgroundColor: theme.fn.rgba("#FFFFFF", 0.17)
      })
    },
    ":first-of-type": {
      borderTopLeftRadius: 20
    },
    ":last-of-type": {
      borderTopRightRadius: 20
    }
  },
  selectedTab: {
    backgroundColor: theme.colorScheme === "dark" ? theme.fn.rgba("#000000", 0.55) : theme.fn.rgba("#FFFFFF", 0.25),
  }
}));

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
  });

  const [editLocationsModalProps, openEditLocationsModal] = useMantineModal({
    title: <Title order={2}>Edit locations</Title>,
    size: 800,
    overflow: "inside"
  });

  const [settingsModalProps, openSettingsModal] = useMantineModal({
    title: <Title order={2}>Settings</Title>,
    size: 800,
    overflow: "inside"
  });

  const onCreateLocation = (newLocation: AstroLocation) => {
    if (!locations.some(l => l.name === newLocation.name)) {
      setLocations([...locations, newLocation]);
      closeNewLocationModal();
      setActiveAstroLocationIndex(locations.length - 1);
    }
  };

  const { classes } = useStyles();
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <div className={classes.container}>
      <Modal {...newLocationModalProps}>
        <NewLocationForm locationNames={locations.map(l => l.name)} onSubmit={onCreateLocation} />
      </Modal>
      <Modal {...editLocationsModalProps}>
        <EditLocationsModal locations={locations} setLocations={setLocations} activeLocationIndex={activeAstroLocationIndex} setActiveLocationIndex={setActiveAstroLocationIndex} />
      </Modal>
      <Modal {...settingsModalProps}>
        <SettingsModal />
      </Modal>
      <div className={classes.tabContainer}>
        <div aria-label="List of your locations" role="tablist" className={classes.tabSection}>
          {locations.map((loc, index) => {
            const classNames = classes.tab + (loc.name === activeAstroLocation.name ? " " + classes.selectedTab : "");
            return <Text component="a" href="#" role="tab" key={loc.name} className={classNames} onClick={() => setActiveAstroLocationIndex(index)}>
              {loc.name}
            </Text>;
          })}
          <Anchor href="#" role="tab" aria-label="Create new location" className={classes.tab} onClick={openNewLocationModal}>
            <PlusIcon aria-label="Plus icon" color={colorScheme === "light" ? theme.black : theme.colors.gray[0]} />
          </Anchor>
          <Anchor href="#" role="tab" aria-label="Edit and reorder locations" className={classes.tab} onClick={openEditLocationsModal}>
            <HamburgerMenuIcon aria-label="Three horizontal lines" color={colorScheme === "light" ? theme.black : theme.colors.gray[0]} />
          </Anchor>
          <Anchor href="#" role="tab" aria-label="Open settings" className={classes.tab} onClick={openSettingsModal}>
            <GearIcon aria-label="Gear icon" color={colorScheme === "light" ? theme.black : theme.colors.gray[0]} />
          </Anchor>
        </div>
      </div>
      <div role="tabpanel" className={classes.innerContainer}>
        <Group position="apart" mb={20} noWrap>
          <Title order={1} style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }} title={activeAstroLocation.name}>Astroweather: {activeAstroLocation.name}</Title>
          <CurrentTime />
        </Group>
        <Dashboard location={activeAstroLocation} />
      </div>
    </div>
  );
};

export default App;
